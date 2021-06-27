import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [keywords, setKeywords] = useState('');
  //this is where you results will be stored after they're received from the API
  const [results, setResults] = useState([]);

  const getResults = async (keywords) => {
    //you need a debounce function here. Check docs here: https://usehooks.com/useDebounce/

    //replace the URL with your own API. It should be CORS enabled
    fetch(`https://get.geojs.io/v1/ip/country.json?ip=${keywords}`)
      .then(function(data) {
        return data.json();
      })
      .then(function(response) {
        setResults(response);
      })
  }

  useEffect(() => {
    getResults(keywords)
  }, [keywords]);

  //Check App.css for styles  
  return (
    <div className="App">
      <input value={keywords} onChange={(evt) => { setKeywords(evt.target.value); }} />
      <button onClick={() => {
        setKeywords('');
        setResults([]);
      }}>clear</button>
      {results?.length > 0 && <div className="popup">
        <ul>
          {results.map((result, i) => (<li key={i}>{result.name}</li>))}
        </ul>
      </div>}
    </div>
  );
}

export default App;
