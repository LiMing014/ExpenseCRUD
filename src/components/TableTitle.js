import React from 'react';
import { Button } from 'react-bootstrap';

export default (props) => {
    const {title, handleAdd, btnName} = props;
    return (
        <div>
            <Button variant="success" style={{float: "right"}} onClick={handleAdd}>{btnName}</Button>
            <br />
            <h2>{title}</h2>
        </div>        
    )
}