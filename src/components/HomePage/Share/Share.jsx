import React from "react";
import "./Share.css";
import instagramIcon from "./icons8-instagram.svg";
import facebookIcon from "./icons8-facebook.svg";

// Share component definition
const Share = () => {
  return (
    <div className="share-container">
      <p>Share your stats with others.</p>
        <div className="share-icons">
            <div className="instagramLink" onClick={() => window.open("https://www.instagram.com/")}>
            <img src={instagramIcon} alt="Instagram" className="instagramLogo" />
            <p className="InstagramText">Instagram</p>
            </div>
            <div className="facebookLink" onClick={() => window.open("https://www.facebook.com/")}>
            <img src={facebookIcon} alt="Facebook" className="facebookLogo"/>   
            <p className="FacebookText">Facebook</p>
            </div>

        </div>
    </div>
  );
};

export default Share;