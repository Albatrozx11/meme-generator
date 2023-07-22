import React from "react";
import { useState } from "react";
import "./Meme.css";
import memesData from "../memesData";
export default function Meme() {
  const [memeImage, setMemeImage] = useState("")
  function getMemeImage(){
    const memes = memesData.data.memes
    const randomNumber = Math.floor(Math.random() * memes.length)
    const randomMeme = memes[randomNumber]
    setMemeImage(randomMeme.url)
  }
  return (
    <main className="container">
      <div className="form">
        <input type="text" placeholder="Top text" className="form--input" />
        <input type="text" placeholder="Bottom text" className="form--input" />
        <button className="form--btn" onClick={getMemeImage}>Get a new meme image 🖼️</button>
      </div>
      <img src={memeImage} alt="meme-img" className="meme-img"/>
    </main>
  );
}
