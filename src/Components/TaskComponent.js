import React, {Component} from 'react';
import { Control,  Errors} from 'react-redux-form';
import { ListGroup,ListGroupItem, Button,Dropdown, DropdownToggle, DropdownMenu, DropdownItem,Label,Col,Form, FormGroup, ButtonGroup, Badge,Input, Card,CardText,CardSubtitle,CardBody,CardImg,CardImgOverlay,CardTitle, Breadcrumb,BreadcrumbItem,Media } from 'reactstrap';
//import {Link} from 'react-router-dom';
//import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {Loading} from './LoadingComponent';
import AddTaskForm from './AddTaskFormComponent';
//import { baseUrl } from '../shared/baseUrl';
import RenderPriority from './RenderPriority';
import RenderCompleted from './RenderCompleted';
import RenderDelete from './RenderDelete';

   
class Task extends Component{
        constructor(props){
            super(props);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleSubmitcompleteddropdown=this.handleSubmitcompleteddropdown.bind(this);
            this.handleSubmitproject = this.handleSubmitproject.bind(this);
            this.toggle = this.toggle.bind(this);
            this.state = {
                dropdownOpen: false
            };
            //this.getUniqueProject=this.getUniqueProject.bind(this);
        }
        toggle() {
            this.setState(prevState => ({
              dropdownOpen: !prevState.dropdownOpen
            }));
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
          handleSubmitcompleteddropdown()
          {
            
            alert("hi");
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
 
        const notcompletedtasks = this.props.tasks.tasks.filter(task=> !task.completed);
        const completedtasks = this.props.tasks.tasks.filter(task=> !task.completed);
        const task=notcompletedtasks.map((task) => {
        return (
        <ListGroupItem key={task.id}  >{task.taskdescription}
       <RenderPriority priority={task.priority}/>
       <RenderCompleted completed={task.completed} taskid={task.id} 
        postupdatetask={this.props.postupdatetask}
       />
       {/* <RenderDelete taskid={task.id} deletetask={this.props.deletetask}/> */}
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
                    <Dropdown 
                        isOpen={this.state.dropdownOpen} 
                        toggle={this.toggle}
                        >
                            <DropdownToggle color="muted" caret>
                                Tasks
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem onClick= {this.handleSubmitcompleteddropdown} >Completed</DropdownItem>
                                <DropdownItem> All Pending Tasks</DropdownItem>
                                
                            </DropdownMenu>
                        </Dropdown> 
                    </div>
                    <div className="col-10">
                        <h3>Tasks 
                        
                        <AddTaskForm postTask={this.props.postTask} />
                        </h3>
                        
                        
                        <hr/>
                        
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
