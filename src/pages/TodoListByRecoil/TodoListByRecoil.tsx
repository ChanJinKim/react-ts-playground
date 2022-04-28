import React from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoTitle from './components/TodoTitle';
import './scss/todoListByRecoil.scss';

/**
 * todo list by recoil
 * @returns
 */
export default function TodoListByRecoil() {
  return (
    <div className="TodoTemplate">
      <div className="TodoTemplate-Contents">
        <TodoTitle />
        <TodoList />
        <TodoInput />
      </div>
    </div>
  );
}
