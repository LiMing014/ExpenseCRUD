import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import { PropTypes } from 'prop-types';
import {
    withRouter
} from 'react-router-dom';
import { deleteUser } from '../Redux/actions';
import Dialog from './dialog';

class UserList extends Component{
    constructor(props) {    //To history we have to set the constructor 
        super(props);
        this.state = {
            id: 0,
            show: false,         
            user: null   
        }
    }
    handleAdd = () => { //general function definition doesn't work because it holds overall window object. So we have to set as arrow function
        this.props.history.push('/createUser');
    }

    handleEdit = (id) => {
        this.props.history.push(`/editUser/${id}`)
    }

    handleDelete = () => {
        const { id } = this.state;
        this.props.deleteUser(id);
        this.props.history.push('/')
        this.setState({
            show: false
        })
    }

    handleOpenDialog = (id) => {
        this.setState({
            show: true,
            id: id,
            user: this.props.users[id]
        })
    } 

    handleClose = () => {
        this.setState({
            show: false
        })
    }

    render() {
        const { users } = this.props;
        const { id, show, user } = this.state;
        return (
            <div className="container">
                <div className="col-md-12">
                <Button variant="success" style={{float: "right"}} onClick={this.handleAdd}>Add User</Button>
                <br />
                <h2>Users in Expense.com</h2>
                <Table bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                            <th>Operation</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{user.firstName}</td>
                                    <td>{user.lastName}</td>
                                    <td>{user.userName}</td>
                                    <td>{
                                        <div>
                                            <Button variant="primary" onClick={() => this.handleEdit(index)}>Edit</Button> {' '}
                                            <Button variant="danger" onClick={() => this.handleOpenDialog(index)}> Delete </Button>
                                        </div>                                                                                
                                    }</td>
                                </tr>
                            ))
                        }  
                    </tbody>
                </Table>
                </div>
                <Dialog id={id} show={show} handleClose={this.handleClose} handleDelete={() => this.handleDelete} user={user} />
            </div>
        )
    }
}

UserList.propTypes = {
    users: PropTypes.array,
    deleteUser: PropTypes.func
}

const mapDispatchToProps = {
    deleteUser
}

const mapStateToProps = state => {
    return {users: state.userReducer.users};
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserList));