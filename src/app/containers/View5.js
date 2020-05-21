import React from "react"; 
import { connect } from 'react-redux';
import { viewAction } from "../actions/viewActions";
import { dataSet } from "../actions/dataActions";

import { Layout, Grid, GridColumn, Card, Button} from '@q4/nimbus-ui';  

import './../../App.css';
 
const moduleList = [
    {moduleTitle:'Unique Page URL',
     moduleDescription:'Choose a unique URL path to aesthetically navigate your visitors to. For example "Your-IR-Site.com/investorday2020"',     
    },
    {moduleTitle:'Event Banner',
    moduleDescription:'Include a featured banner',     
    }, 
    {moduleTitle:'Document List',
     moduleDescription:'Include an organized list of Event documents on your Event page',     
    },
    {moduleTitle:'SlideShow Viewer',
    moduleDescription:'Include a featured slideshow on your Event page',     
    },  
    {moduleTitle:'FAQs',
    moduleDescription:'Include a frequently asked question section',     
    },   
    {moduleTitle:'Agenda List',
    moduleDescription:'Showcase the itinerary for the day with a formatted agenda',     
    },  

];
 
class View5 extends React.Component{
    
    state = {
        modalOpen: false,
        websiteWizard:0,
        beginStaging:false,
        modulestoAdd:[]
            }
 
         

 render(){ 
 
   
     
  var beginStaging = () => {

    this.props.dataSet("modulestoAdd",this.state.modulestoAdd);

    this.setState({
      beginStaging:true
    })
  }
    
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

  var addToPage = (index) => {  

    var initialStateItem = moduleList[index].moduleTitle;
     
     
   if (this.state.modulestoAdd.indexOf(initialStateItem) > -1){

     
 
    var toRemove = [
        ...this.state.modulestoAdd
    ];
    
    toRemove.splice(this.state.modulestoAdd.indexOf(initialStateItem),1);


    this.setState({ 
        modulestoAdd:toRemove
        });

   }
   else if (this.state.modulestoAdd.indexOf(initialStateItem) === -1){

 
    this.setState({
        modulestoAdd:[
        ...this.state.modulestoAdd,
        initialStateItem
        ]
        });

   } 

     

  }

      return (
      <div className="view5-screen">  
              <Layout 
                theme="slate" 
                height="comfy" 
                justifyContent="left" 
                padding="none"
              >

                    <div className="view5-screen_container">
  
                      <div className="web-updates-types"> 
                      <p className="title-text--left">Do you have a pre-determined template for your website updates?</p>

                                <Grid>

                                <GridColumn width="3-of-12"  >
                                <div onClick={() => dataSet("web_predetermined","yes")}>
                                <Card  className={this.props.data.eventlist[this.props.data.selectedEvent].web_predetermined === "yes" ? "checkType-card selected-card--mini":"checkType-card"} 
                                theme="dark">
                                <p >
                                Yes
                                </p>
                                </Card>
                                </div>
                                </GridColumn> 

                                <GridColumn width="3-of-12"  >
                                <div onClick={() => dataSet("web_predetermined","no")}>
                                <Card  className={this.props.data.eventlist[this.props.data.selectedEvent].web_predetermined === "no" ? "checkType-card selected-card--mini":"checkType-card"} 
                                theme="dark">
                                <p >
                                No
                                </p>
                                </Card>
                                </div>
                                </GridColumn>   
                                </Grid>
                        </div>


                    <div className="content-container">
                        {this.props.data.eventlist[this.props.data.selectedEvent].web_predetermined ==="yes" ?  
                        
                        <div className="predetermined-yes">
                        <h1>Already have a Pre-Determined Template</h1>
                        <p>In this case, the best next step would be to connect with IRM
                            on how best we can implement your concept onto your IR site.

                            You can also directly reach the support team for assistance at support@q4inc.com.
                        </p> 
                        
                    </div>
                        
                        
                        : null}

                         {this.props.data.eventlist[this.props.data.selectedEvent].web_predetermined ==="no" ?  
                
                    <div>
                        <div className="predetermined-no">
                        <h1>Modules, Best Practices and your tracking.</h1>
                        <p>Supporting large number of Investor Day events has helped us formulate some of the top page layouts, widgets and
                           best practices.</p>
                        <p>Select <i className="fa fa-plus custom-card_card-icon" style={{color:'#F1B031'}} aria-hidden="true"></i> on the features you'd like to add to your page. Once ready, select the "Begin Staging" button for your updates to get started on.
                        </p>
                        
                    </div> 

    <Layout theme="slate"  flex={false} padding="none" height="full">
         
                                <div className="staging-buttons">
                                    <div>
                                        <Button 
                                        className="staging-buttons--secondary"
                                        theme="light-grey"
                                        label="Request IRM Help"
                                        size="default"
                                        onClick={this.props.nextStep}
                                        /> 
                                    </div>
                                    <div>
 
                                    
                                        <Button 
                                        className="staging-buttons--secondary"
                                        style={{padding:'30px'}}
                                        theme="citrus"
                                        label={this.state.beginStaging ? "Staging in progress" : "Begin Staging"}
                                        size="default"
                                        onClick={() => beginStaging()}
                                        />
                                    </div> 
                                </div>

         <Grid className="plugin-grid"> 

        {moduleList.map(
          (item, index)  => {
              return (
              <GridColumn  key={index} width="1-of-4" smallWidth="1-of-12">
                      <Card
                      theme="dark"
                      className="plugin-grid_item"
                      title={item.moduleTitle}
                      headerChildren={ 
                      <div> 
                      <i onClick={() => alert('modal preview')}   className="fa fa-eye custom-card_card-icon" aria-hidden="true"></i>
                      {this.state.modulestoAdd.indexOf(item.moduleTitle) > -1 ? 

                        <i onClick={() => addToPage(index) } style={{color:'#54BD9D'}} className="fa fa-check custom-card_card-icon" aria-hidden="true"></i>

                        :
                        <i onClick={() => addToPage(index) } style={{color:'#F1B031'}} className="fa fa-plus custom-card_card-icon" aria-hidden="true"></i>

                        }

                       </div>
                      }
                      children={true} 
                      > 
                      <p style={{textAlign:'left'}}>{item.moduleDescription}</p>
                      </Card>
                
              </GridColumn>
            );
          }
        )} 
      </Grid>
      </Layout>

                   
                      

                      </div>
                        
                        : null}
                    
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
    
    export default connect(mapStateToProps,mapDispatchToProps)(View5);