import React, { useState } from 'react';

const UserRequests = () => {
  const [requests, setRequests] = useState([
    { id: 1, hours: 5, status: 'pendiente' },
    { id: 2, hours: 3, status: 'aprobada' },
  ]);

  return (
    <div>
      <h2>Mis Solicitudes</h2>
      <ul>
        {requests.map((request) => (
          <li key={request.id}>
            <p>Horas solicitadas: {request.hours}</p>
            <p>Estado: {request.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserRequests;
