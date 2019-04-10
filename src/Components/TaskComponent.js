import React, {Component} from 'react';
import { ListGroup,ListGroupItem, Button, Badge,Input, Card,CardText,CardSubtitle,CardBody,CardImg,CardImgOverlay,CardTitle, Breadcrumb,BreadcrumbItem,Media } from 'reactstrap';
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

class RenderCompleted extends Component
    {
        constructor(props){
            super(props);
            
        this.toggleCheckBox = this.toggleCheckBox.bind(this);
      
        }
       
       
         toggleCheckBox(){
             alert("CheckboxClicked"+this.props.taskid);
           this.props.postupdatetask(this.props.taskid,!this.props.completed);
        }
       render(){
        
        if(this.props.completed)
        {
           
            //const value=this.props.taskid;
            
            return (
                
                <Button outline 
      onClick={this.toggleCheckBox}
       className="float-right" type="submit" >
       <span className="fa fa-check fa-lg"></span>
            
        Completed
                                     
        </Button>
             );

            
        }
        
        else 
        {
            return(
                <Button outline 
       onClick={this.toggleCheckBox}
       className="float-right" type="submit" >
            Done
                                     
        </Button>
            );
        }
    }
    }

class Task extends Component{
        constructor(props){
            super(props);
           
            
        }


       
    
        render () {
            const task=this.props.tasks.tasks.map((task) => {
                return (
       
       <ListGroupItem key={task.id}  >{task.taskdescription}
       <RenderPriority priority={task.priority}/>
       <RenderCompleted completed={task.completed} taskid={task.id} 
        postupdatetask={this.props.postupdatetask}
       />
       
        <Button outline 
        //onClick={this.toggleCheckBox}
       className="float-right" type="submit" >
       <span className="fa fa-trash fa-lg"></span>
            Delete
                                     
        </Button>
       
        </ListGroupItem>
     
      
                    
                
                );
            });
        if (this.props.tasks.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (this.props.tasks.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{this.props.tasks.errMess}</h4>
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
                        <AddTaskForm postTask={this.props.postTask} />
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
}

        
 



export default Task;
