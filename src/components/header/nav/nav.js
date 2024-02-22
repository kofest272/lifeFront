import React from "react";
import { Component } from 'react';
import { Link } from "react-router-dom";

// ICONS
import {
    MdOutlineCalendarMonth, MdHealthAndSafety
} from "react-icons/md";
import { CgProfile } from "react-icons/cg";

import "./nav.scss";
import 'bootstrap/dist/css/bootstrap.css';

class Nav extends Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }
    render() {
        return (
            <div className="nav">
                <nav id="menu">
                    <div className="menu-item">
                        <div className="menu-text">
                            <Link to="/calendar"><p>Calendar</p></Link>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-text">
                            <Link to="/health"><p>Health</p></Link>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-text">
                            Finances
                        </div>
                    </div>
                </nav>
                <div className="mobileNav">
                    <Link to="/calendar"><div className="CalendarContainer"><MdOutlineCalendarMonth size="30px" /><p>Calendar</p></div></Link>
                    <Link to="/health"><div className="HealthContainer"><CgProfile size="30px" /><p>Profile</p></div></Link>
                </div>
            </div>
        )
    }

}

export default Nav;