import React from 'react';

import { NOAAFilteredDataTranslator } from '../../utils/noaa-data-translator';
import { latestTime, isEOD, getFullDateForAPI, getNextDayDateForAPI } from '../../utils/time-parser-functions';
import {setApiStartAndEndDates, fetchApiData, reAddTransformedDataArray} from "../../redux/actions/globalAjaxActions/globalAjax.actions";
import {connect} from "react-redux";
import {newArrayfromIndexes} from "../../utils/array-functions"

//NOTE: Break the sorting portion of this HOC up into a separate HOC Later!
const WithData = (WrappedComponent, pageName, hasList) => {
    class WithData extends React.Component {
        state={
            loadingStatus:0,
        }

        abortFetch = new AbortController();

        componentDidMount(){
            this.getData();
            window.setInterval(()=>this.getData(),100000);
        }
        
        getData = () => {
            const {fetchApiData, dataToFetch, dataUrls, reAddTransformedDataArray} = this.props;
            const ApiDetails = {
                dataUrls,
                dataToFetch,
                abortController:this.abortFetch,
                pageToGetDataFor:pageName
            }

            fetchApiData(ApiDetails).then(data => {
                console.log("bla");
                this.stateLatestDataTime(data,dataUrls);
                reAddTransformedDataArray(this.sortDataByTime(data));
                this.determineEOD(data);
                if(this.state.isEOD){
                    reAddTransformedDataArray(this.sortDataByTime(newArrayfromIndexes([2,3,4,5],data)));
                }
            }).catch(err => {
                if(err.name !== "AbortError"){
                    console.log(err);
                }
            });

        }

        determineEOD = data => {
            const {setApiStartAndEndDates} = this.props;
            if(hasList === "LIST"){
                if(isEOD(data)){
                    this.setState({isEOD:true});
                    setApiStartAndEndDates({
                        startDate:getFullDateForAPI(),
                        endDate:getNextDayDateForAPI()
                    });
                    this.getData();
                }
            }
        } 

        pageDataFilter = () => {
            const{dataFilterValues, dataFilterType}=this.props;
            if(dataFilterValues && dataFilterType){
                return NOAAFilteredDataTranslator(dataFilterValues,dataFilterType);
            }
            return;
        }

        stateLatestDataTime = (data) => {
            if(data.length > 1){
                this.setState({latestDataTime: latestTime(data)});
            }
            return null;
        }

        sortDataByTime = (data) => {
            const sort = [...data];
            const newSortedData = sort.slice().sort((curr,prev) => new Date(curr.t) > new Date(prev.t) ? 1 : -1);
            return newSortedData;
        }

        componentWillUnmount(){
            this.abortFetch.abort();
        }

        render(){
            const {latestDataTime} = this.state;
            const {tideStationData} = this.props;
            console.log(tideStationData.data);
            return (
                <WrappedComponent
                    data={tideStationData.data}
                    station={tideStationData.station}
                    filter={this.pageDataFilter}
                    latestDataTime={latestDataTime}
                    pageName={tideStationData.currentPage}
                />
            );
        }
    }

    const mapStateToProps = state =>({
        tideStationData:state.tideStationData,
        dates:state.dates
    });

    const mapDispatchToProps = dispatch => ({
        setApiStartAndEndDates: (dates) => dispatch(setApiStartAndEndDates(dates)),
        reAddTransformedDataArray: (data) => dispatch(reAddTransformedDataArray(data)),
        fetchApiData: (urls) => dispatch(fetchApiData(urls))
    });

    return connect(mapStateToProps,mapDispatchToProps)(WithData);
}

export default WithData;
