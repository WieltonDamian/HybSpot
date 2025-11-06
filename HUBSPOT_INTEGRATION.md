# 🔗 Integracja z HubSpot przez GitHub

## Jak połączyć projekt z HubSpot

### Krok 1: Push do GitHub

Projekt jest już skonfigurowany z remote origin. Wykonaj:

```bash
cd ~/hubspot-csm-app
git push -u origin main
```

Jeśli repozytorium już istnieje i ma inne pliki, możesz potrzebować:

```bash
git pull origin main --allow-unrelated-histories
# Rozwiąż konflikty jeśli są
git push -u origin main
```

### Krok 2: Połącz GitHub z HubSpot

1. **W HubSpot:**
   - Przejdź do: **Rozwój → Projekty**
   - Kliknij **"Utwórz projekt"**
   - Wybierz **"Zaimportuj projekt z GitHub"**
   - Kliknij **"Połącz z GitHub"**
   - Zaloguj się do GitHub i autoryzuj HubSpot
   - Wybierz repozytorium: `WieltonDamian/Poradniki`
   - Wybierz branch: `main`

2. **HubSpot automatycznie:**
   - Wykryje strukturę projektu
   - Skonfiguruje deployment
   - Będzie monitorować zmiany w GitHub

### Krok 3: Konfiguracja zmiennych środowiskowych w HubSpot

W HubSpot Projects musisz ustawić zmienne środowiskowe:

1. Przejdź do ustawień projektu w HubSpot
2. Dodaj zmienne środowiskowe:
   - `HUBSPOT_PORTAL_ID` = `146835084`
   - `HUBSPOT_ACCESS_TOKEN` = Twój token dostępu
   - `PORT` = `3001`
   - `NODE_ENV` = `production`

### Krok 4: Deployment

HubSpot automatycznie:
- Zbuduje projekt przy każdym push do `main`
- Wdroży aplikację
- Uruchomi serwer API

## 📁 Struktura projektu dla HubSpot

```
hubspot-csm-app/
├── server/              # Backend API
│   └── index.js
├── client/              # Frontend React
│   ├── src/
│   └── build/           # Build output
├── hubspot.config.yml   # Konfiguracja HubSpot
├── package.json
└── README.md
```

## 🔄 CI/CD z GitHub Actions

Projekt ma skonfigurowany GitHub Actions workflow (`.github/workflows/deploy.yml`), który:
- Buduje aplikację przy każdym push
- Przygotowuje do deploymentu

HubSpot może używać tego workflow do automatycznego deploymentu.

## 📝 Uwagi

- **Token dostępu:** Nie commituj `.env` - ustaw go w HubSpot Projects jako zmienną środowiskową
- **Port:** HubSpot może przypisać własny port - sprawdź w ustawieniach projektu
- **Build:** Frontend React będzie zbudowany w `client/build/` przed deploymentem

## 🆘 Rozwiązywanie problemów

### HubSpot nie wykrywa projektu
- Sprawdź czy `hubspot.config.yml` jest w głównym katalogu
- Upewnij się, że struktura projektu jest poprawna

### Błędy buildowania
- Sprawdź logi w HubSpot Projects
- Upewnij się, że wszystkie zależności są w `package.json`

### Problemy z autoryzacją
- Sprawdź czy token dostępu jest poprawnie ustawiony w zmiennych środowiskowych
- Upewnij się, że token ma odpowiednie uprawnienia

