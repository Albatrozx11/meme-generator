import React from "react";
import "./Header.css";
import logo from "../images/troll-face.png";
export default function Header() {
  return (
    <header className="navbar">
      <img src={logo} alt="" className="trollface" />
      <h3 className="title">Meme Generator</h3>
    </header>
  );
}
