import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';

const App = () => {
  const [htmlCode, setHtmlCode] = useState('');
  useEffect(() => {
    axios.get('http://localhost:5000/getcolorhtml')
      .then((response) => {
        setHtmlCode(response.data)
      })
      .catch((e) => e.message )
  },[])
  return (
    <>
        {ReactHtmlParser(htmlCode)}
    </>
  );
};

export default App;