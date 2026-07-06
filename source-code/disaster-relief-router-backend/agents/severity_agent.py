from utils.gemini_client import client


class SeverityAgent:

    def process(self, incident):

        incident_text = (
            incident.redacted_report
            if incident.redacted_report
            else incident.report
        )

        prompt = f"""
You are a disaster response severity classifier.

Classify the incident into ONE category:

LOW
MEDIUM
HIGH
CRITICAL

Definitions:

LOW
Minor issue.
No immediate danger.
Single resource required.

MEDIUM
Infrastructure affected.
Limited public impact.

HIGH
People trapped.
School, hospital or bridge affected.
Immediate rescue required.

CRITICAL
Mass casualties.
Building collapse.
Hospital evacuation.
Multiple lives at immediate risk.

Return ONLY one word.

Incident Details:

Incident Type: {incident.incident_type}

Location: {incident.location}

Security Status: {incident.security_status}

Report:
{incident_text}
"""

        try:

            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt
            )

            severity = response.text.strip().upper()

        except Exception:

            report_text = incident_text.lower()

            score = 0

            # Incident type contribution
            if incident.incident_type == "Building Collapse":
                score += 5
            elif incident.incident_type == "Tree Collapse":
                score += 3
            elif incident.incident_type == "Flood":
                score += 3
            elif incident.incident_type == "Fire":
                score += 4
            elif incident.incident_type == "Road Accident":
                score += 3

            # High-risk locations
            if "school" in report_text:
                score += 2

            if "hospital" in report_text:
                score += 3

            # Casualties / urgency
            if "trapped" in report_text:
                score += 3

            if "injured" in report_text:
                score += 2

            if "multiple" in report_text:
                score += 2

            if "dead" in report_text or "death" in report_text:
                score += 5

            # Convert score to severity
            if score >= 9:
                severity = "CRITICAL"
            elif score >= 6:
                severity = "HIGH"
            elif score >= 3:
                severity = "MEDIUM"
            else:
                severity = "LOW"

        valid_levels = [
            "LOW",
            "MEDIUM",
            "HIGH",
            "CRITICAL"
        ]

        if severity not in valid_levels:
            severity = "MEDIUM"

        incident.severity = severity

        if severity == "CRITICAL":
            incident.human_review_required = True

        incident.status = "SEVERITY_CLASSIFIED"

        return incident