import React from 'react';
import InputField from './inputField'


export default (props) => {
    const { 
        user,
        errMsgFirstName,
        errMsgLastName,
        errMsgPassword,
        errMsgUserName,
        onChangeField,
    } = props;
    return (       
            <div>
                <InputField 
                    label="FirstName" 
                    type="text" 
                    placeholder="Type the First Name"
                    name="firstName"
                    obj = {user}
                    field = {user.firstName}
                    onChangeField={onChangeField}
                    errMsg = {errMsgFirstName}
                />
                <InputField 
                    label="LastName" 
                    type="text" 
                    placeholder="Type the Last Name"
                    name="lastName"
                    obj = {user}
                    field = {user.lastName}
                    onChangeField={onChangeField}
                    errMsg = {errMsgLastName}
                />
                <InputField 
                    label="UserName" 
                    type="text" 
                    placeholder="Type the User Name"
                    name="userName"
                    obj = {user}
                    field = {user.userName}
                    onChangeField={onChangeField}
                    errMsg = {errMsgUserName}
                />                        
                <InputField 
                    label="Password" 
                    type="password" 
                    placeholder="Type the Password"
                    name="password"
                    obj = {user}
                    field = {user.password}
                    onChangeField={onChangeField}
                    errMsg = {errMsgPassword}
                />
            </div>                          
    )
}