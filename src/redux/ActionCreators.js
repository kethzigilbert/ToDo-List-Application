import * as ActionTypes from './ActionTypes';
import {baseUrl} from '../shared/baseUrl';
import { combineForms } from 'react-redux-form';


//Update Completed Status of Tasks.
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

//Deleting a task 

 export const deletetaskaction = (taskid) => ({
     type: ActionTypes.DELETE_TASK,
     payload: taskid
 });

export const deletetask=(taskid)  =>(dispatch)=> {
    dispatch(deletetaskaction(taskid));

    return fetch(baseUrl + 'tasks/' + taskid , {
        method: 'DELETE',
        
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
       //.then(taskid => dispatch(deletetaskaction(taskid)))
      .catch(error =>  { console.log('Update task', error.message); alert('Your Task could not be Deleted \nError: '+error.message); });
    
};

//Adding a task

export const addTask = (task) => ({
    type: ActionTypes.ADD_TASK,
    payload: task
    
    });
export const postTask =(priority, author, taskdescription,category) => (dispatch) => {
    const newTask=  {
        
        priority: priority,
        author: author,
        taskdescription: taskdescription,
        category:category
        
    
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

 ///Fetch based on priority
 export const getfilteredtask=(data) => (dispatch) => {
     var urlform= '?';

     for (let [key,value] of Object.entries(data)) {

        for (var i=0; i<value.length; i++)
        {
        urlform= urlform.concat(key+'='+value[i]+'&');
        }
    }
     
    return fetch(baseUrl + 'tasks' + urlform,{
        method: "GET",
        
        headers: {
          "Content-Type": "application/json"
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
      
        .then(response => dispatch(addTasks(response)))
        .catch(error =>  { console.log('Update task', error.message); alert('Your priority Task could not be Updated \nError: '+error.message); });
    
};

