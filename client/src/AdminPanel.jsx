import React from 'react';

import TokenService from './TokenService';
import CampaignOverview from './CampaignOverview';

import './AdminPanel.css'

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allcampaigns: [],
      todownload: 0,
      encodedCSV: '',
    }

    this.exportFullCSV = this.exportFullCSV.bind(this);

    // This grabs all campaigns associated with the org
    // listed in the token payload
    let token = TokenService.read();
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
    fetch(`/api/export/campaign/${campaignid}`, {
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
          todownload: campaignid
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
            todownload={this.state.todownload}
          />
        );
      })
    return(
      <section>
        {campaigns}
      </section>
    );
  }
}
