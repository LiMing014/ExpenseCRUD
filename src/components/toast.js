import React, { Component } from 'react'
import { Toast } from 'react-bootstrap';

export default class Notification extends Component{
    constructor (props) {
        super(props);
        this.state = {
            show: false
        }
    }

    close = () => {        
        this.setState({
            show: false
        })
    }
    render() {
        const { content, showNotify } = this.props;
        console.log('Toast Modal')
        return (
            <Toast onClose={this.close} show={showNotify} delay={3000} autohide>
              <Toast.Header>
                <strong className="mr-auto">Expense.com</strong>                
              </Toast.Header>
              <Toast.Body>{content}</Toast.Body>
            </Toast>
      );
    }    
  }
  