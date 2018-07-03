import React from 'react';

import TokenService from './TokenService';

import './Login.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userplace: 'email',
      passplace: 'password'
    }
    this.handleSend = this.handleSend.bind(this);
  }

  validateUser() {
    if(this.refs.username.value !== '') {
      fetch(`/auth/username`, {
        body: JSON.stringify({
          secret: process.env.REACT_APP_SECRET,
          username: this.refs.username.value
        }),
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'content-type': 'application/json'
        },
        method: 'POST',
        mode: 'cors',
        redirect: 'follow',
        referrer: 'no-referrer',
      })
      .then(response => response.json())
        .then(data => {
          if(data.userExists === false) {
            this.refs.username.value = '';
            this.setState({
              userplace: 'that user doesn\'t exist'
            })
          }
        })
    }
  }

  handleSend() {
    fetch('/auth/login', {
      body: JSON.stringify({
        secret: process.env.REACT_APP_SECRET,
        username: this.refs.username.value,
        password: this.refs.password.value
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => response.json())
      .then(token => {
        TokenService.save(token)
        window.location.replace('/cpanel/admin/panel')
      })
  }

  render() {
    return(
      <section className="logincontainer">
        <div className="loginset">
          <h3>Email</h3>
          <input
            type="text"
            ref="username"
            name="username"
            className="username"
            placeholder={this.state.userplace}
            onBlur={() => {this.validateUser()}}
          />
        </div>
        <div className="loginset">
          <h3>Password</h3>
          <input
            type="password"
            ref="password"
            name="password"
            className="password"
            placeholder={this.state.passplace}
          />
        </div>
        <section className="sendemail">
          <input
            type="submit"
            className="emailbutton"
            value="LOGIN"
            onClick={() => {this.handleSend()}}
          />
        </section>
      </section>
    );
  }
}
