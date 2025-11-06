/**
 * Alternatywne rozwiązanie: Workflow do automatycznego dodawania linku
 * To jest przykład - workflow trzeba skonfigurować ręcznie w HubSpot
 */

const PDF_URL = 'https://146835084.fs1.hubspotusercontent-eu1.net/hubfs/146835084/Materia%C5%82y%20dla%20sprzedawc%C3%B3w/Drzewo%20produkt%C3%B3w.pdf';

console.log('📋 Instrukcja konfiguracji Workflow w HubSpot:');
console.log('');
console.log('1. Przejdź do: Automation → Workflows');
console.log('2. Utwórz nowy workflow: "Auto-fill Drzewo produktów"');
console.log('3. Trigger: "When a deal is created"');
console.log('4. Action: "Set property value"');
console.log('5. Property: "Drzewo produktów" (lub "drzewo_produktow_link")');
console.log(`6. Value: ${PDF_URL}`);
console.log('');
console.log('💡 Alternatywnie możesz użyć Custom Code action:');
console.log('');
console.log('```javascript');
console.log('exports.main = async (event, callback) => {');
console.log(`  const pdfUrl = '${PDF_URL}';`);
console.log('  callback({');
console.log('    outputFields: {');
console.log("      drzewo_produktow_link: pdfUrl");
console.log('    }');
console.log('  });');
console.log('};');
console.log('```');

