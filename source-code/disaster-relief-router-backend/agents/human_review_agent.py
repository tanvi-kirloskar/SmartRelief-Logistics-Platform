class HumanReviewAgent:

    def process(
        self,
        incident,
        decision="PENDING"
    ):

        # No human review required -> auto approve
        if not incident.human_review_required:

            incident.review_status = "APPROVED"
            incident.status = "REVIEW_APPROVED"

            return incident

        # Human review required
        if decision == "APPROVE":

            incident.review_status = "APPROVED"
            incident.status = "REVIEW_APPROVED"

        elif decision == "REJECT":

            incident.review_status = "REJECTED"
            incident.status = "REVIEW_REJECTED"

        else:

            incident.review_status = "PENDING_APPROVAL"
            incident.status = "AWAITING_HUMAN_REVIEW"

        return incident