import React, { useState } from 'react';
import './App.css';
import Zamowienie from './components/zamowienie';
import Skomponuj from './components/skomponuj';

function App() {

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
     

    </div>
  );
}

export default App;
