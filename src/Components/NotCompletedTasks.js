import React from 'react';
import RenderPriority from './RenderPriority';
import RenderCompleted from './RenderCompleted';
import RenderDelete from './RenderDelete';
import {ListGroupItem,ListGroup} from 'reactstrap';


const NotCompletedTasks = (props) =>{
    const notcompleted= props.tasks.tasks.map((task) => {
    return (
    <ListGroupItem key={task.id}  >{task.taskdescription}
   <RenderPriority priority={task.priority}/>
   <RenderCompleted completed={task.completed} taskid={task.id} 
    postupdatetask={props.postupdatetask}
   />
   {/* <RenderDelete taskid={task.id} deletetask={this.props.deletetask}/> */}
   <p>Author: {task.author} <br/>
   Project: {task.project}</p>
  </ListGroupItem>

            );
        });

    return (
        <ListGroup >
            {notcompleted}
        </ListGroup>
    ); 
    }
export default NotCompletedTasks;



//filter(task=> !task.completed).