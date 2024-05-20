export default function reducer(state = {categ : "all" , showNoteForm : false , showTaskForm : false} , action ) {
    
    switch(action.type){
        case "storeCateg":
            return {...state , categ : action.payload}

        case "showNoteForm":
            return {...state , showNoteForm : true}
        case "hideNoteForm":
            return {...state , showNoteForm : false}

        case "showTaskForm":
            return {...state , showTaskForm : true}
        case "hideTaskForm":
            return {...state , showTaskForm : false}
            
        default : 
            return state;
    }
}
