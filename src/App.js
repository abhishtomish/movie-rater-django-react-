import React, {useState} from 'react';
import './App.css';
import Login from './components/Login';
import Books from './components/Books';

function App() {

  const [token, setToken] = useState('');

  const userLogin = (tok) => {
    setToken(tok);    
  }

  return (
    <div className="App">
        <Login userLogin={userLogin} />
        <Books token={token} />
    </div>
  );
}

export default App;
