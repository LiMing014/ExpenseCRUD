import React from 'react';


export default (props) => {    
    const { fields } = props    
    return (
        <thead>
            <tr>                
                {
                    fields.map((field, index) => (
                        <th key={index}>{field}</th>
                    ))
                }
            </tr>
        </thead>            
    )
}