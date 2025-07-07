import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewBoardForm.css';

const KDefaultBoardState = {
  title: '',
  owner: '',
  cards: []
};
const NewBoardForm = ({ onCreateBoard }) => {
  const [formData, setFormData] = useState(KDefaultBoardState);
  const [errorData, setErrorData] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();

    const titleError = formData.title.trim() === '' ? 'Board title is required' : '';
    const ownerError = formData.owner.trim() === '' ? 'Owner name is required' : '';

    if (titleError || ownerError) {
        const errors = [];
        if (titleError) errors.push(titleError);
        if (ownerError) errors.push(ownerError);
        setErrorData(errors.join(' & '));
        return;
    }

    setErrorData('');
    onCreateBoard(formData);
    setFormData(KDefaultBoardState);
    };  
    
  const handleChange = (event) => {
    const inputName = event.target.name;
    const inputValue = event.target.value;
    setFormData((formData) => ({
      ...formData,
      [inputName]: inputValue,
    }));
  };
  const makeControlledInput = (inputName) => {
    return <input 
      onChange={handleChange} 
      type='text' 
      id={`input-${inputName}`}
      name={inputName}
      value={formData[inputName]}
      className={errorData ? 'error' : ''}
    />;
  };
  return (
    <form className="new_board_form" onSubmit={handleSubmit}>

      <label htmlFor="input-title">Board Name</label>
      { makeControlledInput('title') }

      <label htmlFor="input-owner">Owner Name</label>
      { makeControlledInput('owner') }
      
      <p>Preview: {formData.title} - {formData.owner}</p>

      { errorData && <div className="error_message">{errorData}</div> }
      <button type="submit" className="create_board_button">Create Board</button>
    </form>
);
};

NewBoardForm.propTypes = {
  onCreateBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;
