import { Link } from "react-router-dom";

import './404.css'

const Page404 = () => {
    return (
        <div className="toCenter">
            <ul>
                <div data-js="astro" class="astronaut">
                    <div class="head"></div>
                    <div class="arm arm-left"></div>
                    <div class="arm arm-right"></div>
                    <div class="body">
                        <div class="panel"></div>
                    </div>
                    <div class="leg leg-left"></div>
                    <div class="leg leg-right"></div>
                    <div class="schoolbag"></div>
                </div>
                <h1 style={{ fontFamily: 'Montserrat', marginTop: '450px' }}>Something went wrong</h1>
                <Link to="/"><h1 style={{ fontFamily: 'Montserrat' }}>Back to main page</h1></Link>
            </ul>
        </div>
    )
}

export default Page404;