# Skrypty pomocnicze dla HubSpot CSM

## create-custom-properties.js

Tworzy Custom Properties w HubSpot dla funkcjonalności CSM.

### Uruchomienie:

```bash
cd ~/hubspot-csm-app
node server/scripts/create-custom-properties.js
```

### Wymagania:

- Plik `.env` z `HUBSPOT_ACCESS_TOKEN`
- Token musi mieć uprawnienia do tworzenia właściwości

### Tworzone właściwości:

- **csm_priority** - Priorytet klienta (niski/średni/wysoki)
- **csm_status** - Status klienta (aktywny/ryzyko/churn/prospekt)
- **csm_health_score** - Wynik zdrowia klienta (0-100)
- **csm_last_review_date** - Data ostatniego przeglądu
- **csm_next_review_date** - Data następnego przeglądu
- **csm_notes** - Notatki CSM

