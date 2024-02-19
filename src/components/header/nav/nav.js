import React from "react";
import { Component } from 'react';
import { Link } from "react-router-dom";

// ICONS
import { FaTasks, FaBrain, FaRunning } from "react-icons/fa";
import {
    MdEvent, MdFastfood, MdForum, MdOutlineSupportAgent, MdEditDocument,
    MdOutlineCalendarMonth, MdOutlineHelpOutline, MdHealthAndSafety, MdMoneyOffCsred, MdOutlineAttachMoney
} from "react-icons/md";
import { GiNightSleep } from "react-icons/gi";
import { IoBody, IoShareSocialSharp } from "react-icons/io5";
import { TbApi, TbPigMoney } from "react-icons/tb";

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
                        <div className="sub-menu">
                            <div className="icon-box">
                                <div className="icon"></div>
                                <div className="text">
                                    <div className="title">Tasks <FaTasks /></div>
                                    <div className="sub-text">Plan for the next day.</div>
                                </div>
                            </div>
                            <div className="icon-box">
                                <div className="icon"></div>
                                <div className="text">
                                    <div className="title">Events <MdEvent /></div>
                                    <div className="sub-text">Don't forget the important stuff.</div>
                                </div>
                            </div>
                            <div className="icon-box">
                                <div className="icon"></div>
                                <div className="text">
                                    <div className="title">Habits <FaBrain /></div>
                                    <div className="sub-text">Create and maintain healthy habits.</div>
                                </div>
                            </div>
                            <div className="sub-menu-holder"></div>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-text">
                            <Link to="/health"><p>Health</p></Link>
                        </div>
                        <div className="sub-menu double">
                            <div className="icon-box gb a">
                                <div className="icon"><i className="far fa-question-circle"></i></div>
                                <div className="text">
                                    <div className="title">Sleep <GiNightSleep /></div>
                                    <div className="sub-text">Sleep right.</div>
                                </div>
                            </div>
                            <div className="icon-box gb b">
                                <div className="icon"><i className="far fa-users-class"></i></div>
                                <div className="text">
                                    <div className="title">Activity <FaRunning /></div>
                                    <div className="sub-text">Get some exercise.</div>
                                </div>
                            </div>
                            <div className="icon-box gb c">
                                <div className="icon"><i className="far fa-school"></i></div>
                                <div className="text">
                                    <div className="title">Diet <MdFastfood /></div>
                                    <div className="sub-text">Watch what you eat.</div>
                                </div>
                            </div>
                            <div className="icon-box gb d">
                                <div className="icon"><i className="far fa-chess-rook"></i></div>
                                <div className="text">
                                    <div className="title">Body measurement<IoBody /></div>
                                    <div className="sub-text">Observe the changes in your body</div>
                                </div>
                            </div>
                            <div className="sub-menu-holder"></div>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-text">
                            Finances
                        </div>
                        <div className="sub-menu">
                            <div className="icon-box">
                                <div className="icon"><i className="far fa-satellite"></i></div>
                                <div className="text">
                                    <div className="title">Expenses <MdMoneyOffCsred /></div>
                                    <div className="sub-text">Watch what you spend it on.</div>
                                </div>
                            </div>
                            <div className="icon-box">
                                <div className="icon"><i className="fab fa-twitter-square"></i></div>
                                <div className="text">
                                    <div className="title">Revenues <MdOutlineAttachMoney /></div>
                                    <div className="sub-text">Keep track of your income.</div>
                                </div>
                            </div>
                            <div className="icon-box">
                                <div className="icon"><i className="fab fa-twitch"></i></div>
                                <div className="text">
                                    <div className="title">Invest <TbPigMoney /></div>
                                    <div className="sub-text">Put the money away.</div>
                                </div>
                            </div>
                            <div className="sub-menu-holder"></div>
                        </div>
                    </div>
                    <div className="menu-item">
                        <div className="menu-text">
                            Help
                        </div>
                        <div className="sub-menu triple">
                            <div className="top-container gb c icon-box">
                                <div className="icon big"><i className="far fa-book"></i></div>
                                <div className="text">
                                    <div className="title">Where to start</div>
                                    <div className="sub-text">Find out where to begin below</div>
                                </div>
                            </div>
                            <div className="icon-box flat">
                                <div className="icon"><i className="fal fa-plug"></i></div>
                                <div className="text">
                                    <div className="title">API Guide <TbApi /></div>
                                </div>
                            </div>
                            <div className="icon-box flat">
                                <div className="icon"><i className="fal fa-comments"></i></div>
                                <div className="text">
                                    <div className="title">Support Line <MdOutlineSupportAgent /></div>
                                </div>
                            </div>
                            <div className="icon-box flat">
                                <div className="icon"><i className="fal fa-phone-volume"></i></div>
                                <div className="text">
                                    <div className="title">Live Chat <MdForum /></div>
                                </div>
                            </div>
                            <div className="icon-box flat">
                                <div className="icon"><i className="fal fa-book-spells"></i></div>
                                <div className="text">
                                    <div className="title">Documentation <MdEditDocument /></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="sub-menu-container">
                        <div id="sub-menu-holder">
                            <div id="sub-menu-bottom">
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="mobileNav">
                    <Link to="/calendar"><div className="CalendarContainer"><MdOutlineCalendarMonth size="20px" /><p>Calendar</p></div></Link>
                    <Link to="/health"><div className="HealthContainer"><MdHealthAndSafety size="20px" /><p>Health</p></div></Link>
                    <div className="HelpContainer"><MdOutlineHelpOutline size="20px" /><p>Help</p></div>
                    <div className="SocialContainer"><IoShareSocialSharp size="20px" /><p>Social</p></div>
                </div>
            </div>
        )
    }

}

export default Nav;