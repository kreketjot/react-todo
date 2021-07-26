import React from 'react';
/** @jsx jsx */
import { css, jsx } from '@emotion/react';

function Todo({ todo, index, toggleCompleteTodo, removeTodo }) {
  return (
    <div 
      // className='todo'
      css={css`
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 6px;
        padding: 3px 10px;
        background: #fff;
        border-radius: 3px;
        box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.15);
        font-size: 12px;
      `}
      style={{textDecoration: todo.isCompleted ? 'line-through' : '' }}
    >
      { todo.text }
      <div>
        <button onClick={() => toggleCompleteTodo(index)}>
          { todo.isCompleted ? 'Undo' : 'Complete' }
        </button>
        <button onClick={() => removeTodo(index)}>
          x
        </button>
      </div>
    </div>
  );
}

function TodoForm({ addTodo }) {
  const [value, setValue] = React.useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        className='input'
        value={ value }
        onChange={ e => setValue(e.target.value) }
        css={css`
          box-sizing: border-box;
          width: 100%;
        `}
      />
    </form>
  );
}

function App() {
  const [todos, setTodos] = React.useState([
    { 
      text: 'Learn about React Context',
      isCompleted: false,
    },
    { 
      text: 'Try to style with emotion', 
      isCompleted: false,
    },
    { 
      text: 'Build really cool todo app',
      isCompleted: false,
    },
  ]);

  const toggleCompleteTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = !todos[index].isCompleted;
    setTodos(newTodos);
  };

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = todos.filter( (item, i) => index !== i );
    setTodos(newTodos);
  };

  return (
    <div 
      css={css`
        height: 100vh;
        padding: 30px;
        background: #209cee;
      `}
    >
      <div 
        css={css`
          max-width: 400px;
          padding: 5px;
          border-radius: 4px;
          background: #e8e8e8;
        `}
      >
        { todos.map((todo, index) => (
          <Todo
            key={ index }
            index={ index }
            todo={ todo }
            toggleCompleteTodo={ toggleCompleteTodo }
            removeTodo={ removeTodo }
          />
        )) }
        <TodoForm addTodo={ addTodo } />
      </div>
    </div>
  );
}


export default App;
