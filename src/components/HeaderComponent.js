import React, { useEffect, useState } from "react";
import logo192 from "../resource/logo192.png";
import "../css/HeaderComponent.css";

function deleteCookie(name) {
  document.cookie = name + "=; Max-Age=0; path=/;";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === " ") c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

const HeaderComponent = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!getCookie("accessToken"));
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsLoggedIn(!!getCookie("accessToken"));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="header-navbar">
      <div className="header-container">
        <a className="header-brand" href="/">
          <img src={logo192} alt="Koko Logo" className="header-logo" />
          <span className="header-title">Koko</span>
          <span className="header-school">Kendriya School Bhopal</span>
        </a>
        <button
          className="header-toggle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          &#9776;
        </button>
        <nav className={`header-menu${menuOpen ? " open" : ""}`}>
          <a className="header-link" href="/">Home</a>
          <a className="header-link" href="/contact">Contact</a>
          {!isLoggedIn ? (
            <a className="header-btn primary ms-2" href="/signin">Login</a>
          ) : (
            <button
              className="header-btn ms-2"
              onClick={() => {
                deleteCookie("accessToken");
                window.location.href = "/";
              }}
            >
              Logout
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default HeaderComponent;
