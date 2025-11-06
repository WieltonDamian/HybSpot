# 🚀 Instrukcja: Push do GitHub

## Gotowe do push!

Projekt jest przygotowany i gotowy do wypchnięcia do GitHub.

## Wykonaj te komendy:

```bash
cd ~/hubspot-csm-app

# Sprawdź status
git status

# Push do GitHub
git push -u origin main
```

## Jeśli repozytorium już ma pliki:

Jeśli repozytorium `WieltonDamian/Poradniki` już istnieje i ma inne pliki:

```bash
# Pobierz istniejące pliki
git pull origin main --allow-unrelated-histories

# Jeśli są konflikty, rozwiąż je ręcznie
# Następnie:
git add .
git commit -m "Merge with existing repository"
git push -u origin main
```

## Po push:

1. **W HubSpot:**
   - Przejdź do: **Rozwój → Projekty**
   - Kliknij **"Utwórz projekt"**
   - Wybierz **"Zaimportuj projekt z GitHub"**
   - Połącz GitHub i wybierz repozytorium `WieltonDamian/Poradniki`

2. **Skonfiguruj zmienne środowiskowe w HubSpot:**
   - `HUBSPOT_PORTAL_ID` = `146835084`
   - `HUBSPOT_ACCESS_TOKEN` = Twój token
   - `PORT` = `3001`

3. **HubSpot automatycznie:**
   - Wykryje projekt
   - Zbuduje aplikację
   - Wdroży i uruchomi

## 📚 Więcej informacji:

Zobacz plik `HUBSPOT_INTEGRATION.md` dla szczegółowych instrukcji integracji.

