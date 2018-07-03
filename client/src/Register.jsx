import React from 'react';
import TokenService from './TokenService'

import './Register.css';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailplace: 'email',
      passOnePlace: 'password',
    }
    this.handleSend = this.handleSend.bind(this);
  }

  verifyEmail() {
    fetch(`/auth/preauth`, {
      body: JSON.stringify({
        secret: process.env.REACT_APP_SECRET,
        username: this.refs.email.value
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
        if(data.taken === true) {
          this.refs.email.value = '';
          this.setState({
            emailplace: 'Email is already registered.'
          })
        } else if(data.valid === false) {
          this.refs.email.value = '';
          this.setState({
            emailplace: 'Invalid email. Contact admin.'
          })
        }if(data.valid === true) {
          this.refs.org.value = data.org
        }
      })
  }

  passCheck() {
    if(this.refs.pass1.value !== '' && this.refs.pass2.value !== '') {
      if(this.refs.pass1.value !== this.refs.pass2.value) {
        this.refs.pass1.value = '';
        this.refs.pass2.value = '';
        this.setState({
          passOnePlace: 'passwords do not match',
        })
      }
    }
  }

  handleSend() {
    fetch(`/auth/register`, {
      body: JSON.stringify({
        secret: process.env.REACT_APP_SECRET,
        fname: this.refs.fname.value,
        lname: this.refs.lname.value,
        username: this.refs.email.value,
        password: this.refs.pass1.value,
        org: this.refs.org.value
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
      .then(token => {
        TokenService.save(token);
        window.location.replace('/cpanel/admin/panel')
      })
  }

  render() {
    return(
      <section className="regcontainer">
        <div className="regset">
          <h3>First Name</h3>
          <input
            type="text"
            ref="fname"
            name="fname"
            className="regfield"
            placeholder="first name"
            required
          />
        </div>
        <div className="regset">
          <h3>Last Name</h3>
          <input
            type="text"
            ref="lname"
            name="lname"
            className="regfield"
            placeholder="last name"
            required
          />
        </div>
        <div className="regset">
          <h3>Email</h3>
          <input
            type="text"
            ref="email"
            name="email"
            className="regfield"
            placeholder={this.state.emailplace}
            onBlur={() => {this.verifyEmail()}}
            required
          />
        </div>
        <div className="regset">
          <h3>Password</h3>
          <input
            type="password"
            ref="pass1"
            name="password"
            className="regfield"
            placeholder={this.state.passOnePlace}
            onBlur={() => {this.passCheck()}}
            required
          />
        </div>
        <div className="regset">
          <span style={{width: "100px"}} />
          <input
            type="password"
            ref="pass2"
            className="regfield"
            placeholder="type password again"
            onBlur={() => {this.passCheck()}}
            required
          />
        </div>
        <div className="regset">
          <h3 className="orgfield">Organization</h3>
          <input
            type="text"
            ref="org"
            className="regfield"
            placeholder="organization will auto-fill"
            disabled
          />
        </div>
        <section className="sendreg">
          <input
            type="submit"
            className="emailbutton"
            value="REGISTER"
            onClick={() => {this.handleSend()}}
          />
        </section>
      </section>
    );
  }
}
