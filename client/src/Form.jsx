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
      emailtextshow: '',
      body: [],
      fnameindex: [],
      lnameindex: [],
      recipient: 'no email',
      blocked: false,
      isMobile: false
    }
    this.handleText = this.handleText.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.updateBody = this.updateBody.bind(this);

    this.detectMobile();

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
          data.emailtext = data.emailtext.split('%0A%0D').join('\n\r')
          // let body = data.emailtext.split(/(\#[A-Z]\w+\#)/gi);
          // let body = data.emailtext.split(/(\$[A-Z]\w+\$)/gi);
          this.setState({
            subject: data.subject,
            recipient: data.recipient,
            emailtext: data.emailtext,
            emailtextshow: data.emailtext,
            body: data.emailtext.split('#'),
          })
          console.log('body', data.emailtext.split('#'))
        })
      .catch(err => {
        console.log('thisiserror', err)
        this.setState({
          recipient: 'error happened'
        })
      })
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
      // subject: this.refs.subject.value,
      emailtext: this.refs.emailtext.value,
    })
    setTimeout(() => {
      this.updateBody();
    }, 200)
  }

  updateBody() {
    let body = this.state.body;
    this.state.fnameindex.forEach(element => {
      body[element] = this.state.fname;
    })
    this.state.lnameindex.forEach(element => {
      body[element] = this.state.lname;
    })
    body = body.join('');
    this.setState({
      emailtextshow: body
    })
  }

  componentDidMount() {
    setTimeout(() => {
      this.mapNames()
    }, 200)
  }

  mapNames() {
    let first = [];
    let last = [];
    this.state.body.forEach((element, index) => {
      if(element === 'FIRST_NAME') {
        first.push(index)
      } else if(element === 'LAST_NAME') {
        last.push(index)
      }
    })
    this.setState({
      fnameindex: first,
      lnameindex: last
    })
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
          // todo....
          // fix backend fetch maybe axios
          // how do I input regex chars to emails
        }
      })
  }

  render() {
    return(
      <div className="formcontainer">
        <div className="content">
          <section className="personname">
            <h3>First Name</h3>
            <input
              type="text"
              name="fname"
              ref="fname"
              className=""
              placeholder="first name"
              onInput={() => {this.handleText()}}
            />
            <h3>Last Name</h3>
            <input
              type="text"
              name="lname"
              ref="lname"
              className=""
              placeholder="last name"
              onInput={() => {this.handleText()}}
            />
          </section>
          <section className="email">
            <div className="personemail">
              <h3>From: </h3>
              <input
                type="email"
                name="email"
                ref="email"
                className=""
                placeholder="your email"
                onInput={() => {this.handleText()}}
              />
            </div>
            <div className="emailheader">
              <p>To: {this.state.recipient}</p>
              <p>Subject: {this.state.subject}</p>
            </div>
            <div className="emailbody">
              <textarea
                className="emailtext"
                ref="emailtext"
                value={this.state.emailtextshow}
                onInput={() => {this.handleText()}}
              />
            </div>
          </section>
          <section className="sendemail">
            <p className="emailbutton">Send Email</p>
          </section>
        </div>
      </div>
    );
  }
}














