const viewReducer = (state={
    view:{
    currentView:0,
    dashboardActive:false,
   }
     
   },action) => {
     if(action.type === 'VIEW_UPDATE'){
       var viewKey = action.viewKey;
       var viewValue = action.viewValue;
       state = {
        view:{
            ...state.view,
            [viewKey]:viewValue
           }
       }
     
     } 
     
     return state;
   
   };
 
   export default viewReducer;
   