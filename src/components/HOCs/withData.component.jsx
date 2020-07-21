import React from 'react';

import PageDataLoadingCard from "../PageComponents/page-data-loading-card/page-data-loading-card.component";
import PageNoDataMessage from "../PageComponents/page-no-data-message/page-no-data-message.component";

import { NOAAFilteredDataTranslator } from '../../utils/noaa-data-translator';
import { latestTime, isEOD} from '../../utils/time-parser-functions';
import {setApiStartAndEndDates, fetchApiData, reAddTransformedDataArray} from "../../redux/actions/globalAjaxActions/globalAjax.actions";
import {connect} from "react-redux";
import {newArrayfromIndexes} from "../../utils/array-functions"

//NOTE: Break the sorting portion and the EOD portion of this HOC up into a separate HOC Later!
const WithData = (WrappedComponent, pageName, hasList) => {
    class WithData extends React.Component {
        state={
            loadingStatus:0,
        }

        abortFetch = new AbortController();
        refreshInterval = null;
        _isMounted = false;

        componentDidMount(){
            this._isMounted = true;
            this.getData();
            this.refreshInterval = window.setInterval(()=>this.getData(),10000);
        }
        
        getData = () => {
            const {fetchApiData, dataToFetch, dataUrls} = this.props;
            const ApiDetails = {
                dataUrls,
                dataToFetch,
                abortController:this.abortFetch,
                pageToGetDataFor:pageName
            };
            if(this._isMounted){
                fetchApiData(ApiDetails).then(data => {
                    this.stateLatestDataTime(data,dataUrls);
                    this.determineEOD(data);
                    if(this._isMounted){
                        this.setState({loadingStatus:2});
                    }
                }).catch(err => {
                    console.log(err.name);
                    if(this._isMounted){
                        this.setState({loadingStatus:1});
                    }
                    if(err.name !== "AbortError"){
                        console.log(err);
                    }
                });
            }
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
            this._isMounted = false;
            clearInterval(this.refreshInterval);
        }

        render(){
            const {latestDataTime, loadingStatus} = this.state;
            const {tideStationData} = this.props;

            switch(loadingStatus){
                case 0:
                    return <PageDataLoadingCard dataType={tideStationData.currentPage}/>;
                case 1:
                    return <PageNoDataMessage dataType={tideStationData.currentPage}  stationId={tideStationData.station.id}/>;
                case 2:
                    return (
                        <WrappedComponent
                            data={tideStationData.data}
                            station={tideStationData.station}
                            filter={this.pageDataFilter}
                            latestDataTime={latestDataTime}
                            pageName={tideStationData.currentPage}
                        />
                    );
                default:
                    return null;
            }
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
