import { Component } from "react";
import { Link } from "react-router-dom";

import Nav from './nav/nav';
import Profile from './profile/profile';

import logo from '../../img/logo.png';

import './header.scss';

class Header extends Component {
    render() {
        return (
            <div className="headerToCenter">
                <header>
                    <div className="logoDiv">
                        <Link to="/"><img src={logo} alt="" className="mainLogo" /></Link>
                    </div>
                    <Nav />
                    <Profile />
                </header>
            </div>

        )
    }
}

export default Header;