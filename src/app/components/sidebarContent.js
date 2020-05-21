import React from "react"; 
import { connect } from 'react-redux';
import { viewAction } from "../actions/viewActions"; 


// import { Column, Row} from "simple-flexbox";

import './../../App.css';
 
class SideBarContent extends React.Component{
    
 
 
 render(){ 
 

  return (
    <div onClick={() => this.props.action()} className={this.props.pipeline ? "idp-nav_menu-item pipeline_item": "idp-nav_menu-item"}>
      
        <p className="sidebar_title">{this.props.title}</p>


   </div>
  );
    }
  }
   

    const mapStateToProps = (state) => {
        return {
            view: state.viewReducer.view
             
    
          };
    };
    
    const mapDispatchToProps = (dispatch) => {
        return {
            viewAction: (viewKey,viewValue) => {
              dispatch(viewAction(viewKey,viewValue));
            },
           
          };
    };
    
    export default connect(mapStateToProps,mapDispatchToProps)(SideBarContent);