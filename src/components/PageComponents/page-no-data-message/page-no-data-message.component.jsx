import React from 'react';

import './page-no-data-message.styles.scss';

const PageNoDataMessage = ({dataType, stationId}) => {
    return(
    <div className="w-100 d-flex justify-content-center">
        <div className="jumbotron no-data-jt-dark-tran rounded align-self-center jumbotron-fluid m-3">
            <div className="container">
                <div className="d-flex justify-content-center">
                    <h1 className="text-light"><i className="fas fa-exclamation-triangle"></i></h1>
                </div>
                <div className="d-flex text-center justify-content-center">
                    <h4 className="text-light">Data Could Not Load For {dataType}</h4>
                </div>
                <div className="d-flex text-center justify-content-center">
                    <p> Try going to the NOAA website instead </p>
                </div>
                <div className="d-flex text-center justify-content-center">
                    <a href={`https://tidesandcurrents.noaa.gov/noaatidepredictions.html?id=${stationId}`} className="btn btn-light">NOAA Website</a>
                </div>
            </div>
        </div>
    </div>
)};

export default PageNoDataMessage;