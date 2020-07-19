import React from 'react';

//import PageNoDataMessage from '../../components/PageComponents/page-no-data-message/page-no-data-message.component';
import PageContainer from '../../components/PageComponents/page-container/page-container.component';
import PageBodyList from '../../components/PageComponents/page-body-list/page-body-list.component';
import { PageBodyListItem } from '../../components/PageComponents/page-body-list-item/page-body-list-item.component';
import { PageBodyTopCardJumbotron } from '../../components/PageComponents/page-body-top-jumbotron/page-body-top-jumbotron-card.component';

import WithData from '../../components/HOCs/withData.component';

import './tide-page.styles.scss';

import { NOAATranslateDataValue } from '../../utils/noaa-data-translator';
import { parseNormalTime } from '../../utils/time-parser-functions';

const TidePage = ({station, data, filter, pageName, latestDataTime}) => {
        const listItem = (item, dataFilter) => (
            <PageBodyListItem 
                key={item.t} 
                item={item} 
                dataType="TideData" 
                dataTranslator={dataFilter}
                customClasses={"border-bottom border-light"}
            />
        );
        
        const pageBody1 = (
            <React.Fragment>
                <PageBodyTopCardJumbotron
                    customClasses="text-white mb-4" 
                    title={(station ? station.name : "")}
                    label="Next Tide At:"
                    mainData={(latestDataTime ? parseNormalTime(latestDataTime.t, "clock_only")  : "")}
                    secondaryDataLabel="Tide Height"
                    secondaryData={(latestDataTime ? NOAATranslateDataValue("type", latestDataTime.type, "TideData") : "")}
                />
                <PageBodyList 
                    data={data} 
                    listItem={listItem} 
                    dataType="TideData"
                    filterItems={filter}
                />
                <br/>
            </React.Fragment>
        );

        return (
            <div className="page-top d-flex container-fluid p-0">
                <PageContainer pageBody={pageBody1}/>
            </div>
        );
}

//Create a curried function later!
//ApplyHOCs(WithData(TidePage,"TIDE_PAGE"))(SortDataByTime)(DetermineDataEOD)

export default WithData(TidePage,"Tides","LIST");