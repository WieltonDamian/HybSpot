/**
 * Skrypt do dodania Custom Property z linkiem do "Drzewo produktów" dla dealów
 * Uruchom: node server/scripts/add-deal-link-property.js
 */

const axios = require('axios');
require('dotenv').config();

const HUBSPOT_API_BASE = 'https://api.hubapi.com';
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

const PDF_URL = 'https://146835084.fs1.hubspotusercontent-eu1.net/hubfs/146835084/Materia%C5%82y%20dla%20sprzedawc%C3%B3w/Drzewo%20produkt%C3%B3w.pdf';

const hubspotRequest = async (method, endpoint, data = null) => {
  try {
    const config = {
      method,
      url: `${HUBSPOT_API_BASE}${endpoint}`,
      headers: {
        'Authorization': `Bearer ${HUBSPOT_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
    };

    if (data) {
      config.data = data;
    }

    const response = await axios(config);
    return { success: true, data: response.data };
  } catch (error) {
    return {
      success: false,
      error: error.response?.data || { message: error.message },
    };
  }
};

async function createDealLinkProperty() {
  console.log('🚀 Tworzenie Custom Property z linkiem do Drzewa produktów...\n');

  const property = {
    name: 'drzewo_produktow_link',
    label: 'Drzewo produktów',
    type: 'string',
    fieldType: 'text',
    description: 'Link do dokumentu Drzewo produktów - sprawdź przed utworzeniem transakcji',
    formField: true,
    showCurrencySymbol: false,
    // Usuwamy groupName - HubSpot użyje domyślnej grupy
  };

  console.log('Tworzenie właściwości dla dealów...');
  
  const result = await hubspotRequest(
    'POST',
    '/crm/v3/properties/deals',
    property
  );

  if (result.success) {
    console.log(`✅ Utworzono właściwość: ${property.label}\n`);
    console.log('📝 Następne kroki:');
    console.log('1. Przejdź do HubSpot: Settings → Properties → Deals');
    console.log('2. Znajdź właściwość "Drzewo produktów"');
    console.log('3. Dodaj ją do formularza tworzenia transakcji');
    console.log('4. Ustaw domyślną wartość lub użyj workflow do automatycznego wypełnienia');
    console.log(`\n🔗 URL do PDF: ${PDF_URL}`);
  } else {
    if (result.error?.message?.includes('already exists')) {
      console.log(`⚠️  Właściwość już istnieje: ${property.label}\n`);
      console.log('Możesz teraz:');
      console.log('1. Przejdź do HubSpot: Settings → Properties → Deals');
      console.log('2. Znajdź właściwość "Drzewo produktów"');
      console.log('3. Dodaj ją do formularza tworzenia transakcji');
    } else {
      console.log(`❌ Błąd: ${JSON.stringify(result.error, null, 2)}\n`);
    }
  }
}

// Alternatywnie: Utworzenie właściwości typu URL (jeśli dostępne)
async function createDealUrlProperty() {
  console.log('\n🔄 Próba utworzenia właściwości typu URL...\n');

  const property = {
    name: 'drzewo_produktow',
    label: 'Drzewo produktów - sprawdź',
    type: 'string',
    fieldType: 'text',
    description: 'Link do dokumentu Drzewo produktów',
    formField: true,
    // Usuwamy groupName - HubSpot użyje domyślnej grupy
  };

  const result = await hubspotRequest(
    'POST',
    '/crm/v3/properties/deals',
    property
  );

  if (result.success) {
    console.log(`✅ Utworzono właściwość URL: ${property.label}\n`);
    
    // Ustaw domyślną wartość przez aktualizację właściwości
    console.log('💡 Możesz ustawić domyślną wartość w ustawieniach właściwości w HubSpot');
    console.log(`   Domyślna wartość: ${PDF_URL}`);
  } else {
    if (result.error?.message?.includes('already exists')) {
      console.log(`⚠️  Właściwość URL już istnieje\n`);
    } else {
      console.log(`⚠️  Nie można utworzyć typu URL, używamy typu text\n`);
    }
  }
}

// Uruchom obie próby
async function main() {
  await createDealUrlProperty();
  await createDealLinkProperty();
  
  console.log('\n✨ Zakończono!');
  console.log('\n📋 Instrukcje:');
  console.log('1. W HubSpot: Settings → Properties → Deals');
  console.log('2. Znajdź właściwość "Drzewo produktów" lub "Drzewo produktów - sprawdź"');
  console.log('3. Kliknij "Edit" i ustaw domyślną wartość:');
  console.log(`   ${PDF_URL}`);
  console.log('4. W Settings → Objects → Deals → Create form');
  console.log('5. Dodaj właściwość do formularza');
  console.log('6. Opcjonalnie: Dodaj ikonę przez Custom Code (jeśli masz dostęp)');
}

if (require.main === module) {
  main().catch(console.error);
}

module.exports = { createDealLinkProperty, createDealUrlProperty };

