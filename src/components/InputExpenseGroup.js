import React from 'react';
import InputField from './inputField';


export default (props) => {
    const {
        expense,
        errMsgDate,
        errMsgDescription,
        errMsgAmount,
        errMsgComment,
        onChangeField,
    } = props;

    return (
        <div>
            <InputField 
                label="Date"
                type="date"
                placeholder="Type the date of expense"
                name="date"
                obj={expense}
                field={expense.date}
                onChangeField={onChangeField}
                errMsg={errMsgDate}
            />
            <InputField
                label="Description"
                type="text"
                placeholder="Type the description"
                name="description"
                obj={expense}
                field={expense.description}
                onChangeField={onChangeField}
                errMsg={errMsgDescription}
            />
            <InputField
                label="Amount"
                type="number"
                placeholder="Type the amount of the expense"
                name="amount"
                obj={expense}
                field={expense.amount}
                onChangeField={onChangeField}
                errMsg={errMsgAmount}
            />
            <InputField
                label="Comment"
                type="text"
                placeholder="Type the comment of the expense"
                name="comment"
                obj={expense}
                field={expense.comment}
                onChangeField={onChangeField}
                errMsg={errMsgComment}
            />
        </div>
    )
}