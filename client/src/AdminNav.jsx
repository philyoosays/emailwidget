import React from 'react';

import './AdminNav.css';

export default function AdminNav(props) {
  return(
    <section className="adminnavbar">
      <button
        className="adminnavbutton"
        onClick={() => {props.handleLogout()}}
      >Logout</button>
      <button
        className="adminnavbutton"

      >Download Query</button>
    </section>
  );
}
