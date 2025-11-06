/**
 * Minimalna serverless function dla HubSpot (pojedyncza funkcja testowa)
 */

exports.main = async (event, callback) => {
  callback({
    outputFields: {
      message: "Hello from minimal HubSpot project",
      timestamp: new Date().toISOString()
    }
  });
};