# 🌳 Dodanie linku "Drzewo produktów" do formularza transakcji

## Cel
Dodać link do PDF-a "Drzewo produktów" w formularzu tworzenia nowej transakcji w HubSpot.

## Link do dokumentu
```
https://146835084.fs1.hubspotusercontent-eu1.net/hubfs/146835084/Materia%C5%82y%20dla%20sprzedawc%C3%B3w/Drzewo%20produkt%C3%B3w.pdf
```

## Metoda 1: Custom Property + Formularz (Rekomendowane)

### Krok 1: Utwórz Custom Property

**Opcja A: Automatycznie przez skrypt**
```bash
cd ~/hubspot-csm-app
node server/scripts/add-deal-link-property.js
```

**Opcja B: Ręcznie w HubSpot**
1. Przejdź do: **Settings → Properties → Deals**
2. Kliknij **"Create property"**
3. Wypełnij:
   - **Label:** `Drzewo produktów - sprawdź`
   - **Internal name:** `drzewo_produktow`
   - **Field type:** `URL` (lub `Text`)
   - **Description:** `Link do dokumentu Drzewo produktów`
4. Zapisz

### Krok 2: Ustaw domyślną wartość

1. W ustawieniach właściwości kliknij **"Edit"**
2. W sekcji **"Default value"** wklej:
   ```
   https://146835084.fs1.hubspotusercontent-eu1.net/hubfs/146835084/Materia%C5%82y%20dla%20sprzedawc%C3%B3w/Drzewo%20produkt%C3%B3w.pdf
   ```
3. Zapisz

### Krok 3: Dodaj do formularza

1. Przejdź do: **Settings → Objects → Deals**
2. Kliknij **"Create form"** lub edytuj istniejący formularz tworzenia
3. Przeciągnij właściwość **"Drzewo produktów - sprawdź"** do formularza
4. Opcjonalnie: Dodaj ikonę przez HTML/CSS w ustawieniach pola
5. Zapisz formularz

### Krok 4: Dodaj ikonę (opcjonalnie)

Jeśli chcesz dodać ikonę obok linku:

1. W ustawieniach formularza znajdź pole "Drzewo produktów"
2. W sekcji **"Field help text"** dodaj HTML:
   ```html
   <a href="https://146835084.fs1.hubspotusercontent-eu1.net/hubfs/146835084/Materia%C5%82y%20dla%20sprzedawc%C3%B3w/Drzewo%20produkt%C3%B3w.pdf" target="_blank" style="display: inline-flex; align-items: center; gap: 5px; color: #ff7a59; text-decoration: none;">
     <span>📄</span> Drzewo produktów - sprawdź
   </a>
   ```

## Metoda 2: Workflow (Automatyczne wypełnienie)

1. Przejdź do: **Automation → Workflows**
2. Utwórz nowy workflow: **"Auto-fill Drzewo produktów"**
3. **Trigger:** "When a deal is created"
4. **Action:** "Set property value"
5. **Property:** "Drzewo produktów"
6. **Value:** Wklej URL do PDF-a
7. Aktywuj workflow

## Metoda 3: Custom Code w Workflow

Jeśli potrzebujesz bardziej zaawansowanej logiki:

1. W workflow dodaj action: **"Custom code"**
2. Wklej kod:
```javascript
exports.main = async (event, callback) => {
  const pdfUrl = 'https://146835084.fs1.hubspotusercontent-eu1.net/hubfs/146835084/Materia%C5%82y%20dla%20sprzedawc%C3%B3w/Drzewo%20produkt%C3%B3w.pdf';
  
  callback({
    outputFields: {
      drzewo_produktow: pdfUrl
    }
  });
};
```

## Weryfikacja

1. Przejdź do: **Sales → Deals**
2. Kliknij **"Create deal"**
3. Sprawdź czy pole "Drzewo produktów" jest widoczne
4. Sprawdź czy link działa (kliknij)

## Rozwiązywanie problemów

- **Pole nie jest widoczne:** Sprawdź czy dodałeś je do formularza
- **Link nie działa:** Sprawdź czy URL jest poprawny i dostępny
- **Ikona nie wyświetla się:** Sprawdź czy HTML jest poprawny w help text

