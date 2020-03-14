import React from "react";
import "./Profile.css";

// Компонент профиля пользователя.
export const Profile = ({ user }) => {
  return (
    <div className="Profile">
      <h1>Мой профиль</h1>
      <div>Имя пользователя: {user.userName}</div>
    </div>
  );
};
