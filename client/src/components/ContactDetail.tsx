import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface ContactDetailProps {
  contactId: string;
  onClose: () => void;
}

interface Contact {
  id: string;
  properties: {
    firstname?: string;
    lastname?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
}

const ContactDetail: React.FC<ContactDetailProps> = ({ contactId, onClose }) => {
  const [contact, setContact] = useState<Contact | null>(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchContact();
  }, [contactId]);

  const fetchContact = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3001/api/contacts/${contactId}`);
      if (response.data.success) {
        setContact(response.data.data);
      }
    } catch (err: any) {
      console.error('Błąd pobierania kontaktu:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNote = async () => {
    if (!note.trim()) {
      setMessage('Notatka nie może być pusta');
      return;
    }

    try {
      setSaving(true);
      setMessage(null);
      const response = await axios.post(
        `http://localhost:3001/api/contacts/${contactId}/notes`,
        { note, priority }
      );

      if (response.data.success) {
        setMessage('Notatka zapisana pomyślnie!');
        setNote('');
        setTimeout(() => setMessage(null), 3000);
      } else {
        setMessage('Błąd podczas zapisywania notatki');
      }
    } catch (err: any) {
      setMessage('Błąd: ' + (err.message || 'Nieznany błąd'));
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="contact-detail-loading">Ładowanie...</div>;
  }

  if (!contact) {
    return <div className="contact-detail-error">Nie znaleziono kontaktu</div>;
  }

  return (
    <div className="contact-detail-overlay" onClick={onClose}>
      <div className="contact-detail" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        
        <h2>Szczegóły kontaktu</h2>
        
        <div className="contact-info">
          <p><strong>Imię:</strong> {contact.properties.firstname || 'Brak'}</p>
          <p><strong>Nazwisko:</strong> {contact.properties.lastname || 'Brak'}</p>
          <p><strong>Email:</strong> {contact.properties.email || 'Brak'}</p>
          <p><strong>Telefon:</strong> {contact.properties.phone || 'Brak'}</p>
          <p><strong>Firma:</strong> {contact.properties.company || 'Brak'}</p>
        </div>

        <div className="csm-section">
          <h3>Zarządzanie CSM</h3>
          
          <div className="priority-section">
            <label>Priorytet:</label>
            <div className="priority-buttons">
              <button
                className={priority === 'low' ? 'active' : ''}
                onClick={() => setPriority('low')}
              >
                Niski
              </button>
              <button
                className={priority === 'medium' ? 'active' : ''}
                onClick={() => setPriority('medium')}
              >
                Średni
              </button>
              <button
                className={priority === 'high' ? 'active' : ''}
                onClick={() => setPriority('high')}
              >
                Wysoki
              </button>
            </div>
          </div>

          <div className="notes-section">
            <label>Notatka CSM:</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Dodaj notatkę dotyczącą klienta..."
              rows={5}
            />
            <button
              onClick={handleSaveNote}
              disabled={saving || !note.trim()}
              className="save-note-btn"
            >
              {saving ? 'Zapisywanie...' : 'Zapisz notatkę'}
            </button>
          </div>

          {message && (
            <div className={`message ${message.includes('Błąd') ? 'error' : 'success'}`}>
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactDetail;

