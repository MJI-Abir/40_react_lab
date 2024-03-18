import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Container, Form } from 'react-bootstrap';

const DynamicTextBoxPage = () => {
  const [textBoxes, setTextBoxes] = useState([]);
  const [sum, setSum] = useState(0);

  const handleAddTextBox = () => {
    const newTextBoxes = [...textBoxes, { id: Date.now(), value: '' }];
    setTextBoxes(newTextBoxes);
  };

  const handleDeleteTextBox = (id) => {
    const updatedTextBoxes = textBoxes.filter((textbox) => textbox.id !== id);
    setTextBoxes(updatedTextBoxes);
    updateSum(updatedTextBoxes);
  };

  const handleTextBoxChange = (id, value) => {
    const updatedTextBoxes = textBoxes.map((textbox) =>
      textbox.id === id ? { ...textbox, value } : textbox
    );
    setTextBoxes(updatedTextBoxes);
    updateSum(updatedTextBoxes);
  };

  const updateSum = (updatedTextBoxes) => {
    const total = updatedTextBoxes.reduce((acc, textbox) => acc + parseFloat(textbox.value) || 0, 0);
    setSum(total);
  };

  return (
    <Container className="mt-4">
      <h1>Dynamic Textboxes</h1>
      <Button variant="success" onClick={handleAddTextBox}>
        Add Textbox
      </Button>

      {textBoxes.map((textbox) => (
        <Form.Group key={textbox.id} className="mt-3 d-flex">
          <Form.Control
            type="number"
            placeholder="Enter a number"
            value={textbox.value}
            onChange={(e) => handleTextBoxChange(textbox.id, e.target.value)}
          />
          <Button
            variant="danger"
            className="ms-2"
            onClick={() => handleDeleteTextBox(textbox.id)}
          >
            Delete
          </Button>
        </Form.Group>
      ))}

      {textBoxes.length > 0 && (
        <div className="mt-3">
          <strong>Total Sum:</strong> {sum}
        </div>
      )}
    </Container>
  );
};

export default DynamicTextBoxPage;
