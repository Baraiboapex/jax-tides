import React from 'react';

import './page-data-loading-card.styles.scss';

const PageDataLoadingCard = ({dataType}) => (
    <div className="w-100 d-flex justify-content-center">
        <div className="d-flex flex-column mt-5 align-self-start card loading-card-content">
            <div className="card-body">
                <br/>
                <div className="d-flex justify-content-center">
                    <div className="loader-spinner spinner-border text-light" role="status">
                    </div>
                </div>
                <br/>
                <h5 className="text-light text-center">
                    Loading {dataType} Data
                </h5>
                <br/>
            </div>
        </div>
    </div>
);

export default PageDataLoadingCard;