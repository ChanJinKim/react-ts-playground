import React from 'react';
import { useRecoilState } from 'recoil';
import { todosState, ITodoTypes } from '../../../recoil/todolist';
import TodoItem from './TodoItem';

export default function TodoList() {
  const [todos, setTodos] = useRecoilState<ITodoTypes[]>(todosState);

  const onComplete = (id: number): void => {
    setTodos(
      todos.map((todo: ITodoTypes) => {
        // 매개변수로 받은 id와 같은 객체만 완료상태 업데이트
        return todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : todo;
      })
    );
  };

  const onDelete = (id: number) => {
    // 매개변수로 받은 id와 동일하지 않는 객체들만 필터링
    setTodos(todos.filter((todo: ITodoTypes) => todo.id !== id));
  };

  return (
    <div className="TodoList">
      {todos.length > 0 ? (
        todos.map((todo: ITodoTypes) => {
          const { id, contents, isCompleted } = todo;

          return (
            <TodoItem
              key={id}
              id={id}
              contents={contents}
              isCompleted={isCompleted}
              onComplete={onComplete}
              onDelete={onDelete}
              todos={todos}
              setTodos={setTodos}
            />
          );
        })
      ) : (
        <div className="TodoList-NoList">
          Todo가 없습니다. 자유롭게 추가해보세요!
        </div>
      )}
    </div>
  );
}
