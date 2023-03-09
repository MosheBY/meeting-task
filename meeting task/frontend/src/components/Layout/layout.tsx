import React from "react";
import { NavLink } from "react-router-dom";
import { Routing } from "../Routing/routing";
import "./layout.css";

export const Layout: React.FC = () => {
  return (
    <div className="Layout">
      <div>
        <NavLink to="meetings">Show Meetings</NavLink>
        <span> | </span>
        <NavLink to="add-meeting">Create Meeting</NavLink>
      </div>

      <h1 className="header">SHOW OR CREATE MEETINGS</h1>

      <Routing />
    </div>
  );
};
