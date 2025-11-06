/**
 * Skrypt do tworzenia Custom Properties dla CSM w HubSpot
 * Uruchom: node server/scripts/create-custom-properties.js
 */

const axios = require('axios');
require('dotenv').config();

const HUBSPOT_API_BASE = 'https://api.hubapi.com';
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;

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

// Custom Properties dla CSM
const csmProperties = [
  {
    name: 'csm_priority',
    label: 'CSM Priority',
    type: 'enumeration',
    fieldType: 'select',
    options: [
      { label: 'Niski', value: 'low' },
      { label: 'Średni', value: 'medium' },
      { label: 'Wysoki', value: 'high' },
    ],
    description: 'Priorytet klienta dla Customer Success Manager',
  },
  {
    name: 'csm_status',
    label: 'CSM Status',
    type: 'enumeration',
    fieldType: 'select',
    options: [
      { label: 'Aktywny', value: 'active' },
      { label: 'Ryzyko', value: 'at_risk' },
      { label: 'Churn', value: 'churned' },
      { label: 'Prospekt', value: 'prospect' },
    ],
    description: 'Status klienta w procesie CSM',
  },
  {
    name: 'csm_health_score',
    label: 'CSM Health Score',
    type: 'number',
    fieldType: 'number',
    description: 'Wynik zdrowia klienta (0-100)',
  },
  {
    name: 'csm_last_review_date',
    label: 'CSM Last Review Date',
    type: 'date',
    fieldType: 'date',
    description: 'Data ostatniego przeglądu CSM',
  },
  {
    name: 'csm_next_review_date',
    label: 'CSM Next Review Date',
    type: 'date',
    fieldType: 'date',
    description: 'Data następnego przeglądu CSM',
  },
  {
    name: 'csm_notes',
    label: 'CSM Notes',
    type: 'string',
    fieldType: 'textarea',
    description: 'Notatki CSM dotyczące klienta',
  },
];

async function createCustomProperties() {
  console.log('🚀 Tworzenie Custom Properties dla CSM...\n');

  for (const property of csmProperties) {
    console.log(`Tworzenie właściwości: ${property.label}...`);
    
    const result = await hubspotRequest(
      'POST',
      '/crm/v3/properties/contacts',
      property
    );

    if (result.success) {
      console.log(`✅ Utworzono: ${property.label}\n`);
    } else {
      if (result.error?.message?.includes('already exists')) {
        console.log(`⚠️  Właściwość już istnieje: ${property.label}\n`);
      } else {
        console.log(`❌ Błąd: ${JSON.stringify(result.error)}\n`);
      }
    }
  }

  console.log('✨ Zakończono tworzenie Custom Properties!');
}

// Uruchom jeśli wywołane bezpośrednio
if (require.main === module) {
  createCustomProperties().catch(console.error);
}

module.exports = { createCustomProperties, csmProperties };

