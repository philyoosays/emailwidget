import React from 'react';

import TokenService from './TokenService';

import './AdminPanel.css'

export default class AdminPanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allcampaigns: []
    }

    this.exportCSV = this.exportCSV.bind(this);

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
        let encodedURI =
      })
  }

  exportCSV(campaignid) {
    let token = TokenService.read();

  }

  render() {
    let campaigns = this.state.allcampaigns.length === 0 ? '' :
      this.state.allcampaigns.map((element, index) => {
        return(
          <article className="campaign" key={index}>
            <div className="entry">
              <h2>{element.name}</h2>
              <p>Recipient: {element.recipient}</p>
              <p>Created: {element.created.slice(0,10)}</p>
              <p>{element.count} Responses</p>
            </div>
            <div className="entrybuttons">
              <div
                className="entryoption"
                onClick={() => {this.exportCSV(element.id)}}>
                  CSV
              </div>
            </div>
            <hr />
          </article>
        );
      })
    return(
      <section>
        {campaigns}
      </section>
    );
  }
}
