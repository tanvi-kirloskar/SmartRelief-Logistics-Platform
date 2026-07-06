from tools.inventory_tool import InventoryTool

RESOURCE_MAP = {
    "Flood": [
        "Boat Team",
        "Medical Kit",
        "Relief Supplies"
    ],

    "Fire": [
        "Fire Brigade",
        "Medical Kit",
        "Police Team"
    ],

    "Tree Collapse": [
        "Rescue Team",
        "Chainsaw Crew",
        "Medical Kit"
    ],

    "Building Collapse": [
        "Urban Search Team",
        "Crane Team",
        "Medical Kit"
    ],

    "Road Accident": [
        "Ambulance",
        "Traffic Police",
        "Rescue Team"
    ],

    "Medical Emergency": [
        "Ambulance",
        "Medical Kit"
    ],

    "Landslide": [
        "Rescue Team",
        "Excavator",
        "Medical Kit"
    ],

    "Unknown": [
        "Medical Kit"
    ]
}


class ResourcePlannerAgent:

    def __init__(self):
        self.inventory_tool = InventoryTool()

    def process(self, incident):

        inventory = self.inventory_tool.get_inventory()

        incident_type = incident.incident_type
        severity = incident.severity

        # Base resources from incident type
        resources = RESOURCE_MAP.get(incident_type, ["Medical Kit"]).copy()

        # Add extra resources depending on severity
        if severity == "CRITICAL":
            resources.extend([
                "Ambulance",
                "Disaster Response Team"
            ])

        elif severity == "HIGH":
            if "Medical Kit" not in resources:
                resources.append("Medical Kit")

        elif severity == "LOW":
            if "Water Pack" not in resources:
                resources.append("Water Pack")

        # Remove duplicates
        resources = list(dict.fromkeys(resources))

        # Keep only available inventory
        available_resources = []

        for resource in resources:
            if (
                resource in inventory
                and inventory[resource] > 0
            ):
                available_resources.append(resource)

        incident.recommended_resources = available_resources

        incident.status = "RESOURCES_ALLOCATED"

        return incident