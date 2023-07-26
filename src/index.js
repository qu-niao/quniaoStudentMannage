import React ,{useEffect} from 'react';
import { Link, Routes, Route, BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/login';
import Index from './pages/index';
import reportWebVitals from './reportWebVitals';
import { useNavigate } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById('root'));

const Main = () => {
  const navigate = useNavigate()
  useEffect(() => {
    if (!window.location.hash || window.location.hash === '#/') {
      navigate("/login");
    }
  }, [])
  return (
    <div style={{ width: '100%' }}>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/index/*" element={<Index />} />
      </Routes>
    </div>
  );

}
root.render(<BrowserRouter><Main /></BrowserRouter>);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
