import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';
import { combineForms } from 'react-redux-form';

export const addTask = (task) => ({
type: ActionTypes.ADD_TASK,
payload: task

});

export const updatecheckedtask = (modifiedtask) => ({
    type: ActionTypes.UPDATE_CHECKED_TASK,
    payload: modifiedtask
});

export const postupdatetask=(taskid,data) => (dispatch) => {
    const modifiedtask=  {
        
        completed: data
        
        
    
    };
    return fetch(baseUrl + 'tasks/' + taskid , {
        method: 'PATCH',
        body: JSON.stringify(modifiedtask),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      
      error => {
            throw error;
      })
    
      .then(response => response.json())
        .then(response => dispatch(updatecheckedtask(response)))
        .catch(error =>  { console.log('Update task', error.message); alert('Your Task could not be Updated \nError: '+error.message); });
    
};

 //export const postupdatetask =(taskid) => (dispatch) => {
//      const newcheckedTaskid=  {
//         id:taskid
       
// };



// return fetch(baseUrl + 'tasks', {
//     method: "POST",
//     body: JSON.stringify(newcheckedTaskid),
//     headers: {
//       "Content-Type": "application/json"
//     },
//     credentials: "same-origin"
// })
// .then(response => {
//     if (response.ok) {
//       return response;
//     } else {
//       var error = new Error('Error ' + response.status + ': ' + response.statusText);
//       error.response = response;
//       throw error;
//     }
//   },
  
//   error => {
//         throw error;
//   })

//   .then(response => response.json())
//     .then(response => dispatch(updatecheckedtask(response)))
//     .catch(error =>  { console.log('post Tasks', error.message); alert('Your Task could not be posted\nError: '+error.message); });

// };


export const postTask =(priority, author, taskdescription) => (dispatch) => {
    const newTask=  {
        
        priority: priority,
        author: author,
        taskdescription: taskdescription
        
    
    };

newTask.date = new Date().toISOString();
newTask.completed=false;

return fetch(baseUrl + 'tasks', {
    method: "POST",
    body: JSON.stringify(newTask),
    headers: {
      "Content-Type": "application/json"
    },
    credentials: "same-origin"
})
.then(response => {
    if (response.ok) {
      return response;
    } else {
      var error = new Error('Error ' + response.status + ': ' + response.statusText);
      error.response = response;
      throw error;
    }
  },
  
  error => {
        throw error;
  })

  .then(response => response.json())
    .then(response => dispatch(addTask(response)))
    .catch(error =>  { console.log('post Tasks', error.message); alert('Your Task could not be posted\nError: '+error.message); });

};




export const tasksLoading = () => ({
    type: ActionTypes.TASKS_LOADING
});


export const fetchTasks = () => (dispatch) => {
    dispatch(tasksLoading(true));
    return fetch(baseUrl + 'tasks')
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
        var errmess = new Error(error.message);
        throw errmess;
  })

    .then(response => response.json())
    .then(tasks => dispatch(addTasks(tasks)))
    .catch(error => dispatch(tasksFailed(error.message)));
};



export const tasksFailed = (errmess) => ({
    type: ActionTypes.TASKS_FAILED,
    payload: errmess
});

 export const addTasks = (tasks) => ({
     type: ActionTypes.ADD_TASKS,
     payload: tasks
 });

