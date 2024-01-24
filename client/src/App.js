import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import Users from './Users';
import Places from './Places';
import Vacations from './Vacations';

function App() {
  const [users, setUsers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [vacations, setVacations] = useState([]);

  useEffect(() => {
    const fetchUsers = async() => {
      const response = await axios.get('http://localhost:3000/api/users');
      setUsers(response.data);
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchPlaces = async() => {
      const response = await axios.get('http://localhost:3000/api/places');
      setPlaces(response.data);
    };
    fetchPlaces();
  }, []);

  useEffect(() => {
    const fetchVacations = async() => {
      const response = await axios.get('http://localhost:3000/api/vacations');
      setVacations(response.data);
    };
    fetchVacations();
  }, []);

  const createUser  = async (user) => {
    const response = await axios.post('/api/users', user);
    console.log(response)
  };

  return (
    <div>
      <h1> Joe's Trips!!</h1>
      <Users createUser={createUser} users={users}/>
      <Places places={places}/>
      <Vacations vacations={vacations} places={places} users={users}/>
    </div>
  );
}

export default App;
