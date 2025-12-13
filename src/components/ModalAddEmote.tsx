import { useState } from "react";
import { emblestList } from "@/utils/embleds";
import "./modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: (v: boolean) => void;
}

const Modal = ({ isOpen, onClose }: ModalProps) => {
  const [isCorrect, setIsCorrect] = useState<boolean>(true);

  return (
    <div className={`modal ${isOpen ? "open" : ""}`}>
      <div className="modal-content">
        <h2 style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          Add custom embled{" "}
          <button
            onClick={() => {
              onClose(false);
            }}
          >
            x{" "}
          </button>
        </h2>

        <form
          action="submit"
          onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
            e.preventDefault();
            const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
            
            // Access input via elements
            const form = e.currentTarget;
            const input = form.elements[0] as HTMLInputElement;

            if (linkRegex.test(input.value)) {
              emblestList.push(input.value);
              onClose(false);
              input.value = "";
              return;
            }

            setIsCorrect(false);
            setTimeout(() => {
              setIsCorrect(true);
            }, 2500);
          }}
        >
          <input
            className="modal-input"
            type="text"
            placeholder="Image link"
            style={{ border: "1px solid #a970ff" }}
          />

          <div style={{ display: "flex", gap: "20px" }}>
            <button>Add</button>
            {isCorrect === false ? (
              <div className="alert-invalid-link-modal">Invalid Link</div>
            ) : (
              ""
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
