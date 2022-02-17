import React from 'react';

/**
 * todo add form
 * @returns
 */
export default function AddForm() {
  return (
    <form>
      <h4>TODO Item</h4>
      <input type="text" name="todo-item" />
      <input type="button" value="submit" />
    </form>
  );
}
