import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';

import Header from './components/header/header';
import Welcome from './components/welcome/welcome';
import Calendar from './components/calendar/calendar';

import LoginForm from "./components/forms/loginForm";
import RegistrationForm from './components/forms/registrationForm';
import { fetchAuthMe } from './redux/slices/auth';
import Health from './components/health/health';
import Page404 from './components/Page404/404';

function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe())
  }, [])

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/reg" element={<RegistrationForm />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/health/:date" element={<Health />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;