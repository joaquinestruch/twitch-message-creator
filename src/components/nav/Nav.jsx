import React, { useRef, useEffect, useState } from "react";
import { emblestList } from "../../utils/embleds";
import "./nav.css";
import { colorsName } from "../../utils/colorsName";
import html2canvas from "html2canvas";
import Modal from "../ModalAddEmote";

function Nav({
  setUsername,
  setMessageText,
  setColorUsername,
  setEmbledsArray,
  embledsArray,
  username,
  messageText,
  colorUsername,
  setIsModalOpen,
  isModalOpen
}) {
  const [selectedImages, setSelectedImages] = useState({});
  const handleSaveCommentClick = () => {
    const elementToCapture = document.getElementsByClassName("message")[0];

    const options = {
      allowTaint: true,
      useCORS: true,
      backgroundColor: null,
    };

    html2canvas(elementToCapture, options).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `message_${username}_${messageText.replace(" ", "_").replace(".", "_")}`;
      link.click();
    });
  };



  const handleClickImageEmbleds = (e) => {
    setEmbledsArray((oldEmbedArray) => {
      if (oldEmbedArray.includes(e)) {
        return oldEmbedArray.filter((item) => item !== e);
      } else {
        return [...oldEmbedArray, e];
      }
    });

    setSelectedImages((prevSelectedImages) => ({
      ...prevSelectedImages,
      [e]: !prevSelectedImages[e],
    }));
  };
  return (
    <>
    <Modal isOpen={isModalOpen} onClose={setIsModalOpen}/>
      <nav>
        <div className="nav-emblems">
          <p>Emblems</p>
          <ul>
            {emblestList.map((e) => {
            const isSelected = selectedImages[e];
              return (
                <li key={crypto.randomUUID()}>
                  <img
                    src={e}
                    alt=""
                    onClick={(event) => {
                      handleClickImageEmbleds(e);
                    }}
                    className={isSelected ? "image-selected" : ""}
                  />
                </li>
              );
            })}
            
          </ul>
          <button className="save-comment" onClick={() => {setIsModalOpen(true)}}>Add custom emblem</button>
        </div>

        <div className="nav-emblems">
          <p>Username colors</p>
          <ul>
            {colorsName.map((e) => {
              return (
                <li key={crypto.randomUUID()}>
                  <button
                    style={{ backgroundColor: e }}
                    onClick={() => {
                      setColorUsername(e);
                    }}
                    className="button-select-color"
                  ></button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="inputs-message">
          <section
            className="select-username"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <span>Username</span>
            <input
              type="text"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
          </section>

          <section
            className="select-text-message"
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <span>Message Text</span>
            <textarea
              type="text"
              onChange={(e) => {
                setMessageText(e.target.value);
              }}
            />
          </section>

          <button className="save-comment" onClick={handleSaveCommentClick}>
            Save comment
          </button>
        </div>
      </nav>
    </>
  );
}

export default Nav;
