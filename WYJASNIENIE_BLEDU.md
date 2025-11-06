# 🔍 Wyjaśnienie błędu "duplicate component names"

## Co oznacza ten błąd?

Błąd **"duplicate component names"** w HubSpot Projects oznacza, że HubSpot wykrył **zduplikowane nazwy komponentów** w Twoim projekcie.

## Co HubSpot rozumie jako "komponent"?

HubSpot Projects traktuje jako "komponenty":
- **Serverless Functions** (pliki `.js` w `src/serverless/`)
- **UI Extensions** (pliki w `src/extensions/`)
- **App Components** (elementy aplikacji)
- **Nazwy w package.json** (jeśli są konflikty)

## Możliwe przyczyny błędu:

### 1. **Duplikaty w nazwach plików**
- Dwa pliki o tej samej nazwie w różnych katalogach
- Konflikt między `package.json` w root a `package.json` w podkatalogach

### 2. **Konflikty w strukturze projektu**
- HubSpot widzi zarówno `server/` jak i `src/` jako źródła
- Konflikt między starym kodem a nową strukturą

### 3. **Problemy z konfiguracją**
- `hsproject.json` wskazuje na zły katalog
- HubSpot nie wie, które pliki są ważne

### 4. **Cache/stare pliki**
- HubSpot może pamiętać starą strukturę projektu
- Trzeba wyczyścić cache

## Co zrobiłem, żeby naprawić:

1. ✅ **Uprościłem strukturę** - tylko `src/serverless/` z jedną funkcją
2. ✅ **Usunąłem konflikty** - `.hubspotignore` ignoruje `server/` i `client/`
3. ✅ **Jeden package.json** - tylko w root, bez duplikatów
4. ✅ **Czysta struktura** - `src/` jako jedyne źródło

## Co dalej?

Jeśli błąd nadal występuje:

1. **Odśwież projekt w HubSpot** - może być cache
2. **Sprawdź czy HubSpot widzi nową strukturę** - może trzeba poczekać na synchronizację
3. **Skontaktuj się z HubSpot Support** - mogą sprawdzić dokładnie co wykrywają

## Alternatywa:

Jeśli HubSpot Projects nadal nie działa, możesz:
- ✅ Używać skryptów lokalnie (działają przez API)
- ✅ Właściwość "Drzewo produktów" już działa
- ✅ Nie potrzebujesz Projects do podstawowych funkcji

