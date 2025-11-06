import React, { useEffect, useState } from 'react';
import axios from 'axios';

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

interface ContactListProps {
  onSelectContact: (contactId: string) => void;
}

const ContactList: React.FC<ContactListProps> = ({ onSelectContact }) => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/contacts?limit=20');
      if (response.data.success) {
        setContacts(response.data.data.results || []);
      } else {
        setError('Nie udało się pobrać kontaktów');
      }
    } catch (err: any) {
      setError(err.message || 'Błąd połączenia z serwerem');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="contact-list-loading">Ładowanie kontaktów...</div>;
  }

  if (error) {
    return <div className="contact-list-error">Błąd: {error}</div>;
  }

  return (
    <div className="contact-list">
      <h2>Lista kontaktów</h2>
      <div className="contacts-grid">
        {contacts.map((contact) => (
          <div
            key={contact.id}
            className="contact-card"
            onClick={() => onSelectContact(contact.id)}
          >
            <h3>
              {contact.properties.firstname || ''} {contact.properties.lastname || ''}
            </h3>
            <p><strong>Email:</strong> {contact.properties.email || 'Brak'}</p>
            <p><strong>Telefon:</strong> {contact.properties.phone || 'Brak'}</p>
            <p><strong>Firma:</strong> {contact.properties.company || 'Brak'}</p>
            <button className="view-details-btn">Zobacz szczegóły</button>
          </div>
        ))}
      </div>
      {contacts.length === 0 && (
        <p className="no-contacts">Brak kontaktów do wyświetlenia</p>
      )}
    </div>
  );
};

export default ContactList;

