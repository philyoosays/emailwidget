import React from 'react';

import './Form.css'

export default class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prefix: '',
      fname: '',
      mname: '',
      lname: '',
      suffix: '',
      email: '',
      campaignid: '',
      subject: '',
      emailtext: '',
      emailhtml: '',
      recipient: 'no email',
      blocked: false,
      isMobile: false
    }
    this.handleText = this.handleText.bind(this);
    this.handleSend = this.handleSend.bind(this);
  }

  handleText({ match }) {
    this.setState({
      // prefix: this.refs.prefix.value,
      fname: this.refs.fname.value,
      // mname: this.refs.mname.value,
      lname: this.refs.lname.value,
      // suffix: this.refs.suffix.value,
      email: this.refs.email.value,
      campaignid: match.params.id,
      subject: this.refs.subject.value,
      emailtext: this.refs.emailtext.value,
      emailhtml: this.refs.emailtext
    })
  }

  componentDidMount() {
    console.log('secret: ', process.env.REACT_APP_SECRET)
    this.detectMobile()
    let theData = {
      secret: process.env.REACT_APP_SECRET
    }
    fetch('http://192.168.1.5:3001/api/campaign/1/', {
      body: JSON.stringify(theData), // must match 'Content-Type' header
      cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
      credentials: 'same-origin', // include, same-origin, *omit
      // headers: {
      //   'content-type': 'application/json'
      // },
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
      .then(response => response.json())
        .then(data => {
          console.log('data', data)
          this.setState({
            subject: data.subject,
            recipient: data.recipient,
            emailtext: data.emailtext,
            emailhtml: data.emailhtml
          })
        })
      .catch(err => {
        console.log('thisiserror', err)
        this.setState({
          recipient: 'error happened'
        })
      })
  }

  handleSend() {
    let domain = this.state.email.split('@')
    if(this.state.isMobile === true) {
      window.open(`mailto:${this.state.recipient}`)
    } else {
      this.setState({
        isMobile: 'Not mobile'
      })
    }
  }

  detectMobile() {
    if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ){
      this.setState({
        isMobile: true
      })
    }
  }

  render() {
    return(
      <div className="formcontainer">
        <section className="personname flexone">
          <section className="personlabel flextwo">
            <h1>First Name</h1>
            <h1>Last Name</h1>
            <h1>Email</h1>
          </section>
          <section className="personlabel flexthree">
            {/*
              <input
              className="inputname flexone"
              type="text"
              ref="prefix"
              placeholder="Prefix"
              onInput={() => {this.handleText()}}
            /> */}
            <input
              className="inputname flexone"
              type="text"
              ref="fname"
              placeholder="First Name"
              onInput={() => {this.handleText()}}
            />
            {/*<input
              className="inputname flexone"
              type="text"
              ref="mname"
              placeholder="Middle Name"
              onInput={() => {this.handleText()}}
            />*/}
            <input
              className="inputname flexone"
              type="text"
              ref="lname"
              placeholder="Last Name"
              onInput={() => {this.handleText()}}
            />
            {/*<input
              className="inputname flexone"
              type="text"
              ref="suffix"
              placeholder="Suffix"
              onInput={() => {this.handleText()}}
            />*/}
            <input
              className="inputname flexone"
              type="email"
              ref="email"
              placeholder="Email"
              onInput={() => {this.handleText()}}
            />
          </section>

        </section>
        <section className="personlabel flexone">
          <div>
            <span>To: </span><span>{this.state.recipient}</span>
          </div>
          <div className="inline">
            <span>Subject:</span>
            <input className="something"
              type="text"
              ref="subject"
              value={this.state.subject}
              onInput={() => {this.handleText()}}
            />
          </div>
          <div>
            <textarea
              className="somethingtwo"
              ref="emailtext"
              value={this.state.emailtext}
              onInput={() => {this.handleText()}}
            />
          </div>
          <div>
            <button onClick={() => {this.handleSend()}}>SUBMIT</button>
            <p>{this.state.isMobile}</p>
            <p>This is {this.state.isMobile}</p>
          </div>
        </section>
      </div>
    );
  }
}
