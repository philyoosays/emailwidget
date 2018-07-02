import React form 'react';

export default function Input(props) {
  return(
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
  )
}
