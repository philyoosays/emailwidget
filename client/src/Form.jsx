import React from 'react';

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
      blocked: false
    }
    this.handleText = this.handleText.bind(this);
  }

  handleText(refs, campaign) {
    this.setState({
      prefix: refs.prefix.value,
      fname: refs.fname.value,
      mname: refs.mname.value,
      lname: refs.lname.value,
      suffix: refs.suffix.value,
      email: refs.email.value,
      campaignid: campaign,
      subject: refs.subject.value,
      emailtext: refs.emailtext.value,
    })
  }

  render() {
    return(
      <div className="formcontainer">
        <section className="personname">
          <input
            className="inputname"
            type="text"
            ref="prefix"
            onInput={({ match }) => {this.props.handleText(this.refs, match.params)}}
          />
        </section>
      </div>
    );
  }
}
