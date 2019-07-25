import React from 'react';
import RenderPriority from './RenderPriority';
import RenderCompleted from './RenderCompleted';
import RenderDelete from './RenderDelete';
import {ListGroupItem,ListGroup} from 'reactstrap';


const DisplayTasks = (props) =>{
    const notcompleted= props.tasks.map((task) => {
    return (
    <ListGroupItem key={task.id} className = "list-font"  >{task.taskdescription}
   <RenderPriority priority={task.priority}/>
   <RenderCompleted completed={task.completed} taskid={task.id} 
    postupdatetask={props.postupdatetask}
   />
   {/* <RenderDelete taskid={task.id} deletetask={this.props.deletetask}/> */}
   <p>Author: {task.author} <br/>
   Category: {task.project}</p>
  </ListGroupItem>

            );
        });

    return (
        <ListGroup >
            {notcompleted}
        </ListGroup>
    ); 
    }
export default DisplayTasks;



//filter(task=> !task.completed).