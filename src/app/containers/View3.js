import React from "react"; 
import { connect } from 'react-redux';
import { viewAction } from "../actions/viewActions";
import { dataSet } from "../actions/dataActions";

import { Layout, Grid, GridColumn, Card, Textbox, Checkbox, Modal, Button} from '@q4/nimbus-ui'; 
import RangeCalendar from "../components/rangeCalendar"; 

// import { Column, Row} from "simple-flexbox";

import './../../App.css';
 
//iframe for temporary event form - reaching out to events for how to integrate form natively 
const iframe = '<iframe style="width: 100%;height:100%;" scrolling="yes" title="Event Form" src="https://form.jotform.co/72276888033869" frameborder="no" allowtransparency="true" allowfullscreen="true"></iframe>'; 

//iframe component 
function Iframe(props) {
  return (<div dangerouslySetInnerHTML={ {__html:  props.iframe?props.iframe:""}} />);
}

class View3 extends React.Component{
    
    state = {
        from: null,
        to: null,
        enteredTo: null,
        modalOpen: false,
        modalEventFormOpen:false
            }
 
           
            
 render(){ 
 
  var dataSet = (dataKey,dataValue) => {

    this.props.dataSet(dataKey,dataValue);

  }

  var updateState = (arg,updateObj) => {
    if (arg==='first'){
      this.setState({
          from: updateObj.from,
          to:updateObj.to,
          enteredTo:updateObj.enteredTo,
      });
 
      this.props.dataSet('dateRangeFrom',updateObj.from);
      this.props.dataSet('dateRangeTo',updateObj.to); 


     }
     else if (arg === 'second'){
         this.setState({ 
             to:updateObj.to,
             enteredTo:updateObj.enteredTo,
         });
      this.props.dataSet('dateRangeTo',updateObj.to); 
     }
     else if (arg === 'third'){
         this.setState({ 
             enteredTo:updateObj.enteredTo,
         });


     }
  }

      return (
      <div className="view3-screen"> 
        {/* <p style={styles.title}>Enter in the event supporting details below. These can be edited later on as well. </p> */}

              <Layout 
                theme="slate" 
                height="comfy" 
                justifyContent="left" 
                padding="none"
              >

                    <div className="view3-screen_container">
 
                     <p className="title-text--left">How many potential attendees are you expecting?</p>
                      <div className="selection-wrapper"> 
                    
                        <Textbox 
                          theme="light-grey" 
                          maxLength="500"
                          placeholder="150"
                          onChange={(e) => dataSet('minAttendees',e)}
                          value={this.props.data.eventlist[this.props.data.selectedEvent].minAttendees}
                        />

                        <p className="selection-wrapper_middle-text"> to </p>

                        <Textbox 
                          theme="light-grey" 
                          maxLength="500"
                          placeholder="2500"
                          onChange={(e) => dataSet('maxAttendees',e)}
                          value={this.props.data.eventlist[this.props.data.selectedEvent].maxAttendees}
                        />
                      </div>

                      <p className="title-text--left">Do you have a budget in place for your event?</p>
                      <div className="selection-wrapper"> 
                    
                        <Textbox 
                          theme="light-grey" 
                          maxLength="500"
                          placeholder="~$32,000 USD"
                          onChange={(e) => dataSet('inputBudget',e)}
                          value={this.props.data.eventlist[this.props.data.selectedEvent].inputBudget}
                        />

                        <Checkbox 
                          size="small"
                          checked={false}
                          onClick={(e) => console.log("budget cost out logic here")}
                          checkmarkIcon="ni-checkmark-4pt"
                          inline={true}
                          label="Budget is to be cost out/TBD"
                          theme="steel"
                            />
                      </div>

                      
 
                      <div className="event-types"> 
                      <p className="title-text--left">What's the format of the event?</p>

                     <Grid>

                     <GridColumn width="3-of-12"  >
                            <div onClick={() => dataSet("format","in_person")}>
                            <Card  className={this.props.data.eventlist[this.props.data.selectedEvent].format === "in_person" ? "event-card selected-card--mini":"event-card"} 
                              theme="dark">
                            <p >
                            In-Person only 
                            </p>
                            </Card>
                            </div>
                        </GridColumn> 

                        <GridColumn width="3-of-12"  >
                            <div onClick={() => dataSet("format","virtual")}>
                            <Card  className={this.props.data.eventlist[this.props.data.selectedEvent].format === "virtual" ? "event-card selected-card--mini":"event-card"} 
                              theme="dark">
                            <p >
                            Virtual Webcast / Conference Call
                            </p>
                            </Card>
                            </div>
                        </GridColumn>  
                        <GridColumn width="3-of-12"  >
                            <div onClick={() => dataSet("format","hybrid")}>
                            <Card  className={this.props.data.eventlist[this.props.data.selectedEvent].format === "hybrid" ? "event-card selected-card--mini":"event-card"} 
                              theme="dark">
                            <p >
                            Hybrid - Webcast / Conference Call + In Person 
                            </p>
                            </Card>
                            </div>
                        </GridColumn> 


                     </Grid>
                        </div>

                        <p className="title-text--left">Select a potential date range.</p>

                      <div className="selection-wrapper"> 
                        <Button 
                            label={this.props.data.eventlist[this.props.data.selectedEvent].dateRangeTo ? "Update Date Selection": "Click to select date range"} 
                            onClick={() => this.setState({modalOpen:true})}
                         />  

                        <Modal
                          className="calendar-modal"
                          title="Select Calendar Dates"
                          badgeIcon="ni-lock-2pt"
                          visible={this.state.modalOpen}
                          onCloseRequest={() => this.setState({modalOpen:false})}
                          >
                                <RangeCalendar 
                                currentState={this.state}
                                updateState={(arg,obj) =>  updateState(arg,obj)}
                                closeCalendar={()=> this.setState({modalOpen:false})}
                                 />
                         </Modal>  

                        {this.props.data.eventlist[this.props.data.selectedEvent].dateRangeTo ? <Button 
                            label="Finalize Event Request"
                            onClick={() => this.setState({modalEventFormOpen:true})}
                         /> : null  }
                         
 
                          <Modal
                                className="event-form-modal" 
                                 
                                visible={this.state.modalEventFormOpen}
                                onCloseRequest={() => this.setState({modalEventFormOpen:false})}
                                headerActions={false}
                                footerActions={false}
                                contentHeight="600"
                                >
                                <Iframe iframe={iframe} />

                              </Modal>
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
    
    export default connect(mapStateToProps,mapDispatchToProps)(View3);