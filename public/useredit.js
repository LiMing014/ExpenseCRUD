import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    editUser, 
    getUser,
    updateField
} from '../Redux/actions';
import { Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
class UserEdit extends Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        const id = this.props.match.params.id;
        this.props.getUser(id);
    }
    
    onChangeField = (e) => {
        const { name, value } = e.target;
        this.props.updateField(name, value);
    }

    handleCancel = () => {
        this.props.history.push('/');
    }

    handleSave = () => {
        const id = this.props.match.params.id;
        this.props.editUser(id);
        this.props.history.push('/');
    }
    render() {
        const user = this.props.user;
        return (
            <div className="container">
                <div style={{width: '60%', margin: 'auto'}}>
                    <h3>Edit User</h3>
                    <form>
                        <div className="form-group"> 
                            <label>FirstName: </label>
                            <input  type="text"
                                    className="form-control"
                                    name="firstName"
                                    value={user.firstName}
                                    onChange={this.onChangeField}
                            />
                        </div>
                        <div className="form-group">
                            <label>LastName: </label>
                            <input  type="text" 
                                    className="form-control"
                                    name="lastName"
                                    value={user.lastName}
                                    onChange={this.onChangeField}
                            />
                        </div>
                        <div className="form-group">
                            <label>User Name: </label>
                            <input  type="text" 
                                    className="form-control"
                                    name="userName"
                                    value={user.userName}
                                    onChange={this.onChangeField}
                            />
                        </div>
                        <div className="form-group">
                            <label>password: </label>
                            <input  type="password" 
                                    className="form-control"
                                    name="password"
                                    value={user.password}
                                    onChange={this.onChangeField}
                            />
                        </div>
                        <div className="form-group">
                            <Button variant="primary" onClick={this.handleSave}>Save</Button>
                            <Button variant="danger" onClick={this.handleCancel}>Cancel</Button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {user: state.userReducer.user}
}

const mapDispatchToProps = {
    editUser,
    getUser,
    updateField,
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserEdit));