import React from "react";

const PerfilUsuario = ({ user }) => {
  if (!user) return null;

  return (
    <div className="perfil-usuario">
      <div className="perfil-header">
        <h1>{user.name}</h1>
      </div>
      <div className="perfil-info">
        <h2>Información personal</h2>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Teléfono:</strong> {user.phone}</p>
      </div>
      <div className="perfil-info">
        <h2>Dirección</h2>
        <p>
          {user.address.street}, {user.address.suite}<br />
          {user.address.city}, {user.address.zipcode}
        </p>
      </div>
      <div className="perfil-info">
        <h2>Compañía</h2>
        <p><strong>Nombre:</strong> {user.company.name}</p>
        <p><strong>Eslogan:</strong> {user.company.catchPhrase}</p>
        <p><strong>Negocio:</strong> {user.company.bs}</p>
      </div>
    </div>
  );
};

export default PerfilUsuario;
