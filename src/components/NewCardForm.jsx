import { useState } from 'react';
import PropTypes from 'prop-types';
import './NewCardForm.css';

// NewCardForm component to create a new card with a message
// and a button to submit the form, which calls the onSubmit prop with the message
// Preview of the card as shown below the input when typing in the input field


const NewCardForm = ({ onPostCard, boardId }) => {
  const [formData, setFormData] = useState({
    message: '',
    board_id: boardId,
  });

  const [errorData, setErrorData] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.message.trim() === '') {
      setErrorData('Message is required');
      return;
    }
    if (formData.message.length > 40) {
      setErrorData('Message must be at most 40 characters long');
      return;
    }
    onPostCard(formData);

    setFormData({
      message: '',
      board_id: boardId,
    });
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
    <form className="new_card_form" onSubmit={handleSubmit}>
      <label htmlFor="message">Message</label>
      <input
        type="text"
        id="message"
        name="message"
        value={formData.message}
        onChange={handleChange}
        className={`error_input ${errorData ? 'error' : ''}`}
      />
      <div className="error_message">{errorData}</div>
      <div className="message_preview">Preview: <span>{formData.message}</span></div>
      <button type="submit" className='add_card_button'>Submit</button>
    </form>
  )
};

NewCardForm.propTypes = {
  onPostCard: PropTypes.func.isRequired,
};
export default NewCardForm;