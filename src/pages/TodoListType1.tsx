import React from 'react';
import AddForm from '../components/todolist-type1/AddForm';
import ItemList from '../components/todolist-type1/ItemList';

/**
 * TODO List type 1
 * @returns
 */
export default function TodoListType1() {
  // const [list, setList] = useState([
  //   {
  //     idx: 0,
  //     text: '1'
  //   },
  //   {
  //     idx: 1,
  //     text: '2'
  //   },
  //   {
  //     idx: 2,
  //     text: '3'
  //   }
  // ]);

  return (
    <>
      <h1>TODO List Type 1</h1>
      <AddForm />
      <ItemList />
    </>
  );
}
