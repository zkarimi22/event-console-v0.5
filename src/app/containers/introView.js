import React from "react"; 
import { connect } from 'react-redux';
import { viewAction } from "../actions/viewActions";
import { dataSet } from "../actions/dataActions";
import {Layout, PlaceholderContent,Button, Textbox, Card, Grid, GridColumn } from '@q4/nimbus-ui'; 
 

// import { Column, Row} from "simple-flexbox";

import './../../App.css';
 
class IntroView extends React.Component{
    state = {
      showTitleText:false
    }
 
  

  render(){ 
 

    var startEvent = () => {

      var dateCreated = new Date().toISOString().substring(0, 10);

      var id = this.props.data.eventlist.length;

      var dataObject = {key:id ,title:"",created_timestamp:dateCreated,modulestoAdd:[]}; 

      this.props.dataSet('eventlist',dataObject);

      this.props.dataSet('selectedEvent',id);

      this.setState({showTitleText:true});

    }
    var eventAddStep = () => {  

      this.props.viewAction("dashboardActive",true);

      nextStep();

      }

    var nextStep = (direction) => { 
  
      var currentValue = this.props.view.currentView;

           if(direction==="back"){

              this.props.viewAction("currentView",currentValue -1);
          }
          else {

              this.props.viewAction("currentView",currentValue +1);
          }
      }

      var editEvent = (index) => {  

          console.log(index);
        this.props.dataSet('selectedEvent',index);
  
        nextStep();
  
        }

        var newCopy = (copiedIndex) => {  

          var dateCreated = new Date().toISOString().substring(0, 10);
          
        
           const copiedObject = {
            ...this.props.data.eventlist[copiedIndex],
            title: "Copy of"+this.props.data.eventlist[copiedIndex].title,
            created_timestamp: dateCreated
          } 
 
          this.props.dataSet('eventlist',copiedObject);
 
          
          }


    var dataSet = (dataKey,dataValue) => {

      this.props.dataSet(dataKey,dataValue);

    }

    

    if (this.props.view.dashboardActive === true) { 
      return (
        <Layout theme="slate"  flex={false} padding="none" height="full">
         
         <Grid className="custom-grid"> 

        {this.props.data.eventlist.map(
          (item, index)  => {
            console.log(item);
             return (
              <GridColumn key={index} width="1-of-4" smallWidth="1-of-12">
                      <Card
                      className="custom-card"
                      theme="dark"
                      title={item.title}
                      headerChildren={ 
                      <div> 
                      <i onClick={() => editEvent(index) } className="fa fa-pencil custom-card_card-icon" aria-hidden="true"></i>
                      <i onClick={() => newCopy(index) } className="fa fa-clone custom-card_card-icon" aria-hidden="true"></i>
                      </div>
                      }
                      children={true} 
                      > 
                      <p className="custom-card_description">Date Created: {item.created_timestamp}</p>
                      </Card>
                
              </GridColumn>
            );
          }
        )}
         <GridColumn   width="1-of-4" smallWidth="1-of-12">
                      <Card
                      classname="custom-card"
                      theme="dark"
                      title="CREATE A NEW EVENT"
                      headerChildren={ 
                      <div> 
                       
                      </div>
                      }
                      children={true} 
                      > 
                      <p className="custom-card_description" >Create a new event</p>
                      </Card>
                
              </GridColumn>
      </Grid>
      </Layout>
       
      );

  }
  
 
  if (this.props.view.dashboardActive === false) {

    return (
       <div className="intro-screen" > 
        <PlaceholderContent 
        className="placeholder-test" 
        theme="dark"
        icon="ni-q4-logo"
        title="Investor Days Made Easy" 
        /> 
        
      {this.state.showTitleText ? <div className="intro-screen_prompt"> 
                                      <Textbox 
                                          theme="light-grey" 
                                          maxLength="500"
                                          placeholder="Give a title to your event." 
                                          onChange={(e) => dataSet('title',e)}
                                          onKeyDown={(e) => e.key === "Enter" ? nextStep():null}
                                          value={this.props.data.eventlist[this.props.data.selectedEvent].title}
                                           
                                        />
                                         <Button 
                                          className="intro-screen_get-started"
                                          theme="rain"
                                          label="Start"
                                          size="default"
                                          onClick={() => eventAddStep()}
                                        /> 
                                    </div>
                                  : 
                                    <Button 
                                    theme="rain"
                                    label="Plan your first event"
                                    size="default"
                                    onClick={()=> startEvent()} 

                                        /> 
        }  
         
      </div>
     
    );
 
      }
    }
  }
   

  const mapStateToProps = (state) => {
    return {
        view: state.viewReducer.view,
        data: state.dataReducer.data, 

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
    
    export default connect(mapStateToProps,mapDispatchToProps)(IntroView);