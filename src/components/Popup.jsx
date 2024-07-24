import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import question from '../assets/question.png';

export default function Popup(){
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Button to trigger the modal */}
      <Button 
        variant="link" 
        onClick={handleShow} 
        className="pt-2 question-button" 
        style={{ width: '30px', height: '28px' }}
      >
        <img 
          style={{ width: '18px', height: '18px' }} 
          src={question} 
          alt="help" 
        />
      </Button>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>How to Use</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          This is an AI-powered image classifier that can identify menstrual products (pads, tampons, menstrual cups) and pills. Choose which classifier you would like to use by selecting the corresponding button. To use the classifier, show your product to the camera and the model will identify it!
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
