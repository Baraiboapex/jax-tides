import React from 'react';
import {connect} from 'react-redux';
import {ReactComponent as Logo} from '../../assets/jax_tides.svg';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom';

import PageNavBar from '../PageComponents/page-navbar/page-navbar.component';
import TidePage from '../../pages/tide-page/tide-page.component';
import WindPage from '../../pages/wind-speeds-page/wind-speeds-page.component';
import WaterTempPage from '../../pages/water-temp-page/water-temp-page.component';

const URL = "/jax-tides";

const JTRouter = ({dates}) =>{
    const {startDate, endDate} = dates;
    return(
        <Router>
            <br/>
            <PageNavBar 
                brandName="JaxTides"
                logo={<Logo className="jax-tides-logo"/>}
                render={(navExpanded, closeNav) => (
                    <React.Fragment>
                        <div className="link p-1"><Link to ={URL+"/"} onClick={()=>(navExpanded ? closeNav() : null)}><i className="fas fa-water">&nbsp;</i>Tides</Link></div>
                        <div className="link p-1"><Link to ={URL+"/watertemp"} onClick={()=>(navExpanded ? closeNav() : null)}><i className="fas fa-thermometer-three-quarters"></i>&nbsp;Water Temp</Link></div>
                        <div className="link p-1"><Link to ={URL+"/windspeeds"} onClick={()=>(navExpanded ? closeNav() : null)}><i className="fas fa-wind"></i>&nbsp;Wind Speeds</Link></div>
                    </React.Fragment>
                )}
            />
            <br/>
            <Switch>
                <Route exact path="/jax-tides/">
                    <TidePage 
                        dataUrls={[
                            'https://tidesandcurrents.noaa.gov/mdapi/latest/webapi/stations/8720218.json?type=tidepredictions&units=english',
                            `https://tidesandcurrents.noaa.gov/api/datagetter?product=predictions&begin_date=${startDate}&end_date=${endDate}&datum=MLLW&station=8720218&time_zone=lst_ldt&units=english&interval=hilo&format=json&application=NOS.COOPS.TAC.TidePred`
                        ]}
                        dataFilterValues={["t","v","type"]}
                        dataFilterType={"TideData"}
                        dataToFetch={"predictions"}
                    />
                </Route>
                <Route exact path="/jax-tides/watertemp">
                    <WaterTempPage
                        dataUrls={[
                            'https://tidesandcurrents.noaa.gov/mdapi/latest/webapi/stations/8720218.json?type=tidepredictions&units=english',
                            `https://tidesandcurrents.noaa.gov/api/datagetter?&station=8720218&date=latest&units=english&datum=MLLW&product=water_temperature&time_zone=LST_LDT&format=json&application=NOS.COOPS.TAC.COOPSMAP&interval=`
                        ]}
                        dataToFetch={"data"}
                    />
                </Route>
                <Route exact path="/jax-tides/windspeeds">
                    <WindPage
                        dataUrls={
                            [
                                'https://tidesandcurrents.noaa.gov/mdapi/latest/webapi/stations/8720218.json?type=tidepredictions&units=english',
                                `https://tidesandcurrents.noaa.gov/api/datagetter?&station=8720218&date=latest&units=english&datum=MLLW&product=wind&time_zone=LST_LDT&format=json&interval=`
                            ]
                        }
                        dataToFetch={"data"}
                    />
                </Route>
            </Switch>
        </Router>
    );
}

const mapStateToProps = state => {
    return{
        dates:state.dates
    };
};

export default connect(mapStateToProps)(JTRouter);