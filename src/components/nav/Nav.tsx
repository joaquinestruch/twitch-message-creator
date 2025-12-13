import { useState } from "react";
import { emblestList } from "@/utils/embleds";
import "./nav.css";
import { colorsName } from "@/utils/colorsName";
import html2canvas from "html2canvas";
import Modal from "@/components/ModalAddEmote";
import { useChatStore } from "@/store/useChatStore";

function Nav() {
  const {
    username,
    messageText,
    setUsername,
    setMessageText,
    setColorUsername,
    setEmbledsArray,
    setIsModalOpen,
    isModalOpen,
  } = useChatStore();

  const [selectedImages, setSelectedImages] = useState<Record<string, boolean>>(
    {},
  );
  const handleSaveCommentClick = () => {
    const elementToCapture = document.getElementsByClassName(
      "message",
    )[0] as HTMLElement;

    if (!elementToCapture) return;

    const options = {
      allowTaint: true,
      useCORS: true,
      backgroundColor: null,
    };

    html2canvas(elementToCapture, options).then((canvas) => {
      const dataUrl = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `message_${username}_${messageText}`;
      link.click();
    });
  };

  const handleClickImageEmbleds = (e: string) => {
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
      <Modal isOpen={isModalOpen} onClose={setIsModalOpen} />
      <nav className="config-nav">
        <div className="nav-emblems">
          <p>Emblems</p>
          <ul>
            {emblestList.map((e) => {
              const isSelected = selectedImages[e];
              return (
                <li key={e}>
                  <button
                    onClick={() => handleClickImageEmbleds(e)}
                    className={`emblem-btn ${isSelected ? "selected" : ""}`}
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                  >
                    <img
                      src={e}
                      alt={`Emote ${e}`}
                      className={isSelected ? "image-selected" : ""}
                    />
                  </button>
                </li>
              );
            })}
          </ul>
          <button
            className="save-comment"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            Add custom emblem
          </button>
        </div>

        <div className="nav-emblems">
          <p>Username colors</p>
          <ul>
            {colorsName.map((e) => {
              return (
                <li key={e}>
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
              value={username} 
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
              value={messageText}
              onChange={(e) => {
                setMessageText(e.target.value);
              }}
            />
          </section>

          <button className="save-comment" onClick={handleSaveCommentClick}>
            Save comment
          </button>

          <a
            href="https://ko-fi.com/N4N41PTRX2"
            target="_blank"
            rel="noopener noreferrer"
            className="support-button"
          >
            <img
              height="36"
              style={{
                border: "0px",
                height: "25px",
                verticalAlign: "middle",
                marginRight: "5px",
              }}
              src="https://storage.ko-fi.com/cdn/cup-border.png"
              alt="Buy Me a Coffee at ko-fi.com"
            />
            Support me on Ko-fi
          </a>
        </div>
      </nav>
    </>
  );
}

export default Nav;
