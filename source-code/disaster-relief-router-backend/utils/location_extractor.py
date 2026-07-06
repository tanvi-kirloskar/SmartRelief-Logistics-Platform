KNOWN_LOCATIONS = {
    "Mumbai": ["mumbai", "bombay"],
    "Delhi": ["delhi", "new delhi"],
    "Bengaluru": ["bangalore", "bengaluru"],
    "Kolkata": ["kolkata", "calcutta"],
    "Chennai": ["chennai", "madras"],
    "Hyderabad": ["hyderabad"],
    "Pune": ["pune"],
    "Nagpur": ["nagpur"],
    "Patna": ["patna"],
    "Ahmedabad": ["ahmedabad"],
}


def extract_location(report: str) -> str:
    report = report.lower()

    for city, aliases in KNOWN_LOCATIONS.items():
        for alias in aliases:
            if alias in report:
                return city

    return "Unknown"