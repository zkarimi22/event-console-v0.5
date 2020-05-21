import React from "react"; 
import { connect } from 'react-redux';
import { viewAction } from "../actions/viewActions";
import { dataSet } from "../actions/dataActions";

import { Layout, Grid, GridColumn, Card, Textbox, Checkbox, Modal, Button} from '@q4/nimbus-ui'; 

// import { Column, Row} from "simple-flexbox";

import './../../App.css';
 
 

class EventStatus extends React.Component{
    
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



  var leftNavigate = (menuNum) => {

    this.props.viewAction("currentView",menuNum);

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
      <div className="event-status"> 
 
              <Layout 
                theme="slate" 
                height="comfy" 
                justifyContent="left"  
              >

                    <div className="event-status_screen"> 


    <Layout padding="none" direction="column" theme="slate" flex={false}>
      <Grid>
        <GridColumn width="1-of-1" smallWidth="1-of-1">
                    <Card
                      className="status-card"
                      theme="dark"
                       title="Main Details"
                      headerChildren={ 
                      <div> 
                      <i onClick={() => leftNavigate(1)} className="fa fa-pencil custom-card_card-icon" aria-hidden="true"></i>
                       </div>
                      }
                      children={true} 
                      > 
                      <p>Title: {this.props.data.eventlist[this.props.data.selectedEvent].title}</p>
                      <p>Created: {this.props.data.eventlist[this.props.data.selectedEvent].created_timestamp}</p>
                      <p>Objective: {this.props.data.eventlist[this.props.data.selectedEvent].objective}</p>
                      </Card>
                
        </GridColumn>
        <GridColumn width="1-of-1" smallWidth="1-of-1">
        <Card
                      className="status-card"
                      theme="dark"
                      
                      title="Supporting Details"
                      headerChildren={ 
                      <div> 
                      <i onClick={() => () => leftNavigate(2)} className="fa fa-pencil custom-card_card-icon" aria-hidden="true"></i>
                       </div>
                      }
                      children={true} 
                      > 
                      <p>Date Range From: {this.props.data.eventlist[this.props.data.selectedEvent].dateRangeTo.toLocaleDateString()}</p>
                      <p>Date Range To: {this.props.data.eventlist[this.props.data.selectedEvent].dateRangeFrom.toLocaleDateString()}</p>
                      <br></br>

                      <p>Attendees Range From: {this.props.data.eventlist[this.props.data.selectedEvent].minAttendees}</p>
                      <p>Attendees Range To: {this.props.data.eventlist[this.props.data.selectedEvent].maxAttendees}</p>
                      <br></br>

                      <p>Budget: ~{this.props.data.eventlist[this.props.data.selectedEvent].inputBudget}</p>
                      <p>Format: {this.props.data.eventlist[this.props.data.selectedEvent].format}</p> 

                      <p>Webcast URL: PENDING</p> 


                      </Card>
        </GridColumn>
        <GridColumn width="1-of-1" smallWidth="1-of-1">
        <Card
                      className="status-card"
                      theme="dark"
                      title="Save the Date Invitations"
                      headerChildren={ 
                      <div> 
                      <i onClick={() => leftNavigate(3)} className="fa fa-pencil custom-card_card-icon" aria-hidden="true"></i>
                       </div>
                      }
                      children={true} 
                      > 
                      <p>Current State: DRAFT</p>
                      </Card>
        </GridColumn>
        <GridColumn width="1-of-1" smallWidth="1-of-1">
        <Card
                      className="status-card"
                      theme="dark"
                      title="Website Updates"
                      headerChildren={ 
                      <div> 
                      <i onClick={() => leftNavigate(4)} className="fa fa-pencil custom-card_card-icon" aria-hidden="true"></i>
                       </div>
                      }
                      children={true} 
                      > 
                      <p>Status: Preview Links Being Made</p>
                      <p>
                      
                       {this.props.data.eventlist[this.props.data.selectedEvent].modulestoAdd.map( (item, index) => {
                         return (
                         <span key={index}>
                             {index+1+". "+item+' '}
                         </span>)
                        
                        })
              
              
              
              }

                      </p>

                      </Card>
        </GridColumn>

      </Grid>
    </Layout>

                     

                    </div>


              </Layout>

        </div>
            
       
      );
    }
  }
  

  var styles = {
    centerScreen:{ 
      marginTop:'10%'
      },
      statusView:{   
          marginTop:'20px',
          height:'500px',
          overflow:'scroll', 
          display:'flex',
          justifyContent:'flex-start',
          flexDirection:'column',
          paddingLeft:'10%',
          paddingRight:'10%'
       }, 
       title:{
           color:'white',
           textAlign:'left'
       },
       attendeesContainer:{
           display:'flex',
           flexDirection:'row',
           width:'100%'
       }, 

  }

  const mapStateToProps = (state) => {
    return {
        view: state.viewReducer.view,
        data: state.dataReducer.data
        // item: state.item,
        // setup: state.setup,
        // category: state.category.chosenCategory

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
        // setupData: (setupObj) => {
        //   dispatch(setupData(setupObj));
        // },
        // catChange: (catUpdate) => {
        //   dispatch(catChange(catUpdate));
        // }
      };
};
    
    export default connect(mapStateToProps,mapDispatchToProps)(EventStatus);