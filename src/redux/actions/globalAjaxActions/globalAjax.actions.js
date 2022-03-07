import packageVars from "../../../../package.json"; 

import {
    SET_API_START_AND_END_DATES,
    FETCH_API_DATA,
    READD_TRANSFORMED_DATA_ARRAY
} from "./types";

export const setApiStartAndEndDates = dates => ({
    type:SET_API_START_AND_END_DATES,
    payload:dates
});

export const reAddTransformedDataArray = data => ({
    type:READD_TRANSFORMED_DATA_ARRAY,
    payload:data
});

export const fetchApiData = ({dataToFetch, dataUrls, abortController, pageToGetDataFor, cacheResVal}) => dispatch => {
        const proxyurl = packageVars.proxy;
        const getAllRequests = dataUrls.map(
            url => fetch(proxyurl,{headers:{'Target-URL':url}, signal:abortController.signal}).then(res => {
                if(res.ok){
                    return res.json();
                }else{
                    return Promise.reject({
                        status:res.status,
                        error:res.statusText
                    })
                }
            })
        );
        
        return new Promise((resolve,reject) => {
            
            const dataAcquisitionTimeframe = setTimeout(()=>{
                reject({name:"Data took too long to fetch"});
            },60000);

            Promise.all(getAllRequests)
            .then(fetchedData => {
                clearTimeout(dataAcquisitionTimeframe)

                const dispatchVals = {
                    station:fetchedData[0].stations[0],
                    data:fetchedData[1][dataToFetch],
                    currentPage:pageToGetDataFor
                }

                if(cacheResVal && !localStorage.getItem(cacheResVal)){
                    const queriedCacheVal = cacheResVal.child ? dispatchVals[cacheResVal.parent][cacheResVal.child] : dispatchVals[cacheResVal.parent];
                    console.log(queriedCacheVal);
                    localStorage.setItem(cacheResVal.keyName, JSON.stringify(queriedCacheVal));
                }

                dispatch({
                    type:FETCH_API_DATA,
                    payload:dispatchVals
                });
                clearTimeout()
                resolve(fetchedData[1][dataToFetch]);
            })
        })
        
    }

