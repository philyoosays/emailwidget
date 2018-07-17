import React from 'react';

import './Form.css';

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
      // campaignid: 0,
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

    let theData = {
      secret: process.env.REACT_APP_SECRET
    }

    fetch(`/api/campaign/${this.props.match.params.id}/`, {
      body: JSON.stringify(theData),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
      .then(response => response.json())
        .then(data => {
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
        })
      .catch(err => {
        console.log('thisiserror', err)
        this.setState({
          recipient: 'Campaign does not exist'
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
    this.detectMobile();
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
    let show = document.querySelector('.showurl');
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
      show.innerText = 'is mobile: ' + this.state.isMobile + navigator.userAgent
    } else {
      console.log('this is not mobile')
      show.innerText = 'is not mobile' + this.state.isMobile + navigator.userAgent
    }
  }

  handleSend() {
    console.log('what is this', this.state.isMobile)
    let theData = {
      secret: process.env.REACT_APP_SECRET,
      fname: this.state.fname,
      lname: this.state.lname,
      email: this.state.email,
      isMobile: this.state.isMobile
    }
    fetch(`/api/email/${this.props.match.params.id}/`, {
      body: JSON.stringify(theData),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => response.json())
      .then(data => {
        let show = document.querySelector('.showurl');

        console.log('daata', data)
        if(data.isMobile === true || data.isEnterprise === true) {
          let aTag = this.refs.destination
          aTag.href = data.sendemail
          aTag.click()
          // show.innerText = 'Link: ' + data.sendemail;
          // window.location.href = data.sendemail;
        } else {
          // show.innerText = 'Mobile: ' + data.isMobile + ', Enterprise: ' + data.isEnterprise + ', Link: ' + data.sendemail;
          let aTag = this.refs.destination
          aTag.href = data.sendemail
          aTag.click()
          // window.location.href = data.sendemail;
        }
      })
  }

  render() {
    return(
      <div className="formcontainer">
        <section className="header">
          <section className="personname">
          <div className="element">
            <h3>First Name</h3>
            <input
              type="text"
              name="fname"
              ref="fname"
              className=""
              placeholder="first name"
              onInput={() => {this.handleText()}}
            />
          </div>
          <div className="element">
            <h3>Last Name</h3>
            <input
              type="text"
              name="lname"
              ref="lname"
              className=""
              placeholder="last name"
              onInput={() => {this.handleText()}}
            />
          </div>
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
          </section>
        </section>
        <div className="content">
            <div className="emailheader">
              <p><span>To:</span> {this.state.recipient}</p>
              <p><span>Subject:</span> {this.state.subject}</p>
            </div>
            <div className="emailbody">
              <textarea
                className="emailtext"
                ref="emailtext"
                value={this.state.emailtextshow}
                onInput={() => {this.handleText()}}
              />
            </div>
          <a href="mailto:philyoomail@gmail.com"><p>Email Me</p></a>
          <section className="sendemail">
            <button
              className="emailbutton"
              onClick={() => {this.handleSend()}}
            >Send Email</button>
            <p className="showurl"></p>
            <a href="" ref="destination" style={{ opacity: 0 }} />
          </section>
        </div>
      </div>
    );
  }
}














