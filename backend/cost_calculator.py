INDUSTRY_MULTIPLIERS = {
    "Manufacturing": 1.4,
    "Retail": 1.2,
    "Tech": 1.1,
    "Healthcare": 1.6,
    "Other": 1.0
}

FINANCING_MODELS = {
    "purchase": 1.0,
    "3yr_lease": 0.35,
    "5yr_lease": 0.25
}

BASE_COSTS = {
    "site": 15000,
    "system": 5000
}

def calculate_integration_cost(industry, financing_model, site_counts, critical_systems):
    total_sites = sum(site_counts.values())
    site_cost = total_sites * BASE_COSTS["site"]
    system_cost = len(critical_systems) * BASE_COSTS["system"]
    base_cost = site_cost + system_cost
    
    financing_factor = FINANCING_MODELS.get(financing_model, 1.0)
    adjusted_cost = base_cost * financing_factor
    
    industry_factor = INDUSTRY_MULTIPLIERS.get(industry, 1.0)
    total_cost = adjusted_cost * industry_factor
    
    return {
        "total_estimate": round(total_cost),
        "breakdown": {
            "site_costs": site_cost,
            "system_costs": system_cost,
            "financing_model": financing_model,
            "financing_factor": financing_factor,
            "industry": industry,
            "industry_factor": industry_factor
        }
    }
