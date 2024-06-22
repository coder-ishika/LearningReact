import React, { useState } from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faEdit, faArrowUp, faArrowDown, faSave, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  const [input, setInput] = useState('');
  const [values, setValues] = useState([]);
  const [checkedItem, setCheckedItem] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editValues, setEditValues] = useState('');

  const inputHandler = (e) => {
    setInput(e.target.value);
  };

  const addInputValue = () => {
    if (input.trim() !== '') {
      setValues([...values, input]);
      setInput('');
      setCheckedItem([...checkedItem, false]);
    }
  };

  const handleCheck = (index) => {
    const updatedArray = [...checkedItem];
    updatedArray[index] = !updatedArray[index];
    setCheckedItem(updatedArray);
  };

  const handleDelete = (index) => {
    const updatedValues = [...values];
    updatedValues.splice(index, 1);
    setValues(updatedValues);
    
    const updatedChecked = [...checkedItem];
    updatedChecked.splice(index, 1);
    setCheckedItem(updatedChecked);
  };

  const handleMoveUp = (index) => {
    if (index > 0) {
      const updatedValues = [...values];
      const updatedCheckedItems = [...checkedItem];
      
      [updatedValues[index - 1], updatedValues[index]] = [updatedValues[index], updatedValues[index - 1]];
      [updatedCheckedItems[index - 1], updatedCheckedItems[index]] = [updatedCheckedItems[index], updatedCheckedItems[index - 1]];
      
      setValues(updatedValues);
      setCheckedItem(updatedCheckedItems);
    }
  };

  const handleMoveDown = (index) => {
    if (index < values.length - 1) {
      const updatedValues = [...values];
      const updatedCheckedItems = [...checkedItem];
      
      [updatedValues[index + 1], updatedValues[index]] = [updatedValues[index], updatedValues[index + 1]];
      [updatedCheckedItems[index + 1], updatedCheckedItems[index]] = [updatedCheckedItems[index], updatedCheckedItems[index + 1]];
      
      setValues(updatedValues);
      setCheckedItem(updatedCheckedItems);
    }
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditValues(values[index]);
  };
  
  const handleEditValue = () => {
    const updatedArray = [...values];
    updatedArray[editIndex] = editValues;
    setValues(updatedArray);
    setEditIndex(null);
    setEditValues('');
  };

  return (
    <div className="container">
      <h1>ToDo Planner</h1>
      <div className="input-container">
        <input type='text' onChange={inputHandler} value={input} />
        <button onClick={addInputValue}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      <div>
        {values.map((value, index) => (
          <div key={index} className="todo-item">
            {editIndex === index ? (
              <div>
                <input type='text' value={editValues} onChange={(e) => setEditValues(e.target.value)} />
                <button onClick={handleEditValue}>
                  <FontAwesomeIcon icon={faSave} />
                </button>
              </div>
            ) : (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input
                  type='checkbox'
                  checked={checkedItem[index]}
                  onChange={() => handleCheck(index)}
                />
                <h3>{value}</h3>
                <button className="icon-btn" onClick={() => handleMoveUp(index)}>
                  <FontAwesomeIcon icon={faArrowUp} />
                </button>
                <button className="icon-btn" onClick={() => handleMoveDown(index)}>
                  <FontAwesomeIcon icon={faArrowDown} />
                </button>
                <button className="icon-btn" onClick={() => handleDelete(index)}>
                  <FontAwesomeIcon icon={faTrash} />
                </button>
                <button className="icon-btn" onClick={() => handleEdit(index)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
