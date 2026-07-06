NOTIFICATION_MAP = {

    "Flood": [
        "DISASTER MANAGEMENT ALERT: Notify District Disaster Management Authority.",
        "BOAT RESCUE ALERT: Dispatch nearest boat rescue teams.",
        "POLICE ALERT: Inform local police for evacuation support."
    ],

    "Fire": [
        "FIRE DEPARTMENT ALERT: Dispatch nearest fire brigade.",
        "POLICE ALERT: Secure surrounding area.",
        "AMBULANCE ALERT: Keep emergency medical team on standby."
    ],

    "Tree Collapse": [
        "MUNICIPAL ALERT: Notify Municipal Corporation.",
        "RESCUE ALERT: Dispatch rescue team.",
        "HOSPITAL ALERT: Inform nearest hospital."
    ],

    "Building Collapse": [
        "URBAN SEARCH ALERT: Dispatch Urban Search & Rescue team.",
        "AMBULANCE ALERT: Mobilize emergency ambulances.",
        "POLICE ALERT: Secure collapse zone."
    ],

    "Road Accident": [
        "TRAFFIC POLICE ALERT: Clear traffic route.",
        "AMBULANCE ALERT: Dispatch ambulance.",
        "RESCUE ALERT: Send rescue personnel."
    ],

    "Medical Emergency": [
        "HOSPITAL ALERT: Notify emergency department.",
        "AMBULANCE ALERT: Dispatch ambulance."
    ],

    "Landslide": [
        "DISASTER RESPONSE ALERT: Notify disaster response force.",
        "RESCUE ALERT: Dispatch rescue team."
    ],

    "Unknown": [
        "CONTROL ROOM ALERT: Review incident manually."
    ]
}


class NotificationAgent:

    def process(self, incident):

        notifications = []

        if incident.review_status != "APPROVED":
            incident.notifications = notifications
            return incident

        # Base notifications
        notifications.extend(
            NOTIFICATION_MAP.get(
                incident.incident_type,
                NOTIFICATION_MAP["Unknown"]
            )
        )

        # Severity-based additions
        if incident.severity == "CRITICAL":

            notifications.append(
                "STATE EMERGENCY ALERT: Escalate to State Emergency Operations Center."
            )

            notifications.append(
                "NGO ALERT: Mobilize relief organizations."
            )

        elif incident.severity == "HIGH":

            notifications.append(
                "MEDICAL ALERT: Prepare emergency medical response."
            )

        elif incident.severity == "LOW":

            notifications.append(
                "LOGISTICS ALERT: Monitor situation and provide supplies if required."
            )

        # Remove duplicates
        notifications = list(dict.fromkeys(notifications))

        incident.notifications = notifications

        incident.status = "NOTIFICATIONS_GENERATED"

        return incident