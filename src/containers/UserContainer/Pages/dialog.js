import React, {Component} from 'react';
import { Modal, Button } from "react-bootstrap";
import { PropTypes } from 'prop-types';

class Dialog extends Component {
    render() {
        const {show, handleClose, handleDelete, id, user } = this.props;
        return (
            user?
            (
                <Modal show={show} onHide={handleClose} animation={false}>
                    <Modal.Header closeButton>
                    <Modal.Title>Do you really want to delete this User?</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{user.firstName}'s data will be deleted! Are you sure?</Modal.Body>
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
            : (
                null
            )
        )
    }
}
Dialog.propTypes = {
    show: PropTypes.bool.isRequired,
    handleClose: PropTypes.func,
    handleDelete: PropTypes.func,
    id: PropTypes.number,
    user: PropTypes.object,
}

export default Dialog;