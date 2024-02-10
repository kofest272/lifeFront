import React from "react";
import { Link, Navigate } from "react-router-dom";

import { MdAccountCircle, MdEdit, MdOutlineSettings, MdOutlineHelpOutline } from "react-icons/md";
import { VscSignOut } from "react-icons/vsc";

import "./profile.scss";
import 'bootstrap/dist/css/bootstrap.css';
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../forms/loginForm";
import { logout } from "../../../redux/slices/auth";

const Profile = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(selectIsAuth)

    const onClickLogout = async () => {
        if (window.confirm('Вы действительно хотите выйти с аккаунта?')) {
            await dispatch(logout())
            window.localStorage.removeItem('token')
            return <Navigate to="/" />
        }
    }

    const profileChecker = () => {
        if (isAuth) {
            return (
                <div className="containerProfile">
                    <div className="nav" style={{ width: '100px' }}>
                        <nav id="menu">
                            <div className="menu-item">
                                <div className="menu-text">
                                    <MdAccountCircle style={{ color: 'white', width: '50px', height: '50px' }} />
                                </div>
                                <div className="sub-menu">
                                    <div className="icon-box gb d">
                                        <div className="icon"><i className="far fa-chess-rook"></i></div>
                                        <div className="text">
                                            <div className="title">Change Profile <MdEdit /></div>
                                        </div>
                                    </div>
                                    <div className="icon-box gb d">
                                        <div className="icon"><i className="far fa-chess-rook"></i></div>
                                        <div className="text">
                                            <div className="title">Settings <MdOutlineSettings /></div>
                                        </div>
                                    </div>
                                    <div className="icon-box gb d">
                                        <div className="icon"><i className="far fa-chess-rook"></i></div>
                                        <div className="text">
                                            <div className="title">Help <MdOutlineHelpOutline /></div>
                                        </div>
                                    </div>
                                    <div className="icon-box gb d">
                                        <div className="icon"><i className="far fa-chess-rook"></i></div>
                                        <div className="text">
                                            <div className="titlered" onClick={() => { onClickLogout() }}>Sign Out <VscSignOut /></div>
                                        </div>
                                    </div>
                                    <div className="sub-menu-holder"></div>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>

            )
        } else {
            return (<Link to="/login"><button className="buttonSignup">Sign in</button></Link>)
        }
    }

    return (
        <div className="profile">
            {profileChecker()}
        </div>
    );
}

export default Profile;