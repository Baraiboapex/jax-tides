import React from 'react';

//import PageNoDataMessage from '../../components/PageComponents/page-no-data-message/page-no-data-message.component';
import PageContainer from '../../components/PageComponents/page-container/page-container.component';
import PageBodyButtonGroup from '../../components/PageComponents/page-body-btn-group/page-body-btn-group.component';
import { PageBodyTopCardJumbotron } from '../../components/PageComponents/page-body-top-jumbotron/page-body-top-jumbotron-card.component';

import WithData from '../../components/HOCs/withData.component';



import './water-temp-page.styles.scss';

import { NOAATranslateDataValue } from '../../utils/noaa-data-translator';
import { parseNormalTime} from '../../utils/time-parser-functions';

class WaterTempPage extends React.Component{
    state={
        tempUnit:"farenheight"
    };

    updateCelOrFar = (e) => this.setState({tempUnit:e.currentTarget.value})

    showCelOrFar = (tempUnit, val) =>{
        const {data} = this.props;
        return (data.length > 0 ?  
             (tempUnit === "celsius" ? 
                (data.length > 0 ? NOAATranslateDataValue("v", data[0][val],"TempData")  : "")
                :
                (data.length > 0 ? data[0][val]+" °F" : "")
             )
             : 
             ""
        )
    }

    btnGroupArray=()=>[
        {
            label:"°F",
            action:this.updateCelOrFar,
            inVal:"farenheight"
        },
        {
            label:"°C",
            action:this.updateCelOrFar,
            inVal:"celsius"
        }
    ];
    render(){
        const {tempUnit} = this.state;
        const {data, station} = this.props;
        
        const pageBody1 = (
                <PageBodyTopCardJumbotron
                    customClasses="text-white mb-4" 
                    title={(station ? station.name : "")}
                    label="Water Temperature:"
                    buttons={<PageBodyButtonGroup btns={this.btnGroupArray()}/>}
                    mainData={this.showCelOrFar(tempUnit,"v")}
                    secondaryDataLabel="As Of"
                    secondaryData={data.length > 0 ? parseNormalTime(data[0].t,"clock_only") : ""}
                />
        );

        return (
            <div className="page-top d-flex container-fluid p-0">
                <PageContainer pageBody={pageBody1}/>
            </div>
        );
    }
}

export default WithData(WaterTempPage,"Water Temperature");