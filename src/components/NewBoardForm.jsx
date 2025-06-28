import { useState } from 'react';
import PropTypes from 'prop-types';

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
    
  return (
    <form className="new_board_form" onSubmit={handleSubmit}>
    <label htmlFor="board_name">Board Name</label>
    <input
      type="text"
      id="board_name"
      name="title"
      value={formData.title}
      onChange={handleChange}
      className={`error_input ${errorData ? 'error' : ''}`}
    />
    <label htmlFor="owner_name">Owner Name</label>
    <input
      type="text"
      id="owner_name"
      name="owner"
      value={formData.owner}
      onChange={handleChange}
      className={`error_input ${errorData ? 'error' : ''}`}
    />

      {errorData && <div className="error_message">{errorData}</div>}
      <button type="submit" className="create_board_button">Create Board</button>
    </form>
);
};

NewBoardForm.propTypes = {
  onCreateBoard: PropTypes.func.isRequired,
};

export default NewBoardForm;
