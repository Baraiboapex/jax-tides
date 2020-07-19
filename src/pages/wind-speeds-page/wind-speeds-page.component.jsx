import React from 'react';

//import PageNoDataMessage from '../../components/PageComponents/page-no-data-message/page-no-data-message.component';
import PageContainer from '../../components/PageComponents/page-container/page-container.component';
import PageBodyButtonGroup from '../../components/PageComponents/page-body-btn-group/page-body-btn-group.component';
import { PageBodyTopCardJumbotron } from '../../components/PageComponents/page-body-top-jumbotron/page-body-top-jumbotron-card.component';

import WithData from '../../components/HOCs/withData.component';

import './wind-speeds-page.styles.scss';

import { NOAATranslateDataValue } from '../../utils/noaa-data-translator';

class WindPage extends React.Component{
    state = {
        speedType:"mph"
    };

    updateKtsOrMph = (e) => this.setState({speedType:e.currentTarget.value})

    showKtsOrMph = (speedType, val) =>{
        const {data} = this.props;
        return (data.length > 0 ?  
             (speedType === "mph" ? 
                (data.length > 0 ? NOAATranslateDataValue(val, data[0][val],"WindData")  : "")
                :
                (data.length > 0 ? data[0][val]+" kts" : "")
             )
             : 
             ""
        )
    }

    btnGroupArray=()=>[
        {
            label:"mph",
            action:this.updateKtsOrMph,
            inVal:"mph"
        },{
            label:"kts",
            action:this.updateKtsOrMph,
            inVal:"kts"
        }
    ]; 

    render(){
        const {speedType} = this.state;
        const {station} = this.props;
        const pageBody1 = (
                <PageBodyTopCardJumbotron
                    customClasses="text-white mb-4" 
                    title={(station ? station.name : "")}
                    label="Wind Speeds:"
                    buttons={<PageBodyButtonGroup btns={this.btnGroupArray()}/>}
                    mainData={this.showKtsOrMph(speedType,"s")}
                    secondaryDataLabel="Gust Speed"
                    secondaryData={this.showKtsOrMph(speedType,"g")}
                />
        );

        return (
            <div className="page-top d-flex container-fluid p-0">
                <PageContainer pageBody={pageBody1}/>
            </div>
        );
    }
}

export default WithData(WindPage,"Wind Speeds");