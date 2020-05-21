import React from "react"; 
//state management
import { connect } from 'react-redux';


import IntroView from "../containers/introView";
import View2 from "../containers/View2";
import View3 from "../containers/View3"; 
import View4 from "../containers/View4"; 
import View5 from "../containers/View5"; 
import EventStatus from "../containers/eventStatus.js"; 
import SideBarContent from "../components/sidebarContent";

//actions
import { dataSet } from "../actions/dataActions";
import { viewAction } from "../actions/viewActions";


//nimbus & other pkgs 
import { Layout, Toolbar, ToolbarGroup, Button } from '@q4/nimbus-ui';
import Sidebar from "react-sidebar";
// import { Column, Row} from "simple-flexbox";

//stylesheet
import './../../App.css';

 

 
const navItems = [
{title:'Event Dashboard'},
{title:'Objectives'},
{title:'Supporting Details'}, 
{title:'Invitations'},
{title:'Website Updates'},
{title:'Game Day Checklist'},
{title:'Post-Event Data'},
{title:'Event Status'},
];

  
class MainView extends React.Component{
  
    componentDidMount(){ 
        
        this.props.viewAction('currentView',0); 

       }
 
 
 render(){ 


 
    var nextStep = (direction) => { 
  
        var currentValue = this.props.view.currentView;

             if(direction==="back"){
 
                this.props.viewAction("currentView",currentValue -1);
            }
            else {
 
                this.props.viewAction("currentView",currentValue +1);
            }
        }

      var leftNavigate = (menuNum) => {

        this.props.viewAction("currentView",menuNum);

        }

 
      return (

    
        <div className="App">
  
        <Layout  
            theme="slate" 
            padding="none"
            height="viewport"
            justifyContent="flex-start" 
            alignItems="stretched"
            flex={true}
            direction="column"
         >
            <Sidebar
              sidebar={
                <div className="sidebar"> 

                <div className="sidebar_container">
                  <h1 className="sidebar_nav-title"><i className="ni-q4-logo sidebar_nav-icon"></i> Investor Day</h1>

                  {this.props.view.currentView < 1 ? navItems.slice(0,1).map((item, index) => (
                    <SideBarContent action={() => leftNavigate(index)} key={index} title={index === 0 ? item.title :index+". "+item.title} />
                    ))
                    :
                    navItems.map((item, index) => (
                      <SideBarContent action={() => leftNavigate(index)} key={index} pipeline={index === 0 ? false : true} title={index === 0 ? item.title : item.title === "Event Status" ? item.title : index+". "+item.title} />
                      ))
                  } 
                 
                   

                </div>

                <div className="call-to-action">
                  <Button 
                  theme="citrus"
                  label="Back to Desktop"
                  size="default"
                  onClick={this.props.nextStep}
                  />
                </div>


                </div>
              }
              docked={true}
              shadow={false}
              onSetOpen={this.onSetSidebarOpen}
              styles={styles.sidebar}
              > 
        
        <Toolbar
          theme="rain" 
          className="main-toolbar"
        >
          <h1>{navItems[this.props.view.currentView].title}
            {this.props.view.currentView > 0 ? 
              <span className="main-toolbar_event-title">{this.props.data.eventlist[this.props.data.selectedEvent].title}</span> 
              :null}
             
          </h1>
          

          <ToolbarGroup >  
              {this.props.view.currentView === 0 ? 
                    this.props.data.eventlist.length > 0 ?
                      <Button theme="citrus" label="+ New Event" /> 
                    :null      
              :null} 
 

                {this.props.view.currentView === navItems.length-1 ? 

                    <Button theme="citrus" label="Export" /> 
                  : null
                }
              
          </ToolbarGroup>


        </Toolbar>




            <div className="main-view"> 

            {this.props.view.currentView === 0 ? <IntroView nextStep={(direction) => nextStep(direction)} /> : null}

            {this.props.view.currentView === 1 ? <View2 nextStep={(direction) => nextStep(direction)} /> : null}

            {this.props.view.currentView === 2 ? <View3 nextStep={(direction) => nextStep(direction)} /> : null}

            {this.props.view.currentView === 3 ? <View4 nextStep={(direction) => nextStep(direction)} /> : null}

            {this.props.view.currentView === 4 ? <View5 nextStep={(direction) => nextStep(direction)} /> : null}

             
            {this.props.view.currentView === navItems.length-1 ? <EventStatus nextStep={(direction) => nextStep(direction)} /> : null}

            
            {this.props.view.currentView !== 0 ? 
                  <div className="main-view_footer-nav">
                      <Button 
                        className="nav_back"
                        theme="rain"
                        label="Back"
                        onClick={() => nextStep("back")}
                      /> 
                {this.props.view.currentView === navItems.length-1?  <Button 
                                    className="nav_forward"
                                    theme="rain"
                                    label="Next"
                                    onClick={() => leftNavigate(0)}
                                  /> 
                                  
                                  : 
                
                            <Button 
                                    className="nav_forward"
                                    theme="rain"
                                    label="Next"
                                    onClick={() => nextStep("forward")}
                                  /> 
                }        
                       
                 </div>
                 :null
            }
            </div>

            </Sidebar>

        </Layout> 
    
        </div>  
   
      );
    }
  }
  

  var styles = {
     sidebar:{
      
        root: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflow: "hidden"
        },
        sidebar: {
          zIndex: 2,
          position: "absolute",
          top: 0,
          bottom: 0,
          transition: "transform .3s ease-out",
          WebkitTransition: "-webkit-transform .3s ease-out",
          willChange: "transform",
          overflowY: "auto",
          backgroundColor:'#22272B', 
          borderRight:'0.5px solid #22272B',
          width:'250px', 
          textAlign:'left'
        },
        content: {
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          overflowY: "auto",
          WebkitOverflowScrolling: "touch",
          transition: "left .3s ease-out, right .3s ease-out",
          
        },
        overlay: {
          zIndex: 1,
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0,
          visibility: "hidden",
          transition: "opacity .3s ease-out, visibility .3s ease-out",
          backgroundColor: "rgba(0,0,0,.3)"
        },
        dragHandle: {
          zIndex: 1,
          position: "fixed",
          top: 0,
          bottom: 0
        }
      
    }
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
    
    export default connect(mapStateToProps,mapDispatchToProps)(MainView);