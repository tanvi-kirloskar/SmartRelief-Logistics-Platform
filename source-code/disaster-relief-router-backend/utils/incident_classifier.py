INCIDENT_TYPES = {
    "Flood": [
        "flood",
        "water",
        "overflow",
        "submerged",
        "rain",
        "waterlogging",
    ],

    "Fire": [
        "fire",
        "burning",
        "smoke",
        "flames",
    ],

    "Tree Collapse": [
        "tree",
        "fallen",
        "fall",
        "collapsed",
        "collapse",
    ],

    "Building Collapse": [
        "building",
        "structure",
        "collapsed",
        "collapse",
    ],

    "Road Accident": [
        "accident",
        "collision",
        "crash",
        "vehicle",
        "truck",
        "car",
        "bus",
    ],

    "Medical Emergency": [
        "injured",
        "bleeding",
        "ambulance",
        "heart attack",
        "unconscious",
    ],

    "Landslide": [
        "landslide",
        "mudslide",
        "hill",
    ],
}


def classify_incident(report: str) -> str:
    report = report.lower()

    print("\n===== INCIDENT CLASSIFIER =====")
    print("Report:", report)

    best_match = "Unknown"
    best_score = 0

    for incident_type, keywords in INCIDENT_TYPES.items():

        score = 0

        for keyword in keywords:
            if keyword in report:
                print(f"✓ Matched '{keyword}' -> {incident_type}")
                score += 1

        print(f"{incident_type}: Score = {score}")

        if score > best_score:
            best_score = score
            best_match = incident_type

    print("\nSelected Incident Type:", best_match)
    print("===============================\n")

    return best_match