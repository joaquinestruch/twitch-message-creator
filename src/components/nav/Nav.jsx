import React, { useRef, useEffect, useState } from 'react'
import { emblestList } from '../../utils/embleds'
import "./nav.css"
import { colorsName } from '../../utils/colorsName'
import html2canvas from 'html2canvas';

function Nav({setUsername, setMessageText,setColorUsername, setEmbledsArray,embledsArray}) {



    const handleSaveCommentClick = () => {
        const elementToCapture = document.getElementsByClassName('message')[0];
      
        // Opciones para html2canvas
        const options = {
          allowTaint: true,
          useCORS: true,
          backgroundColor: null,
        };
      
        html2canvas(elementToCapture, options)
          .then((canvas) => {
            // Convertir el canvas a imagen PNG
            const dataUrl = canvas.toDataURL('image/png');
      
            // Crear un enlace temporal y descargar la imagen
            const link = document.createElement('a');
            link.href = dataUrl;
            link.download = 'comment_screenshot.png';
            link.click();
          });
      };

  return (
    <nav>
        <div className='nav-emblems'>
            <p>
            Emblems
            </p>
            <ul>
            {
                emblestList.map((e) => {
                    return <li key={crypto.randomUUID()}>
                        <img src={e} alt="" onClick={(event) => {

                            setEmbledsArray((oldEmbedArray) => {
                                if (oldEmbedArray.includes(e)) {
                                return oldEmbedArray.filter(item => item !== e);
                                } else {
                                return [...oldEmbedArray, e];
                                }
                            });

                        }} />
                    </li>
                })
            }
            </ul>

        </div>

        <div className='nav-emblems'>
            <p>
            Username colors
            </p>
            <ul>
            {
                colorsName.map((e) => {
                    return <li key={crypto.randomUUID()}>
                        <button style={{backgroundColor:e}} onClick={() => {
                            setColorUsername(e)
                        }} className='button-select-color'></button>
                    </li>
                })
            }
            </ul>
        </div>

        <div className='inputs-message'>
            
            <section className='select-username' style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                <span>Username</span>
                <input type="text" onChange={(e) => {
                    setUsername(e.target.value)
                }}/>
            </section>

            <section className='select-text-message' style={{display:"flex", flexDirection:"column", gap:"10px"}}>
                <span>Message Text</span>
                <textarea type="text" onChange={(e) => {
                    setMessageText(e.target.value)
                }}/>
            </section>

            <button className='save-comment' onClick={handleSaveCommentClick}>Save comment</button>

        </div>

    </nav>
  )
}

export default Nav