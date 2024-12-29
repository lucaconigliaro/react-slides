import pics from "../data/data";
import "../index.css";
import { useEffect, useState } from "react";

function AppMain() {

   // Stato che tiene traccia dell'indice della slide attiva, inizialmente la prima slide (indice 0)
   const [activeIndex, setActiveIndex] = useState(0);

   // Funzione per passare alla slide precedente
   const handlePrev = () => {
       setActiveIndex((prevIndex) => 
           // Se siamo alla prima slide (indice 0), torna all'ultima slide (indice pics.length - 1)
           prevIndex === 0 ? pics.length - 1 : prevIndex - 1
       );
   };

   // Funzione per passare alla slide successiva
   const handleNext = () => {
       setActiveIndex((prevIndex) => 
           // Se siamo all'ultima slide (indice pics.length - 1), torna alla prima slide (indice 0)
           prevIndex === pics.length - 1 ? 0 : prevIndex + 1
       );
   };

   // Funzionalità di auto-scroll: cambia la slide automaticamente ogni 3 secondi
   useEffect(() => {
       // Imposta un intervallo per cambiare la slide attiva ogni 3 secondi
       const intervalId = setInterval(() => {
           setActiveIndex((prevIndex) => 
               // Se siamo all'ultima slide, torna alla prima
               prevIndex === pics.length - 1 ? 0 : prevIndex + 1
           );
       }, 3000); // Ogni 3 secondi

       // La funzione di cleanup che cancella l'intervallo quando il componente viene smontato
       return () => clearInterval(intervalId);
   }, []);  // Il secondo parametro [] significa che l'effetto verrà eseguito solo al montaggio del componente

   return (
       <div className="container">
           <div id="carousel">
               <div className="gallery">
                   {/* Mappa le immagini e crea una figura per ogni immagine */}
                   {pics.map((pic, index) => (
                       <figure key={index} className={index === activeIndex ? "active" : ""}>
                           <img src={pic.image} alt={pic.title} />
                           <figcaption>
                               <h2>{pic.title}</h2>
                               <h3>{pic.text}</h3>
                           </figcaption>
                       </figure>
                   ))}
               </div>

               {/* Bottone per la slide precedente */}
               <i
                   id="prev"
                   className="fa-solid fa-circle-arrow-left"
                   onClick={handlePrev}  // Chiamata alla funzione per passare alla slide precedente
               ></i>
               {/* Bottone per la slide successiva */}
               <i
                   id="next"
                   className="fa-solid fa-circle-arrow-right" 
                   onClick={handleNext}  // Chiamata alla funzione per passare alla slide successiva
               ></i>
           </div>

           <div id="thumbnails">
               {/* Sezione per i thumbnail delle immagini */}
               {pics.map((pic, index) => (
                   <img
                       key={index}
                       src={pic.image}
                       alt={pic.title}
                       className={index === activeIndex ? "active" : ""}  // Aggiunge la classe "active" al thumbnail della slide attiva
                       onClick={() => setActiveIndex(index)}  // Cambia la slide quando l'utente clicca sulla miniatura
                   />
               ))}
           </div>
       </div>
   );
};

export default AppMain;