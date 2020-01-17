import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Table, Button } from 'react-bootstrap';
import {
    withRouter
} from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { deleteExpense } from '../Redux/actions';
import Dialog from '../../../components/Dialog';
import TableTitle from '../../../components/TableTitle';
import TableHeader from '../../../components/TableHeader';


class ExpenseList extends Component{
    constructor(props) {    //To history we have to set the constructor 
        super(props);
        this.state = {
            id: 0,
            show: false,         
            expense: null   
        }
    }
    handleAdd = () => { //general function definition doesn't work because it holds overall window object. So we have to set as arrow function
        this.props.history.push('/expense/0/create');   //0 can be UserID
    }

    handleEdit = (id) => {
        this.props.history.push(`/expense/0/edit/${id}`)    //0 can be UserID
    }

    handleDelete = () => {
        const { id } = this.state
        this.props.deleteExpense(id);
        this.props.history.push('/expense/0');
        this.setState({
            show: false
        })
    }

    handleOpenDialog = (id) => {
        this.setState({
            show: true,
            id: id,
            expense: this.props.expenses[id]
        })
    }
     
    handleClose = () => {
        this.setState({
            show: false
        })
    }

    render() {
        const { expenses } = this.props;
        const { id, show, expense } = this.state;
        const fields = ['#', 'Date', 'Description', 'Amount', 'Operation'];
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xl-12">
                        <div style={{width: '100%', margin: 'auto'}}>
                            <TableTitle handleAdd={this.handleAdd} title="Users expense history" btnName="Add Expense" />
                            <Table bordered hover>
                                <TableHeader fields={fields} />
                                <TableBody data={expenses} handleEdit={this.handleEdit} handleOpenDialog={this.handleOpenDialog} />
                            </Table>
                            </div>
                            <Dialog 
                                id={id}
                                show={show} 
                                handleClose={this.handleClose} 
                                handleDelete={() => this.handleDelete} 
                                obj={expense} 
                                title="Delete Expense" 
                                body="Do you want to delete selected expense data?"
                                btnName="Delete"
                            />
                    </div>
                </div>                
            </div>            
        )
    }
}

const TableBody = (props) => {
    const { data, handleEdit, handleOpenDialog } = props;
    return (
        <tbody>
            {
                data.map((expense, index) => (
                    <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{expense.date}</td>
                        <td>{expense.description}</td>
                        <td>{expense.amount}</td>
                        <td>{
                            <div>
                                <Button variant="primary" onClick={() => handleEdit(index)}>Edit</Button> {' '}
                                <Button variant="danger" onClick={() => handleOpenDialog(index)}> Delete </Button>
                            </div>                                                                                
                        }</td>
                    </tr>
                ))
            }  
        </tbody>
    );

}

ExpenseList.propTypes = {
    expenses: PropTypes.array,
    deleteExpense: PropTypes.func,
}

const mapDispatchToProps = {
    deleteExpense
}

const mapStateToProps = state => {
    return {
        expenses: state.expenseReducer.expenses,
    };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ExpenseList));