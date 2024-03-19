import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import { Link } from 'react-router-dom';

import { FaWeightScale } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineWaterDrop, MdOutlineEdit } from "react-icons/md";
import { FaRunning } from "react-icons/fa";

import './calendar.scss'

const Stats = ({ stats, index }) => {
    const data = stats;
    return (
        <>
            <div className="statsContainer" key={index}>
                <div className="statsFood">
                    <div className="circle">
                        <CircularProgressbarWithChildren value={(data.calories / 3017) * 100} styles={buildStyles({
                            strokeLinecap: 'butt',
                            textSize: '16px',
                            pathTransitionDuration: 0.5,
                            textColor: '#f88',
                            pathColor: '#FFC55A',
                            trailColor: '#444444',
                            backgroundColor: '#3e98c7',
                            size: '25px'
                        })}>
                            <IoFastFoodOutline size={'20px'} />
                        </CircularProgressbarWithChildren>
                    </div>
                    <div className="infoStats">
                        <p>{data.calories}</p>
                        <div className="line"></div>
                        <p className='bold'>3017</p>
                    </div>
                </div>
                <div className="statsWater">
                    <div className="circle">
                        <CircularProgressbarWithChildren value={(data.water / 2) * 100} styles={buildStyles({
                            strokeLinecap: 'butt',
                            textSize: '16px',
                            pathTransitionDuration: 0.5,
                            textColor: '#f88',
                            pathColor: '#2495ff',
                            trailColor: '#444444',
                            backgroundColor: '#3e98c7',
                            size: '25px'
                        })}>
                            <MdOutlineWaterDrop size={'20px'} />
                        </CircularProgressbarWithChildren>
                    </div>
                    <div className="infoStats">
                        <p>{data.water}</p>
                        <div className="line"></div>
                        <p className='bold'>2</p>
                    </div>
                </div>
                <div className="statsWeight">
                    <div className="circle">
                        <CircularProgressbarWithChildren value={0} styles={buildStyles({
                            strokeLinecap: 'butt',
                            textSize: '16px',
                            pathTransitionDuration: 0.5,
                            textColor: '#f88',
                            pathColor: '#008a1e',
                            trailColor: '#444444',
                            backgroundColor: '#3e98c7',
                            size: '25px'
                        })}>
                            <FaWeightScale size={'20px'} />
                        </CircularProgressbarWithChildren>
                    </div>
                    <div className="infoStats">
                        <p className='textStats'>{data.weight}</p>
                    </div>
                </div>
                <div className="statsActivity">
                    <div className="circle">
                        <CircularProgressbarWithChildren value={(data.activity / 2417) * 100} styles={buildStyles({
                            strokeLinecap: 'butt',
                            textSize: '16px',
                            pathTransitionDuration: 0.5,
                            textColor: '#f88',
                            pathColor: '#ff5656',
                            trailColor: '#444444',
                            backgroundColor: '#3e98c7',
                            size: '25px'
                        })}>
                            <FaRunning size={'20px'} />
                        </CircularProgressbarWithChildren>
                    </div>
                    <div className="infoStats">
                        <p>{data.activity}</p>
                        <div className="line"></div>
                        <p className='bold'>2417</p>
                    </div>
                </div>
            </div>
            <div className="editZone">
                <Link to={`/health/${data._id ? `id:${data._id}` : `dt:${data.day}`}`}>
                    <div className="editCircle">
                        <MdOutlineEdit size="20px" />
                    </div>
                </Link>
            </div>
        </>
    )
}

export default Stats;