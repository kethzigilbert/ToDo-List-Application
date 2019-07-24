import * as ActionTypes from './ActionTypes';

export const Tasks = ( state = { isLoading: true,
    errMess: null,
    tasks:[]},action) => {

    switch (action.type) {
        case ActionTypes.ADD_TASKS:
            return {...state, isLoading: false, errMess: null, tasks: action.payload};

        case ActionTypes.TASKS_LOADING:
            return {...state, isLoading: true, errMess: null, tasks: []}

        case ActionTypes.TASKS_FAILED:
            return {...state, isLoading: false, errMess: action.payload};
        case ActionTypes.ADD_TASK:
            var task= action.payload;
            return {...state, tasks :state.tasks.concat(task)};
        case ActionTypes.UPDATE_CHECKED_TASK:
            var task = action.payload;
            var item= state.tasks.find(item=>item.id== task.id);
            item.completed = (task.completed) ;
            return {...state, tasks :state.tasks};
        case ActionTypes.DELETE_TASK:
            var taskid = action.payload;
           
            var newstates = state.tasks.filter(function (task) {
                return task.id != taskid 
              });
            return {...state, tasks :newstates};
        

        default:
            return state;
    }
}