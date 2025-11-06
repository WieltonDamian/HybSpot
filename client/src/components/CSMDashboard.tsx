import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface AccountInfo {
  portalId: number;
  accountType: string;
  currency: string;
}

const CSMDashboard: React.FC = () => {
  const [accountInfo, setAccountInfo] = useState<AccountInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchAccountInfo();
  }, []);

  const fetchAccountInfo = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3001/api/account/info');
      if (response.data.success) {
        setAccountInfo(response.data.data);
      } else {
        setError('Nie udało się pobrać informacji o koncie');
      }
    } catch (err: any) {
      setError(err.message || 'Błąd połączenia z serwerem');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="dashboard-loading">Ładowanie...</div>;
  }

  if (error) {
    return <div className="dashboard-error">Błąd: {error}</div>;
  }

  return (
    <div className="csm-dashboard">
      <h2>CSM Dashboard</h2>
      <div className="dashboard-content">
        <div className="info-card">
          <h3>Informacje o koncie HubSpot</h3>
          {accountInfo && (
            <div className="info-details">
              <p><strong>Portal ID:</strong> {accountInfo.portalId}</p>
              <p><strong>Typ konta:</strong> {accountInfo.accountType}</p>
              <p><strong>Waluta:</strong> {accountInfo.currency}</p>
            </div>
          )}
        </div>

        <div className="info-card">
          <h3>Funkcjonalności CSM</h3>
          <ul>
            <li>✅ Zarządzanie kontaktami</li>
            <li>✅ Notatki CSM</li>
            <li>✅ Priorytetyzacja klientów</li>
            <li>✅ Dashboard z informacjami</li>
          </ul>
        </div>

        <div className="info-card">
          <h3>Instrukcje</h3>
          <p>
            Przejdź do zakładki "Kontakty" aby zobaczyć listę klientów
            i zarządzać relacjami CSM.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CSMDashboard;

