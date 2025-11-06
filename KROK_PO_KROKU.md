# 🌳 Krok po kroku: Dodanie linku "Drzewo produktów" do formularza

## KROK 1: Utwórz właściwość w HubSpot

1. W HubSpot kliknij: **Settings** (⚙️ w prawym górnym rogu)
2. W lewym menu: **Properties** → **Deal properties**
3. Kliknij: **Create property** (lub **+ Create**)
4. Wypełnij formularz:
   - **Label:** `Drzewo produktów - sprawdź`
   - **Internal name:** `drzewo_produktow` (zostanie wygenerowane automatycznie)
   - **Field type:** Wybierz **`URL`** (jeśli dostępne) lub **`Text`**
   - **Description:** `Link do dokumentu Drzewo produktów - sprawdź przed utworzeniem transakcji`
   - **Form field:** ✅ Zaznacz (ważne!)
5. Kliknij **Create**

## KROK 2: Ustaw domyślną wartość (opcjonalnie)

1. W liście właściwości znajdź **"Drzewo produktów - sprawdź"**
2. Kliknij na nią (lub ikonę ołówka)
3. Przewiń do sekcji **"Default value"**
4. Wklej URL:
   ```
   https://146835084.fs1.hubspotusercontent-eu1.net/hubfs/146835084/Materiały%20dla%20sprzedawców/Drzewo%20produktów.pdf
   ```
5. Zapisz

## KROK 3: Dodaj do formularza tworzenia transakcji

1. W HubSpot przejdź do: **Sales** → **Deals**
2. Kliknij **"Create deal"** (lub **+ Utwórz Transakcja**)
3. W prawym górnym rogu formularza kliknij: **"Edytuj formularz"** (widoczne na Twoim screenie)
4. W edytorze formularza:
   - Z lewej strony zobaczysz listę dostępnych pól
   - Znajdź **"Drzewo produktów - sprawdź"**
   - **Przeciągnij** to pole do formularza (gdzie chcesz, żeby się pojawiło)
   - Lub kliknij na pole i wybierz **"Add to form"**
5. Kliknij **"Save"** lub **"Zapisz"**

## KROK 4: Dodaj ikonę (opcjonalnie, ale zalecane)

1. W edytorze formularza kliknij na pole **"Drzewo produktów - sprawdź"**
2. W ustawieniach pola znajdź: **"Field help text"** lub **"Help text"**
3. Wklej ten kod HTML:
   ```html
   <a href="https://146835084.fs1.hubspotusercontent-eu1.net/hubfs/146835084/Materiały%20dla%20sprzedawców/Drzewo%20produktów.pdf" target="_blank" style="display: inline-flex; align-items: center; gap: 8px; color: #ff7a59; text-decoration: none; font-weight: 500;">
     <span style="font-size: 18px;">📄</span>
     <span>Drzewo produktów - sprawdź</span>
   </a>
   ```
4. Zapisz

## KROK 5: Sprawdź

1. Zamknij formularz i otwórz ponownie: **Sales** → **Deals** → **Create deal**
2. Sprawdź czy pole **"Drzewo produktów - sprawdź"** jest widoczne
3. Kliknij link, żeby sprawdzić czy działa

## 🔧 Jeśli pole nie jest widoczne:

1. Sprawdź czy właściwość ma zaznaczone **"Form field"** w ustawieniach
2. Sprawdź czy dodałeś ją do formularza (Krok 3)
3. Sprawdź czy formularz jest zapisany

## 📝 Alternatywa: Użyj Workflow

Jeśli chcesz, żeby link był automatycznie wypełniany:

1. **Automation** → **Workflows** → **Create workflow**
2. **Trigger:** "When a deal is created"
3. **Action:** "Set property value"
4. **Property:** "Drzewo produktów - sprawdź"
5. **Value:** Wklej URL do PDF-a
6. Aktywuj workflow

---

**Link do PDF:**
```
https://146835084.fs1.hubspotusercontent-eu1.net/hubfs/146835084/Materiały%20dla%20sprzedawców/Drzewo%20produktów.pdf
```

