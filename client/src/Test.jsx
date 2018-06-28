import React from 'react';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isMobile: false
    }
  }

  componentDidMount() {
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
  render() {
    let show = JSON.stringify(navigator.userAgent)
    let text = this.state.isMobile ? 'I am mobile' : 'I am not mobile';
    return(
      <div>
        <p>{show}</p>
        <p>{text}</p>
      </div>
    );
  }
}
