import React from 'react';
import { latestTime } from '../../utils/time-parser-functions';

const GetLatestTimeFromData = (WrappedComponent, data) => {
    class GetLatestTimeFromData extends React.Component{
        state={lastestDataTime:""};

        componentDidMount(){
            this.stateLatestDataTime(data);
        }

        stateLatestDataTime = (data) => {
            if(data.length > 1){
                this.setState({latestDataTime: latestTime(data)});
            }
            return null;
        }
        
        render(){
            const {latestDataTime} = this.state;
            return <WrappedComponent latestDataTime={latestDataTime}/>
        }
    }

    return GetLatestTimeFromData;
}

export default GetLatestTimeFromData;