import React, {Component} from 'react';
import { Modal, Button } from "react-bootstrap";
import { PropTypes } from 'prop-types';
class Dialog extends Component {
    render() {
        const {show, handleClose, handleDelete, id, obj, title, body, btnName } = this.props;
        return (            
                obj? (
                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                        <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{body}</Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger" onClick={handleDelete(id)}>
                            {btnName}
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Cancel
                        </Button>
                        </Modal.Footer>
                    </Modal>
                )
                : (null)            
        )
    }
}


Dialog.propTypes = {
    show: PropTypes.bool,
    handleDelete: PropTypes.func,
    handleClose: PropTypes.func,
    expense: PropTypes.object,
}
export default Dialog;