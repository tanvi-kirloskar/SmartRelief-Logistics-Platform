"""
FastAPI integration layer for the existing DisasterWorkflow.

IMPORTANT: This file does NOT modify any agent logic. It only:
  1. Wraps the existing DisasterWorkflow.run() call in an HTTP endpoint.
  2. Maps IncidentState fields onto the shape the React frontend expects.

Run with:
    uvicorn app:app --reload --port 8000
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from workflow.orchestrator import DisasterWorkflow

app = FastAPI(title="Disaster Relief Logistics Router API")

# Allow the Vite dev server to call this API. Adjust origins for production.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Reuse a single workflow instance (agents are stateless per .process() call,
# matching how main.py already uses it).
workflow = DisasterWorkflow()


class AnalyzeRequest(BaseModel):
    report: str
    location: str = "Unknown"


def _map_security_status(status: str) -> str:
    """Map free-form backend security_status onto the frontend's closed enum."""
    s = (status or "").upper()
    if s in ("PASSED", "PASS", "OK", "CLEAR", "CLEARED"):
        return "PASSED"
    if s in ("FAILED", "FAIL", "BLOCKED", "FLAGGED", "REJECTED"):
        return "FAILED"
    return "REVIEWING"


def _map_review_status(status: str) -> str:
    """Map free-form backend review_status onto the frontend's closed enum."""
    s = (status or "").upper()
    if "APPROVE" in s:
        return "APPROVED"
    if "REJECT" in s:
        return "REJECTED"
    return "PENDING"


def _build_reasoning(incident) -> str:
    """
    Generate a human-readable explanation for the dispatcher based on
    the incident classification and recommended response.
    """

    incident_type = (incident.incident_type or "").lower()
    severity = incident.severity or "UNKNOWN"

    reasoning = []

    if "tree" in incident_type:
        reasoning.append(
            "A tree collapse has been detected. There is a risk of blocked roads, trapped occupants, or vehicle damage."
        )

    elif "building" in incident_type:
        reasoning.append(
            "A structural collapse has been identified. People may be trapped under debris, requiring immediate rescue operations."
        )

    elif "flood" in incident_type:
        reasoning.append(
            "Flood conditions may isolate affected people and disrupt transportation, requiring evacuation and relief support."
        )

    elif "fire" in incident_type:
        reasoning.append(
            "Fire incidents can spread rapidly and threaten nearby people and infrastructure, requiring urgent firefighting and medical support."
        )

    elif "road" in incident_type:
        reasoning.append(
            "A road accident has been detected with possible injuries and traffic disruption requiring emergency response."
        )

    else:
        reasoning.append(
            "The reported incident requires emergency assessment and coordinated response."
        )

    reasoning.append(f"Overall severity has been classified as {severity}.")

    if incident.recommended_resources:
        reasoning.append(
            "Recommended resources include "
            + ", ".join(incident.recommended_resources)
            + "."
        )

    return " ".join(reasoning)


def _build_security_note(incident) -> str:
    if incident.security_notes:
        return " ".join(incident.security_notes)
    return f"Security screening status: {incident.security_status}."


def _build_approval_note(incident) -> str:
    if incident.review_status and incident.review_status != "NOT_REQUIRED":
        return f"Human review status: {incident.review_status}."
    return "No human review was required for this incident."


@app.post("/analyze")
def analyze(req: AnalyzeRequest):
    if not req.report or not req.report.strip():
        raise HTTPException(status_code=400, detail="report must not be empty")

    try:
        incident = workflow.run(req.report, location=req.location)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Workflow failed: {e}")
    
    response = {
        "incident_id": incident.incident_id,
        "timestamp": "",

        "incident_type": incident.incident_type,
        "location": incident.location,

        "severity": incident.severity or "LOW",

        "reasoning": _build_reasoning(incident),

        "security_status": _map_security_status(
            incident.security_status
        ),

        "review_status": _map_review_status(
            incident.review_status
        ),

        "recommended_resources": incident.recommended_resources,

        "notifications": incident.notifications,

        "security_notes": incident.security_notes,

        "redacted_report": incident.redacted_report,

        "human_review_required":
            incident.review_status != "NOT_REQUIRED",
    }
    
    print("\n===== API RESPONSE =====")
    print(response)

    return response

@app.get("/health")
def health():
    return {"status": "ok"}
