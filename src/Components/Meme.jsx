import React from "react";
import { useState, useEffect } from "react";
import "./Meme.css";
import domtoimage from "dom-to-image";
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
      const data = await res.json();
      setAllMemes(data.data.memes);
    }
    getMemes();
  }, []);
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomMeme: url,
    }));
  }

  async function handleDownload() {
    const memeContainer = document.querySelector(".meme");

    await new Promise((resolve) => {
      const image = new Image();
      image.src = meme.randomMeme;
      image.onload = resolve;
    });

    domtoimage
      .toPng(memeContainer)
      .then((dataUrl) => {
        // Create a temporary anchor element to trigger the download
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${meme.topText}.png`;
        link.click();
      })
      .catch((error) => {
        console.error("Error capturing meme:", error);
      });
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
      <button className="download--btn" onClick={handleDownload}>
        Download Meme 📥
      </button>
    </main>
  );
}
