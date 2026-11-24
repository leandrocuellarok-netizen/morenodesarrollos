# Pillar 1 — structured opportunity assessment
"""Evidence-aware opportunity scoring for Moreno Desarrollos."""
from datetime import date
import json

PROJECT = {
    "name": "MORENO DESARROLLOS",
    "territory": "Partido de Moreno, Buenos Aires, Argentina",
    "pillar": 1,
    "pillar_name": "Originar el negocio",
    "research_date": date.today().isoformat(),
    "target_opportunities": 20,
    "priority_opportunities": 5,
}

EVIDENCE_STATUSES = {
    "VERIFIED": "Supported by a current primary or official source.",
    "INDICATIVE": "Supported by a reliable secondary source; verify independently.",
    "HYPOTHESIS": "Analytical lead requiring confirmation.",
    "UNVERIFIED": "Insufficient evidence; do not use for investment decisions.",
}

SCORING_WEIGHTS = {
    "market_demand": 0.15,
    "location_and_access": 0.15,
    "constructive_potential": 0.15,
    "economic_upside": 0.20,
    "capital_intensity": 0.10,
    "regulatory_and_environmental_risk": 0.10,
    "execution_complexity": 0.05,
    "partnerability": 0.05,
    "time_to_market": 0.05,
}

def validate_weights(weights=SCORING_WEIGHTS):
    total = sum(weights.values())
    if abs(total - 1.0) > 1e-9:
        raise ValueError(f"Scoring weights must sum to 1.0, got {total}")
    if any(value < 0 for value in weights.values()):
        raise ValueError("Scoring weights cannot be negative")
    return True

def opportunity_score(scores, weights=SCORING_WEIGHTS):
    """Return a 0–100 weighted score; all criteria must be supplied."""
    validate_weights(weights)
    missing = set(weights) - set(scores)
    extra = set(scores) - set(weights)
    if missing or extra:
        raise ValueError(f"Score keys mismatch; missing={missing}, extra={extra}")
    if any(not isinstance(v, (int, float)) or not 0 <= v <= 100
           for v in scores.values()):
        raise ValueError("Each criterion score must be numeric from 0 to 100")
    return round(sum(scores[key] * weight for key, weight in weights.items()), 2)

def create_opportunity_record(opportunity_id, title, location,
                              product_hypothesis, evidence_status,
                              sources, scores=None, diligence_gaps=None):
    if evidence_status not in EVIDENCE_STATUSES:
        raise ValueError(f"Invalid evidence status: {evidence_status}")
    if not sources:
        raise ValueError("Include source links or an explicit evidence-gap note")
    scores = scores or {}
    return {
        "id": opportunity_id,
        "title": title,
        "location": location,
        "product_hypothesis": product_hypothesis,
        "evidence_status": evidence_status,
        "evidence_definition": EVIDENCE_STATUSES[evidence_status],
        "sources": sources,
        "scores": scores,
        "weighted_score": opportunity_score(scores) if scores else None,
        "diligence_gaps": diligence_gaps or [],
        "financials": {
            "land_cost": None,
            "construction_cost": None,
            "professional_and_permit_costs": None,
            "infrastructure_cost": None,
            "sales_or_exit_value": None,
            "gross_profit": None,
            "roi": None,
            "scenarios": {"conservative": None, "moderate": None, "optimistic": None},
        },
        "next_commercial_action": None,
    }

if __name__ == "__main__":
    validate_weights()
    print(json.dumps(PROJECT, ensure_ascii=False, indent=2))
