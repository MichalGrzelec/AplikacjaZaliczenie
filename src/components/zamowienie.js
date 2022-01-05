import React, {useState, useEffect} from 'react';
import {withRouter} from 'react-router-dom'
import {CtxConsumer} from '../index';

function Zamowienie(props) {

const [koszt, setKoszt] = useState(0);
const [zamowienie, setZamowienie] = useState([]);

useEffect(()=> {
if(props.nowaSalatka){
  setZamowienie(zam => [...zam, props.nowaSalatka]);
}
}, [props.nowaSalatka]);

useEffect(()=> {

let kosztWszystkich = zamowienie.reduce((suma, salatka) => suma + salatka.koszt, 0);
setKoszt(kosztWszystkich)
}, [zamowienie]);

const usunSalatke = indx => {
let zam = zamowienie.filter((salatka, index) => index !== indx);
setZamowienie(zam);
}

const zaplac = (ctx) => {
  ctx.odswiez(koszt);
  props.history.push('/koszyk');
}

 return (
<CtxConsumer> 
  {context => (

<div style={{"flexGrow": 1}}>
      
<h1>Twoje zamówienie</h1>
{zamowienie.map((salatka, index) => {
  return (
   <div key={index} className="zamowienieRzad"> 
     <h3>
       {index+1}# {salatka.wielkosc} sałatka
       ({salatka.dodatki.length} <IleDodatkow ilosc={salatka.dodatki.length} />)
       &nbsp; | &nbsp;
       {(salatka.koszt / 100).toFixed(2)}zł
       </h3>
       <h3 onClick={()=> usunSalatke(index)}>X</h3>
   </div>
  )
})}
     <p>------------</p>
     <p>Do zapłaty: {(koszt/100).toFixed(2)}zł</p>
     <button onClick={()=> zaplac(context)} disabled={koszt === 0}>Zapłać</button>
   </div>

  )}
    </CtxConsumer>
  );
}

function IleDodatkow({ilosc}) {
  if(ilosc === 1) {
    return "dodatek";
  } else if(ilosc > 1 && ilosc < 5) {
    return "dodatki";
  }
  return "dodatków";
}

export default withRouter(Zamowienie);
