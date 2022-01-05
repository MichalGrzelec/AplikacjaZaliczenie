import React, {useState, useEffect} from 'react';
import Dodatki from '../dane.json';


function Skomponuj(props) {

const [dodatki, setDodatki] = useState([]);
const [koszt, setKoszt] = useState(0);
const [baza, setBaza] = useState(500);

useEffect( () => {
Dodatki.map(dodatek => {
    dodatek.checked = dodatek.koszt === 0 ? true : false;
    return dodatek;
})

setDodatki(Dodatki);



}, [])

useEffect(() => {
setKoszt(dodatki.reduce( (suma, dodatek) => {
        return dodatek.checked ? suma + dodatek.koszt : suma;
     }, baza))
}, [baza, dodatki])

const dodatekZmiana = (dodatek) => {
    setDodatki(
        dodatki.map( el => {
            if(el.nazwa === dodatek.nazwa) el.checked = !el.checked;
            return el;
        })
    );

    
}
const zmienRozmiar = (rozmiar) => {
    setBaza(rozmiar);
} 
const dodajSalatka = () => {
    let wielkosc = "Średnia";
    if (baza === 300){
        wielkosc = "Mała";
    } else if (baza === 800){
        wielkosc = "Duża"
    }
    let salatka = {wielkosc: wielkosc, koszt: koszt, dodatki: []};
    dodatki.forEach(dodatek => {
        if (dodatek.checked) salatka.dodatki.push(dodatek);
    })
    props.otrzymajSalatke(salatka);
    resetujSalatke();
}

const resetujSalatke = () => {
    dodatki.forEach(dodatek => {
        dodatek.koszt === 0 ? dodatek.checked = true : dodatek.checked = false;
    })
    setBaza(500);
}



  return (
      <div className="skomponuj">
    <h1>Skomponuj sałatkę</h1>
    <h4>Cena: {(koszt / 100).toFixed(2)}zł</h4>
    <div> 
        <img className={"wielkosc mala " + (baza === 300 ? "zaznaczone": '')} onClick={() => zmienRozmiar(300)}
        src={process.env.PUBLIC_URL + "/assets/miskas.png"} alt={"rozmiar_maly"} />

        <img className={"wielkosc srednia "+ (baza === 500 ? "zaznaczone": '')} onClick={() => zmienRozmiar(500)}
        src={process.env.PUBLIC_URL + "/assets/miskam.png"} alt={"rozmiar_sredni"} />

        <img className={"wielkosc duza "+ (baza === 800 ? "zaznaczone": '')} onClick={() => zmienRozmiar(800)}
        src={process.env.PUBLIC_URL + "/assets/miskal.png"} alt={"rozmiar_duzy"} />
    </div>
    <div>
        <button onClick={() => dodajSalatka()}> Dodaj</button>
    </div>

<div className="dodatki">

    {dodatki.map((dodatek, index) => {
     return (
         <div key={index} className="dodatekRzad">
             <input type="checkbox" checked={dodatek.checked} onChange={() => dodatekZmiana(dodatek)}/>
             <img className="dodatek_ikonka" src={process.env.PUBLIC_URL + "/assets/" + dodatek.nazwa + ".png"} alt={dodatek.nazwa} />
         <p>{dodatek.nazwa} </p>
         {dodatek.koszt === 0 ? <p>darmowe</p> :<p> Cena:{(dodatek.koszt / 100).toFixed(2)}zł</p>}
         
         </div>
     )
 })}
      
    </div>
    </div>
  );
}

export default Skomponuj;
