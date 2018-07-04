import React from 'react';

import './CampaignOverview.css';

export default function CampaignOverview(props) {
  let downloadAllButton = props.todownload === props.element.id ?
    <a href={props.csv}
      download={`${props.element.created.slice(0,10)}_campaign${props.element.id}_alldata.csv`}
      className="entryoption selected"
    >Download</a> :
    <div
      className="entryoption noselect"
      onClick={() => {props.getfullcsv(props.element.id)}}>
        Get All Contacts
    </div>
  return(
    <article className="campaign" key={props.index}>
      <div className="entry">
        <h2>{props.element.name}</h2>
        <p>Recipient: {props.element.recipient}</p>
        <p>Created: {props.element.created.slice(0,10)}</p>
        <p>{props.element.count} Responses</p>
      </div>
      <div className="entrybuttons">
        {downloadAllButton}
      </div>
    </article>
  );
}
