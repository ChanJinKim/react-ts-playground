import React from 'react';
import { Link } from 'react-router-dom';
import TestComponent from '../shared-component/src/components/test';

export default function Main() {
  return (
    <>
      <h1>List</h1>
      <ul>
        <li>
          <Link to="/todo-list-recoil">TODO List by recoil</Link>
        </li>
        <li>
          <Link to="/todo-list-1">TODO List type 1</Link>
        </li>
        <li>
          <Link to="/ts-weather">TS Weather</Link>
        </li>
      </ul>
      <TestComponent />
    </>
  );
}
