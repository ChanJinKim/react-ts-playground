import React, { Fragment, MouseEvent, useState } from 'react';
import Item from './Item';

/**
 * todo item list
 * @returns
 */
export default function ItemList() {
  const [list, setList] = useState([
    {
      idx: 0,
      text: '1'
    },
    {
      idx: 1,
      text: '2'
    },
    {
      idx: 2,
      text: '3'
    }
  ]);

  const handleDelete = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    console.log('delete item');
    console.log(event.currentTarget.dataset.idx);
    const elementIdx = Number(event.currentTarget.dataset.idx);

    setList(prev => prev.filter(item => item.idx !== elementIdx));
  };

  return (
    <ul>
      {list?.map(({ idx, text }) => (
        <Fragment key={idx}>
          <Item idx={idx} text={text} onDelete={handleDelete} />
        </Fragment>
      ))}
    </ul>
  );
}
