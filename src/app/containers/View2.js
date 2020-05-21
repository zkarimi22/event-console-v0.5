import React from "react"; 
import { connect } from 'react-redux';
import { viewAction } from "../actions/viewActions";
import { dataSet } from "../actions/dataActions";
import { Layout, Grid, GridColumn, Card, Textbox} from '@q4/nimbus-ui';  

import './../../App.css';
 
class View2 extends React.Component{
 
 render(){ 
 
  var dataSet = (dataKey,dataValue) => {

    this.props.dataSet(dataKey,dataValue);

  }

      return (
      <div className="view2-screen"> 
        <p className="title-text">Great! Let's get started. What's the overall objective for this event?</p>

              <Layout theme="slate" height="comfy" padding="none" >

                    <div className="view2-screen_container">

                     <Grid>
                        <GridColumn width="1-of-6" smallWidth="1-of-6">
                            <div onClick={() => dataSet("objective","convey_corporate_messaging")}> 
                            <Card className={this.props.data.eventlist[this.props.data.selectedEvent].objective === "convey_corporate_messaging" ? "objectives-card selected-card":"objectives-card"} theme="dark">
                            <p >
                            Conveying new corporate message & positioning
                            </p>
                            </Card>
                            </div>
                        </GridColumn>
                        <GridColumn width="1-of-6" smallWidth="1-of-6">
                            <div onClick={() => dataSet("objective","provide_transparency")}>
                            <Card className={this.props.data.eventlist[this.props.data.selectedEvent].objective === "provide_transparency" ? "objectives-card selected-card":"objectives-card"} 
                               theme="dark">
                            <p >
                            Provide transparency to investors
                            </p>
                            </Card>
                            </div>
                        </GridColumn>
                        <GridColumn width="1-of-6" smallWidth="1-of-6">
                            <div onClick={() => dataSet("objective","connecting_shareholders")}>
                            <Card  className={this.props.data.eventlist[this.props.data.selectedEvent].objective === "connecting_shareholders" ? "objectives-card selected-card":"objectives-card"} 
                              theme="dark">
                            <p >
                            Connecting Shareholders with Mgmt 
                            </p>
                            </Card>
                            </div>

                        </GridColumn> 
                        <GridColumn width="1-of-6" smallWidth="1-of-6">
                            <div onClick={() => dataSet("objective","reach_audience")}>
                            <Card  className={this.props.data.eventlist[this.props.data.selectedEvent].objective === "reach_audience" ? "objectives-card selected-card":"objectives-card"} 
                              theme="dark">
                            <p >
                            Reach a broader audience 
                            </p>
                            </Card>
                            </div>

                        </GridColumn> 
                     </Grid>

                      <div className="view2-screen_input"> 
                        <Textbox 
                          theme="light-grey" 
                          maxLength="500"
                          placeholder="Or enter your own objective here."
                          onChange={(e) => dataSet('inputObjective',e)}
                          value={this.props.data.eventlist[this.props.data.selectedEvent].inputObjective}
                        />
                      </div>
                      
                    </div>


              </Layout>

        </div>
            
       
      );
    }
  }
   

  const mapStateToProps = (state) => {
    return {
        view: state.viewReducer.view,
        data: state.dataReducer.data 

      };
};

const mapDispatchToProps = (dispatch) => {
    return {
        viewAction: (viewKey,viewValue) => {
          dispatch(viewAction(viewKey,viewValue));
        },
        dataSet: (dataKey,dataValue) => {
          dispatch(dataSet(dataKey,dataValue));
        }, 
      };
};
    
    export default connect(mapStateToProps,mapDispatchToProps)(View2);