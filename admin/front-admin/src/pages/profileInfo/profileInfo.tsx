import React from "react";
import "./profileInfo.css";

const ProfileInfo = () => {
  const profileData = {
    firstName: "Ime",
    lastName: "Prezime",
    createdAt: "2024-10-25",
    username: "korisnicko_ime",
    email: "email@example.com",
    points: 120,
  };

  return (
    <div className="profile-container">
      <h2 className="profile-header">Profile Information</h2>
      <div className="profile-row">
        <span className="profile-label">Ime:</span>
        <span className="profile-value">{profileData.firstName}</span>
      </div>
      <div className="profile-row">
        <span className="profile-label">Prezime:</span>
        <span className="profile-value">{profileData.lastName}</span>
      </div>
      <div className="profile-row">
        <span className="profile-label">Datum kreiranja:</span>
        <span className="profile-value">{profileData.createdAt}</span>
      </div>
      <div className="profile-row">
        <span className="profile-label">Username:</span>
        <span className="profile-value">{profileData.username}</span>
      </div>
      <div className="profile-row">
        <span className="profile-label">Email:</span>
        <span className="profile-value">{profileData.email}</span>
      </div>
      <div className="profile-row">
        <span className="profile-label">Broj bodova:</span>
        <span className="profile-value">{profileData.points}</span>
      </div>
    </div>
  );
};

export default ProfileInfo;
