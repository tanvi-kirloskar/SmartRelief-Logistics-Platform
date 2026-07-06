from models.incident_state import IncidentState
from uuid import uuid4
from utils.location_extractor import extract_location
from utils.incident_classifier import classify_incident

class IntakeAgent:

    def process(self, report: str, location: str = "Unknown"):
        if location == "Unknown":
            location = extract_location(report)

        incident_type = classify_incident(report)
        
        incident = IncidentState(
            incident_id=f"INC-{str(uuid4())[:8]}",
            report=report.strip(),
            location=location,
            incident_type=incident_type
        )

        return incident