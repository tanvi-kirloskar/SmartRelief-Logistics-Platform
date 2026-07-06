import re

from models.incident_state import IncidentState


class SecurityAgent:

    def process(self, incident: IncidentState):

        notes = []

        report = incident.report

        # -----------------------------
        # Detect Phone Numbers
        # -----------------------------
        if re.search(r"\b\d{10}\b", report):
            notes.append("Phone number detected and redacted.")

        # -----------------------------
        # Detect Email Addresses
        # -----------------------------
        if re.search(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
            report
        ):
            notes.append("Email address detected and redacted.")

        # -----------------------------
        # Detect Prompt Injection
        # -----------------------------
        suspicious_phrases = [
            "ignore previous instructions",
            "override system",
            "mark this critical",
            "system override",
        ]

        for phrase in suspicious_phrases:
            if phrase in report.lower():
                notes.append("Prompt injection attempt blocked.")
                break

        # -----------------------------
        # Redact Sensitive Information
        # -----------------------------
        redacted_report = report

        redacted_report = re.sub(
            r"\b\d{10}\b",
            "[REDACTED_PHONE]",
            redacted_report
        )

        redacted_report = re.sub(
            r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
            "[REDACTED_EMAIL]",
            redacted_report
        )

        # -----------------------------
        # Update Incident State
        # -----------------------------
        incident.redacted_report = redacted_report
        incident.security_notes = notes

        if notes:
            incident.security_status = "FLAGGED"
        else:
            incident.security_status = "PASSED"

        incident.status = "SECURITY_CHECKED"

        return incident