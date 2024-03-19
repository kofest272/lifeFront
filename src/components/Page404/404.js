import { Link } from "react-router-dom";

import './404.css'

const Page404 = () => {
    return (
        <div className="toCenter">
            <ul>
                <div data-js="astro" className="astronaut">
                    <div className="head"></div>
                    <div className="arm arm-left"></div>
                    <div className="arm arm-right"></div>
                    <div className="body">
                        <div className="panel"></div>
                    </div>
                    <div className="leg leg-left"></div>
                    <div className="leg leg-right"></div>
                    <div className="schoolbag"></div>
                </div>
                <h1 style={{ fontFamily: 'Montserrat', marginTop: '450px' }}>Something went wrong</h1>
                <Link to="/"><h1 style={{ fontFamily: 'Montserrat' }}>Back to main page</h1></Link>
            </ul>
        </div>
    )
}

export default Page404;