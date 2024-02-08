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
                            <div class="menu-item">
                                <div class="menu-text">
                                    <MdAccountCircle style={{ color: 'white', width: '50px', height: '50px' }} />
                                </div>
                                <div class="sub-menu">
                                    <div class="icon-box gb d">
                                        <div class="icon"><i class="far fa-chess-rook"></i></div>
                                        <div class="text">
                                            <div class="title">Change Profile <MdEdit /></div>
                                        </div>
                                    </div>
                                    <div class="icon-box gb d">
                                        <div class="icon"><i class="far fa-chess-rook"></i></div>
                                        <div class="text">
                                            <div class="title">Settings <MdOutlineSettings /></div>
                                        </div>
                                    </div>
                                    <div class="icon-box gb d">
                                        <div class="icon"><i class="far fa-chess-rook"></i></div>
                                        <div class="text">
                                            <div class="title">Help <MdOutlineHelpOutline /></div>
                                        </div>
                                    </div>
                                    <div class="icon-box gb d">
                                        <div class="icon"><i class="far fa-chess-rook"></i></div>
                                        <div class="text">
                                            <div class="titlered" onClick={() => { onClickLogout() }}>Sign Out <VscSignOut /></div>
                                        </div>
                                    </div>
                                    <div class="sub-menu-holder"></div>
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