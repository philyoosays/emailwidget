import React from 'react';

import TokenService from './TokenService';
import CampaignOverview from './CampaignOverview';
import AdminNav from './AdminNav';

import './AdminPanel.css'

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allcampaigns: [],
      todownloadfull: 0,
      todownloadnew: 0,
      encodedCSV: '',
    }

    this.exportFullCSV = this.exportFullCSV.bind(this);
    this.exportNewCSV = this.exportNewCSV.bind(this);

    // This grabs all campaigns associated with the org
    // listed in the token payload
    let token = TokenService.read();

    if(token === null) {
      window.location.replace('/cpanel/admin')
    }

    fetch('/api/organization', {
      body: JSON.stringify({
        token: token,
        secret: process.env.REACT_APP_SECRET
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => response.json())
      .then(data => {
        this.setState({
          allcampaigns: data
        })
      })
  }

  exportFullCSV(campaignid) {
    let token = TokenService.read();
    fetch(`/api/export/campaignfull/${campaignid}`, {
      body: JSON.stringify({
        token: token,
        secret: process.env.REACT_APP_SECRET
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => response.json())
      .then(data => {
        this.setState({
          encodedCSV: encodeURI(data),
          todownloadfull: campaignid
        })
      })
  }

  exportNewCSV(campaignid) {
    let token = TokenService.read();
    fetch(`/api/export/campaignnew/${campaignid}`, {
      body: JSON.stringify({
        token: token,
        secret: process.env.REACT_APP_SECRET
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
    .then(response => response.json())
      .then(data => {
        this.setState({
          encodedCSV: encodeURI(data),
          todownloadnew: campaignid
        })
      })
  }

  render() {
    let campaigns = this.state.allcampaigns.length === 0 ? '' :
      this.state.allcampaigns.map((element, index) => {
        return(
          <CampaignOverview
            element={element}
            index={index}
            csv={this.state.encodedCSV}
            getfullcsv={this.exportFullCSV}
            getnewcsv={this.exportNewCSV}
            todownloadfull={this.state.todownloadfull}
            todownloadnew={this.state.todownloadnew}
          />
        );
      })
    return(
      <section>
        <AdminNav handleLogout={this.props.handleLogout}/>
        <div className="navspacer" />
        {campaigns}
      </section>
    );
  }
}
