import React, {Component} from 'react';
import { Control,  Errors} from 'react-redux-form';
import { ListGroup,ListGroupItem, Button,Label,Col,Form, FormGroup, ButtonGroup, Badge,Input, Card,CardText,CardSubtitle,CardBody,CardImg,CardImgOverlay,CardTitle, Breadcrumb,BreadcrumbItem,Media } from 'reactstrap';
//import {Link} from 'react-router-dom';
//import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {Loading} from './LoadingComponent';
import AddTaskForm from './AddTaskFormComponent';
//import { baseUrl } from '../shared/baseUrl';
import DisplayTasks from './DisplayTasks';
import DisplayCheckbox from './DisplayCheckbox';
import DropdownComponent from './DropdownComponent';
import {connect} from 'react-redux';
import {fetchTasks, postTask, postupdatetask, deletetask,getfilteredtask } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return{
    tasks: state.tasks,
    
    }
}

const mapDispatchToProps = dispatch => ({
  
  //postTask: ( priority, author, task) => dispatch(postTask( priority, author, task)),
  fetchTasks: () => dispatch(fetchTasks()),
  postupdatetask: (id,data) => dispatch(postupdatetask(id,data)),
  getfilteredtask: (data) => dispatch(getfilteredtask(data)),
  deletetask: (id) => dispatch(deletetask(id))
  
  
  
});
class Task extends Component{
        constructor(props){
            super(props);
            this.handleSubmit = this.handleSubmit.bind(this);
            //this.handleSubmitcompleteddropdown=this.handleSubmitcompleteddropdown.bind(this);
            this.handleclearbutton=this.handleclearbutton.bind(this);
            //this.handleSubmitnoncompleteddropdown=this.handleSubmitnoncompleteddropdown.bind(this);
            this.handleSubmitcommoncompleteddropdown=this.handleSubmitcommoncompleteddropdown.bind(this);
            this.handleAllTasksButton=this.handleAllTasksButton.bind(this);
            this.state = {
                dropdownValue:"Select Action"
               
            };
           
        }
        // handleSubmitcompleteddropdown() {
       
        // var combinedarray = { "completed": [true] }
        // this.props.getfilteredtask(combinedarray)
        
        // this.setState({dropdownValue : 'Completed'});
        // }
        
        

        // handleSubmitnoncompleteddropdown() {
    
        //     var combinedarray = { "completed": [false] }
        //     this.setState({dropdownValue : 'Pending'});
            
        //     this.props.getfilteredtask(combinedarray)

        // }
        handleSubmitcommoncompleteddropdown(value) {
            if(value==="Pending"){
                var combinedarray = { "completed": [false] }
                this.setState({dropdownValue : 'Pending'});
            }
            else if(value==="Completed")
            {
                var combinedarray = { "completed": [true] }
                this.setState({dropdownValue : 'Completed'});
            }
            
            
            this.props.getfilteredtask(combinedarray)

        }
        handleAllTasksButton(){
            this.setState({dropdownValue : 'All Tasks'});
            this.props.fetchTasks();
            //alert("Hi");
            
        }
        handleclearbutton(){
              this.props.fetchTasks();
              //alert("Hi");
              
          }

        handleSubmit = (e) => {
            e.preventDefault();
            
             var combinedarray = {};
             var lookup=[];
             for ( var i=0; i< this.form.length; i++)
             {  
                 var item= this.form[i];
                 if(item.checked == true)
                 {
                 if(!(lookup.includes(item.name)))
                 {
                    lookup.push(item.name)
                    combinedarray[item.name]= [];
                 }
                 combinedarray[item.name].push(item.value);
                 }
                  
             }
             
             //alert(combinedarray.priority);
             //alert(combinedarray.project);
             
             this.props.getfilteredtask(combinedarray);
          }
        
          
          componentDidMount(){
            
                this.props.fetchTasks();
            
            
            
            
          }
          
        
        render () {
                var completedtasks;
                if(this.state.dropdownValue==="Pending"){
                  completedtasks = this.props.tasks.tasks.filter(task=> !task.completed);
                 }
                 else if (this.state.dropdownValue==="Completed"){
                 completedtasks = this.props.tasks.tasks.filter(task=> task.completed);
                }
                else {
                 completedtasks = this.props.tasks.tasks;
                }

        
        
        
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
                    <div className="col-2 col-sm-2 col-md-3">
                        <DropdownComponent 
                        //handlesubmitcompleted={this.handleSubmitcompleteddropdown}
                        //handlesubmitnoncompleted={this.handleSubmitnoncompleteddropdown}
                        handleSubmitcommoncompleteddropdown={this.handleSubmitcommoncompleteddropdown}
                        handleAllTasksButton={this.handleAllTasksButton}
                        dropdownValue={this.state.dropdownValue} 
                        />
                    </div>
                    <div className="col-10 col-sm-10 col-md-9">
                        <h3>Tasks 
                        
                        <AddTaskForm //postTask={this.props.postTask}
                         />
                        </h3>
                        
                        
                        <hr/>
                        
                    </div>
                </div>
                <div className="row" >
                    <div className="col-2 col-sm-2 col-md-3">
                        <div>
                        <h5 className="heading_inline"> Filters</h5>
                        <Button color='link' className="clear_float" onClick={this.handleclearbutton}>Clear</Button>
                        </div>
                        <br/>
                   
                        <h6> Priority </h6>
                        <form
                            onSubmit={this.handleSubmit}
                            ref={form => this.form = form}
                            >
                           
                            <DisplayCheckbox tasks={this.props.tasks.tasks} checkboxname="priority"/>
                            
                        <h6> Category </h6>
                        
                           {/* {projectcheckboxes} */}
                           <DisplayCheckbox tasks={this.props.tasks.tasks} checkboxname="category"/>
                            <input type="submit" value="Apply" />
                            
                            
                        </form>

                    </div>
                    <div className="col-10 col-sm-10 col-md-9">
                        
                            <DisplayTasks tasks={completedtasks} postupdatetask={this.props.postupdatetask} deletetask={this.props.deletetask} getfilteredtask={this.props.getfilteredtask}/>
                        
                    </div>
                </div>
            </div>
        );
    
    }
}
    
 
export default connect(mapStateToProps,mapDispatchToProps)(Task);
