const dataReducer = (state={
    data:{
        eventlist:[],
        title:"", 
    }
     
   },action) => {
     if(action.type === 'DATA_SET'){
 
          if (action.key==="eventlist"){

             var dataObject = action.value;

            state = {
            data:{
              ...state.data,
              eventlist:[ 
                 ...state.data.eventlist,dataObject
                ] 
              }
            } 

          }
          
          else if(action.key==="selectedEvent"){

            var dataKey = action.key;
            var dataValue = action.value; 

            state = {
              data:{
                ...state.data,
                selectedEvent:dataValue
                }
              } 
          }
          else{
            dataKey = action.key;
            dataValue = action.value;  

            const eventlist = state.data.eventlist.map(ev => ev.key === state.data.selectedEvent ? 
              {...ev,[dataKey]:dataValue} : ev);


                 state= {
                   data:{
                     ...state.data,
                     eventlist
                   }
                 }
 


          } 
     } 
     
     return state;
   
   };
 
   export default dataReducer;
   