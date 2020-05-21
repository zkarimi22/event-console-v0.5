export function viewAction(viewKey,viewValue){
    return{
        type:"VIEW_UPDATE",
        viewKey: viewKey,
        viewValue:viewValue
    };
} 