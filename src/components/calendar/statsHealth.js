import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';

import { FaWeightScale } from "react-icons/fa6";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineWaterDrop, MdOutlineEdit } from "react-icons/md";
import { FaRunning } from "react-icons/fa";

import './calendar.css'

const Stats = (data) => {
    const date = data.stats;
    const index = data.index;
    return (
        <>
            <div className="statsContainer" key={index}>
                <div className="statsFood">
                    <div className="circle">
                        <CircularProgressbarWithChildren value={10} styles={buildStyles({
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
                        <p>{date.calories}</p>
                        <div className="line"></div>
                        <p className='bold'>3017</p>
                    </div>
                </div>
                <div className="statsWater">
                    <div className="circle">
                        <CircularProgressbarWithChildren value={50} styles={buildStyles({
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
                        <bold>{date.water}</bold>
                    </div>
                </div>
                <div className="statsWeight">
                    <div className="circle">
                        <CircularProgressbarWithChildren value={30} styles={buildStyles({
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
                        <bold>62kg</bold>
                    </div>
                </div>
                <div className="statsActivity">
                    <div className="circle">
                        <CircularProgressbarWithChildren value={80} styles={buildStyles({
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
                        <p>{date.activity}</p>
                        <div className="line"></div>
                        <bold>2417</bold>
                    </div>
                </div>
            </div>
            <div className="editZone">
                <div className="editCircle">
                    <MdOutlineEdit size="20px" />
                </div>
            </div>
        </>
    )
}

export default Stats;