import React from 'react';
import logo from './logo.svg';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import UserList from './containers/UserContainer/Pages/userlist';
// import UserEdit from './containers/UserContainer/Pages/useredit';
import UserCreate from './containers/UserContainer/Pages/usercreate';
import ExpenseList from './containers/ExpenseContainer/Pages/expenselist';
import ExpenseCreate from './containers/ExpenseContainer/Pages/expensecreate';
import history from './history';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (

    <div className="App">
      <Router history={history}>
        <nav className="navbar navbar-expand-lg navbar-black bg-dark">
          <Link to="/" className="navbar-brand" style={{color: 'white', fontSize: "20px"}}>MernStack</Link>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav mr-auto">
              <li className="navbar-item">
                <Link to="/" className="nav-link" style={{color: 'white'}}>Users</Link>
              </li>
              <li className="navbar-item">
                <Link to="/expense/0" className="nav-link" style={{color: 'white'}}>Expense</Link>
              </li>
            </ul>
          </div>
        </nav>
        <img src={logo} className="App-logo" width="200px" height="200px" alt="logo" />
        
        
        <Route exact path="/" component={UserList} />
        <Route path="/editUser/:id" component={UserCreate} />
        <Route path="/createUser" component={UserCreate} />
        <Route exact path="/expense/:userId" component={ExpenseList} />
        <Route exact path="/expense/:userId/create" component={ExpenseCreate} />
        <Route exact path="/expense/:userId/edit/:expId" component={ExpenseCreate} />
      </Router>
    </div>
  );
}

export default App;
