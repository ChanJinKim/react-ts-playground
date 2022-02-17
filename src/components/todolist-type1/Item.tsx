import React, { MouseEvent } from 'react';

interface ItemProps {
  idx: number;
  text: string;
  onDelete: (event: MouseEvent<HTMLButtonElement>) => void;
}

/**
 * todo item
 * @returns
 */
export default function Item({ idx, text, onDelete }: ItemProps) {
  const handleDelete = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onDelete(event);
  };
  return (
    <li>
      {text}{' '}
      <button data-idx={idx} onClick={handleDelete}>
        delete
      </button>
    </li>
  );
}
