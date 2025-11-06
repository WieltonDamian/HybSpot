# 🚀 Szybki start - HubSpot CSM App

## Krok 1: Konfiguracja

1. Skopiuj plik `.env.example` do `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edytuj plik `.env` i wklej swój token dostępu:
   ```env
   HUBSPOT_PORTAL_ID=146835084
   HUBSPOT_ACCESS_TOKEN=twój_token_dostępu_tutaj
   ```

## Krok 2: Instalacja

```bash
npm run install-all
```

## Krok 3: Uruchomienie

```bash
npm run dev
```

Aplikacja będzie dostępna na:
- **Frontend (React):** http://localhost:3000
- **Backend (API):** http://localhost:3001

## 📝 Uwagi

- Upewnij się, że masz poprawny token dostępu z HubSpot
- Token powinien mieć uprawnienia do odczytu/zapisu kontaktów i notatek
- Jeśli widzisz błędy CORS, sprawdź czy oba serwery działają

## 🔗 Push do GitHub

Gdy wszystko działa, możesz wypchnąć do repozytorium:

```bash
git init
git add .
git commit -m "Initial commit: HubSpot CSM App"
git remote add origin https://github.com/WieltonDamian/HybSpot.git
git branch -M main
git push -u origin main
```

**WAŻNE:** Nie commituj pliku `.env` - jest w `.gitignore`!
