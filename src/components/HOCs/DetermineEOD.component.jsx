
import React from 'react';

import {isEOD} from '../../utils/time-parser-functions';
import {newArrayfromIndexes} from "../../utils/array-functions"

const DetermineEOD = (WrappedComponent, hasList, data) => {
    class DetermineEOD extends React.Component{
        
        componentDidMount(){
            this.determineEOD(data);
        }

        determineEOD = data => {
            const {reAddTransformedDataArray} = this.props;
            if(hasList === "LIST"){
                if(isEOD(data)){
                    reAddTransformedDataArray(this.sortDataByTime(newArrayfromIndexes([2,3,4,5],data)));
                }else{
                    reAddTransformedDataArray(this.sortDataByTime(newArrayfromIndexes([0,1,2,3],data)));
                }
            }
        }

        sortDataByTime = (data) => {
            const sort = [...data];
            const newSortedData = sort.slice().sort((curr,prev) => new Date(curr.t) > new Date(prev.t) ? 1 : -1);
            return newSortedData;
        }

        render(){
            return <WrappedComponent data={data}/>
        }
    }

    return DetermineEOD;
}

export default DetermineEOD;