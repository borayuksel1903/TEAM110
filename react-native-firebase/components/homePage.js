import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

export default class App extends React.Component {
 
    render() {
        return (
            <div>
            <h1>Simple SPA</h1>
            <ul className="header">
              <li><a href="/">Home</a></li>
              <li><a href="/stuff">Stuff</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
            <div className="content">
               
            </div>
          </div>
    );
  }
}