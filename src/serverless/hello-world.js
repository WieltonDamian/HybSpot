/**
 * Prosta serverless function dla HubSpot
 * Testowe połączenie - weryfikacja że projekt działa
 */

exports.main = async (event, callback) => {
  console.log('Hello World from HubSpot CSM App!');
  
  callback({
    outputFields: {
      message: 'HubSpot CSM App działa poprawnie!',
      timestamp: new Date().toISOString()
    }
  });
};

