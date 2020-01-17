import React from 'react';

export default (props) => {
    return (
        <div>
            <input type="submit" value="Save" className="btn btn-primary" />{' '}
            <input type="button" value="Cancel" className="btn btn-danger" onClick={props.handleCancel}/>
        </div>
    )
}