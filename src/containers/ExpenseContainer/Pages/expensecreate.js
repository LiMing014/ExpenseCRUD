import React, { Component } from 'react';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { 
    addExpense,
    getExpense,
    editExpense,
    updateField,
    initExpense,
} from '../Redux/actions';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const initialState = {
    errMsgUserName: '',
    errMsgDate: '',
    errMsgDescription: '',
    errMsgAmount: '', 
    errMsgComment: '',
    showNotify: false,
    options: [],
    isEdit: false,
}

class ExpenseCreate extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentWillMount() {
        const userId = this.props.match.params.userId
        const expId = this.props.match.params.expId

        if (expId !== undefined) {
            this.setState({
                isEdit: true
            })
            this.props.getExpense(userId, expId)
        }else{
            this.props.initExpense()
        }
    }

    onChangeField = (e) => {
        const { name, value } = e.target;
        this.props.updateField(name, value);
    }

    isValidate = () => {
        const { date, description, amount, comment } = this.props.expense;
        
        let errMsgDate = '';
        let errMsgDescription = '';
        let errMsgAmount = '';
        let errMsgComment = '';

        if (!date.length) {
            errMsgDate = 'You must type in the Date'
        }
        if (!description.length) {
            errMsgDescription = 'You must type in the Description'
        }
        if (!amount.length) {
            errMsgAmount = 'You must type in the Amount of expense'
        }
        if (!comment.length) {
            errMsgComment = 'You must type in the Comment'
        }

        if (errMsgDate || errMsgDescription || errMsgAmount || errMsgComment) {
            this.setState({
                errMsgDate, errMsgDescription, errMsgAmount, errMsgComment
            });
            return false;
        }
        return true;
    }

    onSubmit = (e) => {
        e.preventDefault();
        const expId = this.props.match.params.expId;
        let isValid = this.isValidate();
        if (isValid) {

            if (expId !== undefined) {  //edit expense
                this.props.editExpense(expId);
                this.props.history.push('/expense/0');
            } else {
                this.setState(initialState);
                this.props.addExpense();
                toast.success('Expense data created successfully');
                this.props.history.push('/expense/0');
            }
        }else{
            toast.error('You have to insert all information in the field')
        }     
    }

    handleCancel = () => {
        this.props.history.push('/expense/0')
    }

    render() {
        const { errMsgDate, errMsgDescription, errMsgComment, errMsgAmount, isEdit } = this.state;
        const { expense } = this.props;

        return (
            <div className="container">
                <div style={{width: '60%', margin: 'auto'}}>
                    {!isEdit? <h3>Add Expense</h3> : <h3>Edit Expense</h3>}
                    <form onSubmit={this.onSubmit}>
                        <div className="form-group">
                            <label>Date: </label>
                            <input  type="date" 
                                    className="form-control"                                    
                                    name="date"
                                    value={ expense.date !== undefined? expense.date : ''}
                                    onChange={this.onChangeField}
                            />
                            {
                                errMsgDate ? <Alert variant="danger">{errMsgDate}</Alert>: ''
                            }
                        </div>
                        <div className="form-group">
                            <label>Description: </label>
                            <input  type="textarea" 
                                    className="form-control"
                                    placeholder="Type the Description"
                                    name="description"
                                    value={expense.description !== undefined ? expense.description : ''}
                                    onChange={this.onChangeField}
                            />
                            {
                                errMsgDescription ? <Alert variant="danger">{errMsgDescription}</Alert>: ''
                            }
                        </div>
                        <div className="form-group">
                            <label>Amount: </label>
                            <input  type="number" 
                                    className="form-control"
                                    placeholder="Type the Amount of Expense"
                                    name="amount"
                                    value={expense.amount !== undefined ? expense.amount : ''}
                                    onChange={this.onChangeField}
                            />
                            {
                                errMsgAmount ? <Alert variant="danger">{errMsgAmount}</Alert>: ''
                            }
                        </div>
                        <div className="form-group">
                            <label>Comment: </label>
                            <input  type="textarea" 
                                    className="form-control"
                                    placeholder="Type the Comment"
                                    name="comment"
                                    value={ expense.comment !== undefined ? expense.comment : ''}
                                    onChange={this.onChangeField}
                            />
                            {
                                errMsgComment ? <Alert variant="danger">{errMsgComment}</Alert>: ''
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

ExpenseCreate.propTypes = {
    expense: PropTypes.object,
    addExpense: PropTypes.func,
    getExpense: PropTypes.func,
    editExpense: PropTypes.func,
    initExpense: PropTypes.func,
    updateField: PropTypes.func,
}
const mapStateToProps = state => {    
    return {
        expense: state.expenseReducer.expense
    };
}

const mapDispatchToProps = {
    addExpense,
    getExpense,
    editExpense,
    initExpense,
    updateField
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(ExpenseCreate);