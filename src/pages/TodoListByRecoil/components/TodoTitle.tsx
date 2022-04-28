import React from 'react';
import { GiWireCoil } from 'react-icons/gi';

export default function TodoTitle() {
  return (
    <div className="TodoTitle">
      <GiWireCoil className="TodoTitle-Icon" />
      <div className="TodoTitle-Title">TodoList With Recoil</div>
    </div>
  );
}
