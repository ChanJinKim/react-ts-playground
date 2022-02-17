import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main';
import TodoListType1 from './pages/TodoListType1';
import TSWeather from './pages/TSWeather';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="todo-list-1" element={<TodoListType1 />} />
        <Route path="ts-weather" element={<TSWeather />} />
        <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
