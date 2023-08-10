import React from "react";
import { useState, useEffect } from "react";
import "./Meme.css";
export default function Meme() {
  const [meme, setMeme] = useState({
    topText: "",
    bottomText: "",
    randomMeme: "http://i.imgflip.com/1bij.jpg",
  });
  const [allMemes, setAllMemes] = useState([]);
  useEffect(() => {
    async function getMemes() {
      const res = await fetch("https://api.imgflip.com/get_memes");
      const data = await res.json()
      setAllMemes(data.data.memes)
    }
    getMemes()
  },[]);
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomMeme: url,
    }));
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
    }));
  }
  return (
    <main className="container">
      <div className="form">
        <input
          type="text"
          placeholder="Top text"
          className="form--input"
          onChange={handleChange}
          name="topText"
          value={meme.topText}
        />
        <input
          type="text"
          placeholder="Bottom text"
          className="form--input"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button className="form--btn" onClick={getMemeImage}>
          Get a new meme image 🖼️
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomMeme} alt="meme-img" className="meme-img" />
        <h2 className="form--text top">{meme.topText}</h2>
        <h2 className="form--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  );
}
