import React, { useEffect } from 'react';
import {  Routes, Route, BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client';
import './index.css';
import Login from './pages/login';
import Index from './pages/index';
import reportWebVitals from './reportWebVitals';
import { useNavigate } from "react-router-dom";
import { getLocalList, setLocalData } from './func';
const root = ReactDOM.createRoot(document.getElementById('root'));

const Main = () => {
  const navigate = useNavigate()
  useEffect(() => {
    let classData = getLocalList('class_data')
    let studenData = getLocalList('student_data')
    if (!classData?.length) {
      classData = [{ name: '一年级1班', key: 1 }, { name: '一年级2班', key: 2 }]
      setLocalData('class_data', classData)
    }
    if (!studenData?.length) {
      studenData = [
        { name: '张一', age: 16, gender: '男', class: '一年级1班' },
        { name: '王二', age: 21, gender: '男', class: '一年级2班' },
        { name: '李三', age: 19, gender: '女', class: '一年级1班' }
      ]
      setLocalData('student_data', studenData)
    }
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
