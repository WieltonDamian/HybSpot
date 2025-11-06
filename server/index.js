const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

const HUBSPOT_API_BASE = 'https://api.hubapi.com';
const HUBSPOT_ACCESS_TOKEN = process.env.HUBSPOT_ACCESS_TOKEN;
const HUBSPOT_PORTAL_ID = process.env.HUBSPOT_PORTAL_ID;

// Helper function to make HubSpot API calls
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
    console.error('HubSpot API Error:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || { message: error.message },
    };
  }
};

// Routes

// Get account info
app.get('/api/account/info', async (req, res) => {
  const result = await hubspotRequest('GET', '/integrations/v1/me');
  res.json(result);
});

// Get contacts
app.get('/api/contacts', async (req, res) => {
  const limit = req.query.limit || 10;
  const result = await hubspotRequest(
    'GET',
    `/crm/v3/objects/contacts?limit=${limit}&properties=firstname,lastname,email,phone,company`
  );
  res.json(result);
});

// Get single contact
app.get('/api/contacts/:id', async (req, res) => {
  const result = await hubspotRequest(
    'GET',
    `/crm/v3/objects/contacts/${req.params.id}?properties=firstname,lastname,email,phone,company`
  );
  res.json(result);
});

// Create note for contact
app.post('/api/contacts/:id/notes', async (req, res) => {
  const { note, priority } = req.body;
  
  // First create the note
  const noteData = {
    properties: {
      hs_note_body: note,
      hs_timestamp: new Date().toISOString(),
    },
    associations: [
      {
        to: {
          id: req.params.id,
        },
        types: [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 214, // Contact to Note
          },
        ],
      },
    ],
  };

  const noteResult = await hubspotRequest('POST', '/crm/v3/objects/notes', noteData);
  
  if (noteResult.success) {
    // Optionally update contact with priority if custom property exists
    if (priority) {
      await hubspotRequest('PATCH', `/crm/v3/objects/contacts/${req.params.id}`, {
        properties: {
          csm_priority: priority, // Custom property - needs to be created in HubSpot
        },
      });
    }
  }

  res.json(noteResult);
});

// Get notes for contact
app.get('/api/contacts/:id/notes', async (req, res) => {
  const result = await hubspotRequest(
    'GET',
    `/crm/v3/objects/contacts/${req.params.id}/associations/notes`
  );
  res.json(result);
});

// Update contact property
app.patch('/api/contacts/:id', async (req, res) => {
  const { properties } = req.body;
  const result = await hubspotRequest(
    'PATCH',
    `/crm/v3/objects/contacts/${req.params.id}`,
    { properties }
  );
  res.json(result);
});

// Get deals
app.get('/api/deals', async (req, res) => {
  const limit = req.query.limit || 10;
  const result = await hubspotRequest(
    'GET',
    `/crm/v3/objects/deals?limit=${limit}&properties=dealname,amount,dealstage,closedate`
  );
  res.json(result);
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    portalId: HUBSPOT_PORTAL_ID,
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`🚀 CSM Server running on http://localhost:${PORT}`);
  console.log(`📊 Connected to HubSpot Portal: ${HUBSPOT_PORTAL_ID}`);
});

