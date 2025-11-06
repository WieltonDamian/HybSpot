import React, { useState } from 'react';
import './App.css';
import CSMDashboard from './components/CSMDashboard';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';

function App() {
  const [selectedContactId, setSelectedContactId] = useState<string | null>(null);
  const [view, setView] = useState<'dashboard' | 'contacts'>('dashboard');

  return (
    <div className="App">
      <header className="App-header">
        <h1>HubSpot CSM - Rozbudowa</h1>
        <nav>
          <button onClick={() => setView('dashboard')}>Dashboard</button>
          <button onClick={() => setView('contacts')}>Kontakty</button>
        </nav>
      </header>

      <main>
        {view === 'dashboard' && <CSMDashboard />}
        {view === 'contacts' && (
          <>
            <ContactList onSelectContact={setSelectedContactId} />
            {selectedContactId && (
              <ContactDetail
                contactId={selectedContactId}
                onClose={() => setSelectedContactId(null)}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
