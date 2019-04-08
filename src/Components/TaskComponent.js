import React from 'react';
import { ListGroup,ListGroupItem, Button, Badge, Card,CardText,CardSubtitle,CardBody,CardImg,CardImgOverlay,CardTitle, Breadcrumb,BreadcrumbItem,Media } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
import AddTaskForm from './AddTaskFormComponent';
//import { baseUrl } from '../shared/baseUrl';

function RenderPriority(props)
    {


        
        if(props.priority=="Low")
        {
            
           
            
            return (
                <Badge color="secondary">Low</Badge>
                
             );

            
        }
        else if (props.priority=="Medium")
        {
            return(
                <Badge color="warning">Medium</Badge>
            );
        }
        else 
        {
            return(
                <Badge color="danger">High</Badge>
            );
        }

    }
const Task = ({tasks,postTask}) => {

    
    
    const task=tasks.tasks.map((task) => {
            return (
   
   <ListGroupItem key={task.id}  >{task.taskdescription}
   <RenderPriority priority={task.priority}/>
   <Button outline 
//    onClick={this.toggleCheckBox}
   className="float-right" type="submit" color="primary">
        <span className="fa fa-check-square fa-lg"></span>
                                
    </Button>
   
    </ListGroupItem>
 
  
                
            
            );
        });
        
        if (tasks.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (tasks.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{tasks.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else
        return(
            <div className="container">
            <div className="row">
            
           
            <div className="col-12">
                        <h3>Tasks
                        <AddTaskForm postTask={postTask} />
                        </h3>
                        
                        <hr />
            </div>     
            
            </div>
            <div className="row">
           <ListGroup className="col-12">
            {task}
            </ListGroup>
            </div>
            
            </div>


        );
    

}

        
 



export default Task;
