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
      // campaignid: '',
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

  handleText() {
    this.setState({
      // prefix: this.refs.prefix.value,
      fname: this.refs.fname.value,
      // mname: this.refs.mname.value,
      lname: this.refs.lname.value,
      // suffix: this.refs.suffix.value,
      email: this.refs.email.value,
      // campaignid: match.params.id,
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
    fetch('/api/campaign/1/', {
      body: JSON.stringify(theData),
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

    // if(navigator.userAgent.toLowerCase().includes('android')
    //   || navigator.userAgent.toLowerCase().includes('webos')
    //   || navigator.userAgent.toLowerCase().includes('iphone')
    //   || navigator.userAgent.toLowerCase().includes('ipad')
    //   || navigator.userAgent.toLowerCase().includes('ipod')
    //   || navigator.userAgent.toLowerCase().includes('blackBerry')
    //   || navigator.userAgent.toLowerCase().includes('windows phone'))
    // {
    //   this.setState({
    //     isMobile: true
    //   })
    // } else {
    //   console.log('this is not mobile')
    // }
  }

  detectMobile() {
    if(navigator.userAgent.toLowerCase().includes('android')
      || navigator.userAgent.toLowerCase().includes('webos')
      || navigator.userAgent.toLowerCase().includes('iphone')
      || navigator.userAgent.toLowerCase().includes('ipad')
      || navigator.userAgent.toLowerCase().includes('ipod')
      || navigator.userAgent.toLowerCase().includes('blackBerry')
      || navigator.userAgent.toLowerCase().includes('windows phone'))
    {
      this.setState({
        isMobile: true
      })
    } else {
      console.log('this is not mobile')
    }
  }

  handleSend() {
    let theData = {
      secret: process.env.REACT_APP_SECRET,
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      isMobile: this.state.isMobile
    }
    fetch('/api/email/1/', {
      body: JSON.stringify(theData),
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
        if(data.isMobile === true || data.isEnterprise === true) {
          window.location.href = data.sendemail;
        } else {
          window.open(data.sendemail)
        }
      })

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
