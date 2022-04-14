import React from "react";
import { Modal, Button } from "react-bootstrap";

export default function ModalComponent({show, title, body, onClose, onAction, closeText, actionText}) {
  console.log(show);
  return (
    <Modal show={show} onHide={onClose}>
        {title ?
        <Modal.Header>
            <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        : null}
        {body ? <Modal.Body>
            {body}
        </Modal.Body>
        : null}
        <Modal.Footer>
            <Button onClick={onClose} variant="secondary">{closeText ? closeText : "Close"}</Button>
            <Button onClick={onAction ? onAction : onClose} variant="primary">{actionText ? actionText : "Save"}</Button>
        </Modal.Footer>
    </Modal>
  )
}