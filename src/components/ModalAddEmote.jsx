import { useState } from "react";
import { emblestList } from "../utils/embleds";
import "./modal.css"

const Modal = ({ isOpen, onClose }) => {
  
    const [isCorrect, setIsCorrect] = useState(true); 

    return (
      <div className={`modal ${isOpen ? 'open' : ''}`}>
         
        <div className="modal-content">
         
          <h2 style={{display:"flex", "alignItems": "center", "gap":"20px"}}>Add custom embled <button onClick={(e) => {
            onClose(false)
          }}>x  </button></h2>
         
          <form action="submit" onSubmit={(e) => {
            
            e.preventDefault();
            const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/;
        
            if (linkRegex.test(e.target.elements[0].value)) {
              emblestList.push(e.target.elements[0].value);
              onClose(false); 
              e.target.elements[0].value = '';
              return;
            }
        
            setIsCorrect(false); 
            setTimeout(() => {
              setIsCorrect(true); 
            }, 2500);

        
          }}>
          <input className="modal-input" type="text" placeholder="Image link" style={{border: "1px solid #a970ff"}} />

            {
              isCorrect === false ? <div className="alert-invalid-link-modal">Invalid Link</div> : ""
            }

          
          <button>Add</button>
          </form>

        </div>
      </div>
    );
  };

export default Modal