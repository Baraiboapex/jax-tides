import React, {Component} from 'react';

import moment from 'moment';

import {getCurrent24HourTime} from '../../../utils/time-parser-functions';

import './page-background.styles.scss';

class PageBackground extends Component{
    constructor(){
        super();

        this.state={
            timeOfDayImage:"",
        };
    }

    componentDidMount(){
        this.setTimeOfDay();
        window.setInterval(()=>{
            this.setTimeOfDay();
        },100000);
    }

    setTimeOfDay = () => {
        const currentTime = getCurrent24HourTime();
        if(
            moment(currentTime,"HH:mm").valueOf() > moment("17:30","HH:mm").valueOf() && 
            moment(currentTime,"HH:mm").valueOf() < moment("19:30","HH:mm").valueOf()
        ){
            this.setState({timeOfDayImage:"evening-image"});
        }else if (moment(currentTime,"HH:mm").valueOf() > moment("19:30","HH:mm").valueOf()){
            this.setState({timeOfDayImage:"night-image"});
        }else{
            this.setState({timeOfDayImage:"day-image"});
        }
    }

    render(){
        const { children } = this.props;
        const { timeOfDayImage } = this.state;

        return(
            <div className={`fixed-top jt-background-image ${timeOfDayImage}`}>
                {children}
            </div>
        );
    }
}

export default PageBackground;