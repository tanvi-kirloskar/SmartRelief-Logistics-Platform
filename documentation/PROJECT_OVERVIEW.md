# PROJECT_OVERVIEW.md

### Project Objective
The Disaster Relief Logistics Router is an AI-powered emergency response coordination platform built as a Kaggle AI Agents Capstone Project. The objective is to demonstrate modern Agent Engineering concepts—including Multi-Agent Systems, Ambient Agents, Security-First Design, and Human-in-the-Loop (HITL) workflows—rather than to build a production-ready disaster management platform.

### Problem Statement
During large-scale emergencies such as floods, cyclones, and earthquakes, emergency response teams receive hundreds or thousands of reports. Because human dispatchers cannot manually process every request quickly, critical incidents may be delayed as operators become overwhelmed. There is a critical need for an intelligent triage and routing layer to assist in processing these reports efficiently. 

### Proposed Solution
The proposed solution is an **AI-Powered Disaster Response Command Center**. Operating as an ambient background system, the platform automatically receives incident reports, sanitizes sensitive data, assesses severity, checks resource requirements, and simulates downstream notifications. It is designed to support—not replace—human decision-makers by escalating high-risk situations for manual review and maintaining a complete audit trail of its AI reasoning.

### Multi-Agent Workflow Summary
The platform utilizes a sequential 6-agent pipeline to process incoming reports:
1. **Intake Agent:** Receives the natural language disaster report and normalizes the incoming data to identify the incident type.
2. **Security Agent:** Implements Security Shift-Left principles by intercepting the prompt to detect malicious injection attempts and redact sensitive Personally Identifiable Information (PII), such as email addresses.
3. **Severity Agent:** Analyzes the sanitized text to classify the incident's threat level (e.g., HIGH).
4. **Resource Planner Agent:** Evaluates the incident to recommend necessary emergency resources, such as Rescue Teams, Chainsaw Crews, and Medical Kits.
5. **Human Review Agent:** Evaluates the risk level and flags critical incidents, updating their status to require human dispatcher review.
6. **Notification Agent:** Generates simulated downstream alerts for relevant stakeholders, including Municipal Authorities, Rescue Teams, and Hospitals.

### Core System Components
*   **Emergency Operations Dashboard (Frontend):** A professional React-based UI that provides situational awareness. It features a live **Workflow Progress Timeline** to track agent execution, detailed incident analysis panels, and an interactive **India Operations Map** to visualize active rescue teams, hospitals, NGOs, and incidents without the bloat of a complex GIS engine.
*   **Multi-Agent Backend:** A Python/FastAPI architecture that orchestrates the sequential agent pipeline and state management.

### Security Features
The system demonstrates secure agent workflows by intercepting malicious or sensitive inputs before downstream AI reasoning occurs. The dashboard features a dedicated "Security Sanitization" panel that proves the agent successfully detects and scrubs PII (such as replacing an email with `[REDACTED_EMAIL]`) and actively blocks prompt injection attempts (e.g., ignoring instructions to artificially mark an incident as LOW priority).

### Explainable AI
To maintain trust and provide a reliable audit trail, the platform features a transparent AI Reasoning module. The interface provides a human-readable explanation detailing *why* a specific severity level was assigned and why particular resources were recommended based on the detected risks (e.g., blocked roads or trapped occupants).

### Human-in-the-Loop (HITL)
For critical operations, the system enforces HITL compliance. Instead of automatically executing high-risk deployments, the Human Review Agent flags critical emergencies with a **"Dispatcher Review Required"** status on the dashboard, ensuring safe AI deployment through human oversight.

### Future Scope
While strictly out of scope for the current capstone constraints to prevent architectural bloat, future iterations of the platform could include:
*   **Multimodal Input Processing:** Allowing the Intake and Severity Agents to analyze uploaded images of disaster zones alongside text descriptions.
*   **MCP Integration:** Using the Model Context Protocol (MCP) to dynamically query real-world external databases for shelter capacity and inventory.
*   **Advanced GIS Integration:** Upgrading the static India Operations Map into a live GIS routing engine for real-world dispatching.
*   **Production Infrastructure:** Adding robust authentication, databases, and government API integrations.