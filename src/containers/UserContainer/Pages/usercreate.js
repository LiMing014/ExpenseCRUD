import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import { 
    addUser,
    getUser,
    editUser,
    updateField,
    initUser
} from '../Redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialState = {
    firstName: '',
    lastName: '',
    userName: '',
    password: '',
    errMsgFirstName: '',
    errMsgLastName: '',
    errMsgUserName: '',
    errMsgPassword: '', 
    showNotify: false,
    isEdit: false,  //This is create user page in default
}

class UserCreate extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentWillMount() {
        const id = this.props.match.params.id;

        if (id !== undefined) { //this is edit component
            this.setState({
                isEdit: true
            })
            this.props.getUser(id);
        } else{
            this.props.initUser();
        }
    }

    onChangeField = (e) => {
        const { name, value } = e.target;
        this.props.updateField(name, value);
    }

    isValidate = () => {
        const { firstName, lastName, userName, password } = this.props.user;
        let errMsgFirstName = '';
        let errMsgLastName = '';
        let errMsgPassword = '';
        let errMsgUserName = '';

        if (!firstName.length) {
            errMsgFirstName = 'You must type in the First name'
        }
        if (!lastName.length) {
            errMsgLastName = 'You must type in the Last name'
        }
        if (!userName.length) {
            errMsgUserName = 'You must type in the User name'
        }
        if (!password.length) {
            errMsgPassword = 'You must type in the Password'
        }

        if (errMsgFirstName || errMsgLastName || errMsgUserName || errMsgPassword) {
            this.setState({
                errMsgFirstName, errMsgLastName, errMsgUserName, errMsgPassword
            });
            return false;
        }
        return true;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const id = this.props.match.params.id;
        let isValid = this.isValidate();
        if (isValid) {
            if (id !== undefined) { //edit page
                this.props.editUser(id);
                this.props.history.push('/');
            }else{                
                this.setState(initialState);
                this.props.addUser();     
                toast.success('User data created successfully')
                this.props.history.push('/')
            }            
        }else{
            toast.error('You have to insert all information in the field')
        }     
    }

    handleCancel = () => {
        this.props.history.push('/')
    }
    render() {
        const { user } = this.props;
        const { errMsgFirstName, errMsgLastName, errMsgPassword, errMsgUserName, isEdit } = this.state;
        return (
            <div className="container">
                <div style={{width: '60%', margin: 'auto'}}>
                    {!isEdit?<h3>Create New User</h3> : <h3>Edit User</h3>}
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group"> 
                            <label>FirstName: </label>
                            <input  type="text"
                                    className="form-control"
                                    placeholder="Type the first Name"
                                    name="firstName"
                                    value={ user.firstName }
                                    onChange={this.onChangeField}
                            />
                            {
                                errMsgFirstName ? <Alert variant="danger">{errMsgFirstName}</Alert>: ''
                            }
                            
                        </div>
                        <div className="form-group">
                            <label>LastName: </label>
                            <input  type="text" 
                                    className="form-control"
                                    placeholder="Type the Last Name"
                                    name="lastName"
                                    value={ user!== undefined? user.lastName : ''}
                                    onChange={this.onChangeField}
                            />
                            {
                                errMsgLastName ? <Alert variant="danger">{errMsgLastName}</Alert>: ''
                            }
                        </div>
                        <div className="form-group">
                            <label>User Name: </label>
                            <input  type="text" 
                                    className="form-control"
                                    placeholder="Type the User Name"
                                    name="userName"
                                    value={ user!== undefined? user.userName : ''}
                                    onChange={this.onChangeField}
                            />
                            {
                                errMsgUserName ? <Alert variant="danger">{errMsgUserName}</Alert>: ''
                            }
                        </div>
                        <div className="form-group">
                            <label>password: </label>
                            <input  type="password" 
                                    className="form-control"
                                    placeholder="Type the Password"
                                    name="password"
                                    value={user!== undefined? user.password : ''}
                                    onChange={this.onChangeField}
                            />
                            {
                                errMsgPassword ? <Alert variant="danger">{errMsgPassword}</Alert>: ''
                            }
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Save" className="btn btn-primary" />{' '}
                            <input type="button" value="Cancel" className="btn btn-danger" onClick={this.handleCancel}/>
                        </div>
                    </form>
                </div>
                <ToastContainer />
            </div>
            
        )
    }
}

UserCreate.propTypes = {
    user: propTypes.object,
    addUser: propTypes.func,
    editUser: propTypes.func,
    getUser: propTypes.func,
    updateField: propTypes.func,
    initUser: propTypes.func
}

const mapStateToProps = state => {
    return {user: state.userReducer.user}
}

const mapDispatchToProps = {
    addUser,
    editUser,
    getUser,
    updateField,
    initUser,
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(UserCreate);