# 🔍 Diagnostyka błędu "duplicate component names"

## Co zostało sprawdzone:

### ✅ Brak duplikatów w src/
- Tylko 1 plik `.js` w `src/serverless/hello-world.js`
- Brak zduplikowanych nazw w `src/`

### ✅ package.json
- Root: `hubspot-csm-app`
- client/: `client` (ignorowane przez .hubspotignore)
- Brak konfliktów nazw

### ✅ .hubspotignore
- Ignoruje: `client/`, `server/`, `node_modules/`
- Ignoruje: `client/package.json`, `server/package.json`

## Możliwe przyczyny błędu:

### 1. HubSpot nie respektuje .hubspotignore
- Może HubSpot Projects ignoruje `.hubspotignore`
- Może trzeba użyć innego mechanizmu

### 2. Cache w HubSpot
- HubSpot może pamiętać starą strukturę
- Trzeba odświeżyć połączenie z GitHub

### 3. Struktura projektu
- Może HubSpot Projects wymaga innej struktury
- Może `srcDir: "src"` nie działa poprawnie

## Co zrobić:

1. **Odśwież połączenie z GitHub w HubSpot:**
   - Odłącz repo
   - Podłącz ponownie
   - To wymusi ponowną walidację

2. **Sprawdź logi w HubSpot Projects:**
   - Kliknij "Szczegóły" przy błędzie
   - Zobacz dokładnie który plik/nazwa powoduje konflikt

3. **Alternatywnie - usuń client/ z repo:**
   - Jeśli HubSpot nie respektuje .hubspotignore
   - Można przenieść client/ do osobnego repo

## Aktualna struktura dla HubSpot:

```
hubspot-csm-app/
├── src/
│   └── serverless/
│       └── hello-world.js  ← Jedyny plik JS
├── hsproject.json
└── package.json
```

Wszystko inne jest w `.hubspotignore`.

