import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Modal, Form, ListGroup, Container, Row, Col } from 'react-bootstrap';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [taskText, setTaskText] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleAddTask = () => {
    if (taskText.trim() !== '') {
      if (editIndex !== null) {
        // Edit existing task
        const updatedTasks = [...tasks];
        updatedTasks[editIndex] = { text: taskText, description: taskDescription };
        setTasks(updatedTasks);
        setEditIndex(null);
      } else {
        // Add new task
        setTasks([...tasks, { text: taskText, description: taskDescription }]);
      }
      setTaskText('');
      setTaskDescription('');
      handleCloseModal();
    }
  };

  const handleEditTask = (index) => {
    const { text, description } = tasks[index];
    setTaskText(text);
    setTaskDescription(description || '');
    setEditIndex(index);
    handleShowModal();
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => {
    setTaskText('');
    setTaskDescription('');
    setEditIndex(null);
    setShowModal(false);
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col>
          <h1 className="mb-4">Task Manager</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button variant="primary" onClick={handleShowModal}>
            Add Task
          </Button>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editIndex !== null ? 'Edit Task' : 'Add Task'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Task Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter task title"
                value={taskText}
                onChange={(e) => setTaskText(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter task description"
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTask}>
            {editIndex !== null ? 'Edit' : 'Add'}
          </Button>
        </Modal.Footer>
      </Modal>

      <Row className="mt-3">
        <Col>
          <ListGroup>
            {tasks.map((task, index) => (
              <ListGroup.Item key={index} className="d-flex flex-column align-items-start">
                <h5>{task.text}</h5>
                <p>{task.description || 'No description.'}</p>
                <div className="d-flex">
                  <Button variant="warning" className="me-2" onClick={() => handleEditTask(index)}>
                    Edit
                  </Button>
                  <Button variant="danger" onClick={() => handleDeleteTask(index)}>
                    Delete
                  </Button>
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default TaskManager;