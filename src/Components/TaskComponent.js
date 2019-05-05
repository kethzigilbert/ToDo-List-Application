import React, {Component} from 'react';
import { Control,  Errors} from 'react-redux-form';
import { ListGroup,ListGroupItem, Button,Label,Col,Form, FormGroup, ButtonGroup, Badge,Input, Card,CardText,CardSubtitle,CardBody,CardImg,CardImgOverlay,CardTitle, Breadcrumb,BreadcrumbItem,Media } from 'reactstrap';
//import {Link} from 'react-router-dom';
//import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
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
            //alert("CheckboxClicked"+this.props.taskid);
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
       <span className="fa fa-check fa-sm"></span>
            
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
       <span className="fa fa-list fa-sm"></span>
            To Be Done
                                     
        </Button>
            );
        }
    }
    }



class RenderDelete extends Component
{
        constructor(props){
            super(props);
            
        this.deletetask = this.deletetask.bind(this);
      
        }
             
        deletetask(){
            //alert("Deletetask"+this.props.taskid);
           this.props.deletetask(this.props.taskid);
        }

       render(){
        
        
            
            return (
                
        <Button outline 
        onClick= {this.deletetask}
       className="float-right" type="submit" >
       <span className="fa fa-trash fa-sm"></span>
        Delete
                                  
        </Button>
             );

       
    }
    }
   
class Task extends Component{
        constructor(props){
            super(props);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleSubmitproject = this.handleSubmitproject.bind(this);
            //this.getUniqueProject=this.getUniqueProject.bind(this);
        }

        handleSubmit = (e) => {
            e.preventDefault();
        
            //  extract the node list from the form
            //  it looks like an array, but lacks array methods
            const { priority } = this.form;
        
            // convert node list to an array
            const checkboxArray = Array.prototype.slice.call(priority);
        
            // extract only the checked checkboxes
            const checkedCheckboxes = checkboxArray.filter(input => input.checked);
            console.log('checked array:', checkedCheckboxes);
        
            // use .map() to extract the value from each checked checkbox
            const checkedCheckboxesValues = checkedCheckboxes.map(input => input.value);
            
            //alert('checked array:' + checkedCheckboxesValues.toString());
            this.props.getprioritytask(checkedCheckboxesValues,'priority');
            
          }
        
          handleSubmitproject = (e) => {
            e.preventDefault();
        
            //  extract the node list from the form
            //  it looks like an array, but lacks array methods
            const { project } = this.form;
        
            // convert node list to an array
            const checkboxArray = Array.prototype.slice.call(project);
        
            // extract only the checked checkboxes
            const checkedCheckboxes = checkboxArray.filter(input => input.checked);
            console.log('checked array:', checkedCheckboxes);
        
            // use .map() to extract the value from each checked checkbox
            const checkedCheckboxesValues = checkedCheckboxes.map(input => input.value);
            
            //alert('checked array:' + checkedCheckboxesValues.toString());
            this.props.getprioritytask(checkedCheckboxesValues,'project');
            
          }
          
        
        render () {
        function getUniqueProject(data){
        
                var lookup = {};
                var items = data;
                var result = [];
                
                for (var item, i = 0; item = items[i++];) {
                  var name = item.project;
                
                  if (!(name in lookup)) {
                    lookup[name] = 1;
                    result.push(name);
                  }
                }
                return result;
              }
        const result= getUniqueProject(this.props.tasks.tasks);
        
        const projectcheckboxes= result.map((project)=>{
            return(
                <div className="col-12">
                        <label>
                        <input type="checkbox" value={project} name="project" />
                            {project}
                        </label>
                </div>
            );
        })
    
        const task=this.props.tasks.tasks.map((task) => {

                return (
       
       <ListGroupItem key={task.id}  >{task.taskdescription}

       <RenderPriority priority={task.priority}/>
       <RenderCompleted completed={task.completed} taskid={task.id} 
        postupdatetask={this.props.postupdatetask}
       />
       
        <RenderDelete taskid={task.id} deletetask={this.props.deletetask}/>
       <p>Author: {task.author} <br/>
       Project: {task.project}</p>
       
      
        
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
                    <div className="col-2">
                    </div>
                    <div className="col-10">
                        <h3>Tasks
                        <AddTaskForm postTask={this.props.postTask} />
                        </h3>

                        <hr />
                    </div>

                </div>

                <div className="row" >
                    <div className="col-2">
                        <h4> Priority </h4>
                        <form
                            onSubmit={this.handleSubmit}
                            ref={form => this.form = form}>
                            <div className="col-12">
                            <label>
                            <input type="checkbox" value="Low" name="priority" />
                                Low
                            
                            </label>
                            </div>
                            <div className="col-12">
                            <label>
                            <input type="checkbox" value="High" name="priority" />
                                High
                            
                            </label>
                            </div>
                            <div className="col-12">
                            <label>
                            <input type="checkbox" value="Medium" name="priority" />
                                Medium
                             
                            </label>
                            
                            </div>
                            <input type="submit" value="Apply" />
                            
                        </form>
                        <h4> Project </h4>
                        <form
                            onSubmit={this.handleSubmitproject}
                            ref={form => this.form = form}
                            >
                           {projectcheckboxes}
                            <input type="submit" value="Apply" />
                            
                            
                        </form>



                    </div>
                    <div className="col-10">
                        <ListGroup >
                            {task}
                        </ListGroup>
                    </div>

                </div>

            </div>


        );
    
    }
}


    
 



export default Task;
