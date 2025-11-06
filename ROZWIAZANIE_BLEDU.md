# 🔧 Rozwiązanie błędu walidacji HubSpot Projects

## Problem
Błąd: "duplicate component names" - HubSpot Projects nie może zwalidować projektu.

## Możliwe przyczyny:

1. **HubSpot Projects oczekuje struktury aplikacji HubSpot** (extensions, serverless functions), a nie zwykłego Node.js/Express
2. **Duplikacja package.json** (root + client/)
3. **Struktura projektu nie jest zgodna z wymaganiami HubSpot Projects**

## Rozwiązania:

### Opcja 1: Użyj tylko serverless functions (jeśli dostępne)

HubSpot Projects może wymagać struktury z serverless functions zamiast zwykłego Express serwera.

### Opcja 2: Użyj HubSpot API bezpośrednio (bez Projects)

Możesz używać skryptów Node.js lokalnie, które łączą się z HubSpot API:
- Skrypty w `server/scripts/` działają lokalnie
- Nie wymagają HubSpot Projects
- Właściwość została już utworzona przez API ✅

### Opcja 3: Uprość strukturę projektu

Usuń `client/` z projektu HubSpot (jest w `.hubspotignore`), zostaw tylko `server/` z API.

## ✅ Co już działa:

- ✅ Właściwość "Drzewo produktów - sprawdź" została utworzona przez API
- ✅ Skrypty działają lokalnie
- ✅ Możesz używać HubSpot API bezpośrednio

## 💡 Rekomendacja:

**Użyj skryptów lokalnie** - nie potrzebujesz HubSpot Projects do działania API. Projects są głównie dla:
- UI Extensions (wymagają Enterprise)
- Serverless Functions
- Aplikacji w HubSpot Marketplace

Twoja aplikacja (Node.js API + React frontend) może działać niezależnie od HubSpot Projects.

