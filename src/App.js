import React, { useState } from 'react';
import './App.css';
import Zamowienie from './components/zamowienie';
import Skomponuj from './components/skomponuj';
import Button from './components/button';


const App = () => {

  const [Zart, setZart] = React.useState("");
  
  const fetchApi = () => {
    fetch("https://sv443.net/jokeapi/v2/joke/Programming?type=single")
    .then((res)=> res.json())
    .then((data) => setZart(data.joke));
  };
  

const [salatka, setSalatka] = useState(null);

const otrzymajSalatke = salatka => {

  setSalatka(salatka);
}



  return (
    <div className="App">
      
      <div className="zawartosc"> 
      <Skomponuj otrzymajSalatke={otrzymajSalatke} />
      <Zamowienie nowaSalatka={salatka}/>
      </div>
      <div>{Zart === "" ? <Button callApi={fetchApi} /> : 
      <p>{Zart}</p>
      }</div>

    </div>
  );

    }
export default App;
