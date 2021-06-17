import './App.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';

function App() {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      const response = await axios.get('https://reqres.in/api/users');
      console.log(response.status);
      console.log(response.data);
      setUsers(response.data.data);
    };
    loadUsers();
  }, []);

  const onSuggestHandler = (text) => {
    setText(text);
    setSuggestions([]);
  };

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${text}`, 'gi');
        return user.email.match(regex);
      });
    }

    console.log('matches', matches);
    setSuggestions(matches);
    setText(text);
  };

  return (
    <div className="container">
      <h1>Autocomplete search 🔎</h1>
      <input
        type="text"
        onChange={(e) => onChangeHandler(e.target.value)}
        className="col-md-12"
        value={text}
        onBlur={() => {
          setTimeout(() => {
            setSuggestions([]);
          }, 100);
        }}
      />
      {suggestions &&
        suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="suggest justify-content-md-center"
            onClick={() => {
              onSuggestHandler(suggestion.email);
            }}>
            {suggestion.email}
          </div>
        ))}
    </div>
  );
}

export default App;
