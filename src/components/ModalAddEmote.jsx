import { emblestList } from "../utils/embleds";
import "./modal.css"

const Modal = ({ isOpen, onClose }) => {
    return (
      <div className={`modal ${isOpen ? 'open' : ''}`}>
         
        <div className="modal-content">
         
          <h2 style={{display:"flex", "alignItems": "center", "gap":"20px"}}>Add custom embled <button onClick={(e) => {
            onClose(false)
          }}>x</button></h2>
         
          <form action="submit" onSubmit={(e) => {
            e.preventDefault()
            const linkRegex = /^(ftp|http|https):\/\/[^ "]+$/
            
            if(linkRegex.test(e.target.elements[0].value)){
                emblestList.push(e.target.elements[0].value)
                onClose(false)
                e.target.elements[0].value = "";
                return
            }
        
          }}>
          <input className="modal-input" type="text" placeholder="Image link" />
          <button>Add</button>
          </form>

        </div>
      </div>
    );
  };

export default Modal