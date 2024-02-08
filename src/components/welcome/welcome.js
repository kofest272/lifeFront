import React from "react";
import { motion } from "framer-motion";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../forms/createTaskForm";


import "bootstrap/dist/css/bootstrap.min.css";
import './main.scss';
import '../../Adapt.scss';

const Welcome = () => {
    const isAuth = useSelector(selectIsAuth);

    if (isAuth) {
        return <Navigate to="/calendar" />
    }

    return (
        <div style={{ width: '100%', height: '1000px' }}>
            <main>
                <p className="mainText">Change your <p className="bold">lifestyle</p></p>
                <div className="mainBtns">
                    <motion.button className="buttonTransparent" whileHover={{ scale: 1.1 }}>Read More</motion.button>
                    <Link to="/reg"><motion.button className="buttonBlue" whileHover={{ scale: 1.1 }}>Create account</motion.button></Link>
                </div>
            </main >
        </div >
    )
}


export default Welcome;