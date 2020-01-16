import React, {Component} from 'react';
import { Modal, Button } from "react-bootstrap";
import { PropTypes } from 'prop-types';
class Dialog extends Component {
    render() {
        const {show, handleClose, handleDelete, id, expense } = this.props;
        return (            
                expense? (
                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                        <Modal.Title>Do you really want to delete this Expense?</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Selected data will be deleted! Are you sure?</Modal.Body>
                        <Modal.Footer>
                        <Button variant="danger" onClick={handleDelete(id)}>
                            Delete
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