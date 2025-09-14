import React, { useState, useCallback, useEffect } from 'react';
import './App.css';

function App() {
  const [length, setlength] = useState(8);
  const [numbers, setnumbers] = useState(false);
  const [char, setchar] = useState(false);
  const [password, setpassword] = useState('');
  const [copied, setCopied] = useState(false);

  const passwordgenerator = useCallback(() => {
    let pass = '';
    let string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    if (numbers) string += '0123456789';
    if (char) string += '!@#$%^&*()_+';

    for (let i = 1; i <= length; i++) {
      const randomIndex = Math.floor(Math.random() * string.length);
      pass += string.charAt(randomIndex);
    }

    setpassword(pass);
  }, [length, numbers, char]);

  useEffect(() => {
    passwordgenerator();
  }, [length, numbers, char, passwordgenerator]);

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="App">
      <h1>Password Generator</h1>
      <p>Generate a strong password with the options below.</p>

      <input
        type="text"
        value={password}
        placeholder="Generated Password..."
        readOnly
      />

      <button onClick={handleCopy}>
        {copied ? 'Copied!' : 'Copy'}
      </button>

      <div className="change">
        <div className="range-wrapper">
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            onChange={(e) => setlength(Number(e.target.value))}
          />
          <label>Length: {length}</label>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            checked={numbers}
            onChange={() => setnumbers((prev) => !prev)}
            id="numberInput"
          />
          <label htmlFor="numberInput">Include Numbers</label>
        </div>

        <div className="checkbox-group">
          <input
            type="checkbox"
            checked={char}
            onChange={() => setchar((prev) => !prev)}
            id="charInput"
          />
          <label htmlFor="charInput">Include Special Characters</label>
        </div>
      </div>
    </div>
  );
}

export default App;