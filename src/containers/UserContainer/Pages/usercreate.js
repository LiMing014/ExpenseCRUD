import React, { Component } from 'react';
import { connect } from 'react-redux';
import propTypes from 'prop-types';
import ButtonGroup from '../../../components/SubmitButtonGroup';
import InputGroup from '../../../components/InputGroup';
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
                        <InputGroup 
                            user={user} 
                            errMsgFirstName={errMsgFirstName} 
                            errMsgLastName={errMsgLastName}    
                            errMsgPassword={errMsgPassword}
                            errMsgUserName={errMsgUserName}
                            onChangeField={this.onChangeField}
                        />
                        <ButtonGroup  handleCancel={this.handleCancel}/>
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