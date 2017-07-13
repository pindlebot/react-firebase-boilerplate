import React, { Component } from 'react'
import { auth, login, resetPassword } from '../../../config/auth'
//import Btn from '../../Components/Btn';

function setRegisterErrorMsg(error) {
  return {
    registerError: error.message
  }
}

function setLoginErrorMsg(error) {
  return {
    loginMessage: error
  }
}

export default class Login extends Component {
  state = { 
    registerError: null,
    loginMessage: null
  }

  handleRegisterSubmit = (e) => {
    e.preventDefault()
    auth(this.email.value, this.pw.value)
      .then(() => {
        //Router.browserHistory.push('/dashboard') 
      })
      .catch(e => this.setState(setRegisterErrorMsg(e)))
  }

  handleLoginSubmit = (e) => {
    e.preventDefault()
    login(this.email.value, this.pw.value)
      .then(() => {
        //Router.browserHistory.push('/dashboard') 
      }).catch((error) => {
          this.setState(setLoginErrorMsg('Invalid username/password.'))
      })
  }
  resetPassword = () => {
    resetPassword(this.email.value)
      .then(() => this.setState(setLoginErrorMsg(`Password reset email sent to ${this.email.value}.`)))
      .catch((error) => this.setState(setLoginErrorMsg(`Email address not found.`)))
  }

  render () {
    return (
      <div className="home-wrapper">
        <h1 className="center-text">Login/Register</h1>
        
        <form className="flex-col">
          <div className="flex-row gutter-1">
            <input className="form-control" ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className="flex-row gutter-1">
            <input type="password" className="form-control" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          {
            this.state.registerError &&
            <div className="flex-row gutter-1 alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.registerError}
            </div>
          }

          {
            this.state.loginMessage &&
            <div className="flex-row gutter-1 alert alert-danger" role="alert">
              <span className="glyphicon glyphicon-exclamation-sign" aria-hidden="true"></span>
              <span className="sr-only">Error:</span>
              &nbsp;{this.state.loginMessage} <a href="#" onClick={this.resetPassword} className="alert-link">Forgot Password?</a>
            </div>
          }
          <div className="flex-row gutter-1">
            <Btn onClick={this.handleRegisterSubmit} type="submit" className="arsenic-btn">Register</Btn>
            <Btn onClick={this.handleLoginSubmit} type="submit" className="arsenic-btn">Login</Btn>
          </div>

        </form>
      </div>
    )
  }
}