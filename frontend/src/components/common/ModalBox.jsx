import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function ModalBox({ show, setShow, modal }) {
  const handleClose = () => setShow(false);

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>{modal.titleModal}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modal.content}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant={modal.typeBtn} onClick={modal.handleFunction}>
            {modal.titleBtn}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalBox;
