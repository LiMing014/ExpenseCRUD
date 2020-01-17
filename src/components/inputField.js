import React from 'react'
import { Alert } from 'react-bootstrap';

export default (props) => {
    return (
        <div className="form-group">
            <label>{props.label}</label>
            <input 
                type={props.type}
                className="form-control"
                placeholder={props.placeholder}
                name={props.name}
                value={props.obj !== undefined? props.field: ''}
                onChange={props.onChangeField}
            />
            {
                props.errMsg ? <Alert variant="danger">{props.errMsg}</Alert> : ''
            }
        </div>
    )
}