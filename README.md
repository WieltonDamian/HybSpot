# HubSpot CSM App - Rozbudowa funkcjonalności CSM

Aplikacja webowa do rozbudowy funkcjonalności Customer Success Manager w HubSpot, wykorzystująca HubSpot API.

## 🚀 Funkcjonalności

- **Dashboard CSM** - Przegląd informacji o koncie HubSpot
- **Lista kontaktów** - Wyświetlanie i zarządzanie kontaktami
- **Szczegóły kontaktu** - Zarządzanie relacjami CSM:
  - Notatki CSM z możliwością zapisu
  - Priorytetyzacja klientów (niski/średni/wysoki)
  - Integracja z HubSpot API

## 📋 Wymagania

- Node.js 18+ 
- npm lub yarn
- Konto HubSpot z dostępem do API
- Personal Access Token z HubSpot

## 🔧 Instalacja

### 1. Zainstaluj zależności

```bash
npm run install-all
```

Lub osobno:

```bash
# Zależności serwera
npm install

# Zależności klienta (React)
cd client
npm install
cd ..
```

### 2. Skonfiguruj zmienne środowiskowe

Skopiuj plik `.env.example` do `.env`:

```bash
cp .env.example .env
```

Edytuj plik `.env` i uzupełnij:

```env
HUBSPOT_PORTAL_ID=146835084
HUBSPOT_ACCESS_TOKEN=twój_token_dostępu_tutaj
PORT=3001
NODE_ENV=development
```

**Jak uzyskać token dostępu:**
1. Zaloguj się do HubSpot
2. Przejdź do: Settings → Integrations → Private Apps
3. Utwórz nową aplikację lub użyj istniejącej
4. Skopiuj "Token dostępu" (Personal Access Key)

## 🏃 Uruchomienie

### Tryb deweloperski (serwer + klient jednocześnie)

```bash
npm run dev
```

To uruchomi:
- **Serwer API** na `http://localhost:3001`
- **Aplikacja React** na `http://localhost:3000`

### Osobno

**Serwer:**
```bash
npm run server
```

**Klient:**
```bash
npm run client
```

## 📁 Struktura projektu

```
hubspot-csm-app/
├── server/
│   └── index.js          # Serwer Express z API HubSpot
├── client/               # Aplikacja React
│   ├── src/
│   │   ├── components/
│   │   │   ├── CSMDashboard.tsx
│   │   │   ├── ContactList.tsx
│   │   │   └── ContactDetail.tsx
│   │   └── App.tsx
│   └── ...
├── .env.example
├── package.json
└── README.md
```

## 🔌 API Endpoints

Serwer udostępnia następujące endpointy:

- `GET /api/account/info` - Informacje o koncie HubSpot
- `GET /api/contacts` - Lista kontaktów
- `GET /api/contacts/:id` - Szczegóły kontaktu
- `POST /api/contacts/:id/notes` - Dodaj notatkę do kontaktu
- `GET /api/contacts/:id/notes` - Pobierz notatki kontaktu
- `PATCH /api/contacts/:id` - Aktualizuj właściwości kontaktu
- `GET /api/deals` - Lista dealów
- `GET /api/health` - Status serwera

## 🚀 Deployment

### Build aplikacji React

```bash
npm run build
```

To utworzy zoptymalizowaną wersję w `client/build/`.

### Deploy na GitHub Pages / Netlify / Vercel

1. Zbuduj aplikację: `npm run build`
2. Wgraj folder `client/build/` na hosting
3. Skonfiguruj serwer API (Express) na platformie jak Heroku, Railway, lub Vercel

## 📝 Uwagi

- Aplikacja działa z **Service Professional** (nie wymaga Enterprise)
- Wszystkie dane są pobierane przez HubSpot API
- Notatki są zapisywane jako standardowe notatki w HubSpot
- Priorytety wymagają utworzenia Custom Property `csm_priority` w HubSpot

## 🔐 Bezpieczeństwo

- **NIE** commituj pliku `.env` do repozytorium
- Token dostępu powinien być przechowywany bezpiecznie
- W produkcji użyj zmiennych środowiskowych na serwerze

## 🆘 Rozwiązywanie problemów

### Błąd: "Unauthorized"
- Sprawdź czy token dostępu jest poprawny
- Upewnij się, że aplikacja ma odpowiednie uprawnienia (scopes)

### Błąd: "Cannot connect to server"
- Sprawdź czy serwer działa na porcie 3001
- Sprawdź plik `.env` z poprawnym tokenem

### CORS errors
- Upewnij się, że serwer Express ma włączony CORS
- Sprawdź czy klient łączy się z właściwym adresem serwera

## 📚 Dokumentacja

- [HubSpot API Documentation](https://developers.hubspot.com/docs/api/overview)
- [React Documentation](https://react.dev/)
- [Express.js Documentation](https://expressjs.com/)

## 📄 Licencja

MIT

