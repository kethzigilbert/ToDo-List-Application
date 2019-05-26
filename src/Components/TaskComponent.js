import React, {Component} from 'react';
import { Control,  Errors} from 'react-redux-form';
import { ListGroup,ListGroupItem, Button,Label,Col,Form, FormGroup, ButtonGroup, Badge,Input, Card,CardText,CardSubtitle,CardBody,CardImg,CardImgOverlay,CardTitle, Breadcrumb,BreadcrumbItem,Media } from 'reactstrap';
//import {Link} from 'react-router-dom';
//import {Checkbox, CheckboxGroup} from 'react-checkbox-group';
import {Loading} from './LoadingComponent';
import AddTaskForm from './AddTaskFormComponent';
//import { baseUrl } from '../shared/baseUrl';
import NotCompletedTasks from './NotCompletedTasks';
import DisplayCheckbox from './DisplayCheckbox';
import DropdownComponent from './DropdownComponent';
import {connect} from 'react-redux';
import {fetchTasks, postTask, postupdatetask, deletetask,getprioritytask } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return{
    tasks: state.tasks,
    
    }
}

const mapDispatchToProps = dispatch => ({
  
  postTask: ( priority, author, task) => dispatch(postTask( priority, author, task)),
  fetchTasks: () => dispatch(fetchTasks()),
  postupdatetask: (id,data) => dispatch(postupdatetask(id,data)),
  getprioritytask: (data) => dispatch(getprioritytask(data)),
  deletetask: (id) => dispatch(deletetask(id))
  
  
  
});
class Task extends Component{
        constructor(props){
            super(props);
            this.handleSubmit = this.handleSubmit.bind(this);
            this.handleSubmitcompleteddropdown=this.handleSubmitcompleteddropdown.bind(this);
            this.handleclearbutton=this.handleclearbutton.bind(this);
            this.handleSubmitnoncompleteddropdown=this.handleSubmitnoncompleteddropdown.bind(this);
            //this.alterstate=this.alterstate.bind(this);
            this.state = {
                dropdownValue:"Select Action"
               
            };
           
        }
        handleSubmitcompleteddropdown() {
       
        var combinedarray = { "completed": [true] }
        this.props.getprioritytask(combinedarray)
        
        this.setState({dropdownValue : 'Completed'});
        }
        
        

        handleSubmitnoncompleteddropdown() {
    
            var combinedarray = { "completed": [false] }
            this.setState({dropdownValue : 'Pending'});
            
            this.props.getprioritytask(combinedarray)

        }
        
        handleclearbutton(){
              this.props.fetchTasks();
              //alert("Hi");
              
          }
        handleSubmit = (e) => {
            e.preventDefault();
            //alert(this.refs.value);
            //  extract the node list from the form
            //  it looks like an array, but lacks array methods
             //const { priority } = this.form;
             //alert(this.form.getElementsByTagName('project'));
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
             
             alert(combinedarray.priority);
             alert(combinedarray.project);
             
             this.props.getprioritytask(combinedarray);
          }
        
          
          componentDidMount(){
    
            this.props.fetchTasks();
            
          }
          
        
        render () {
        
        
        const completedtasks = this.props.tasks.tasks.filter(task=> !task.completed);
        
        
        
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
                        <DropdownComponent 
                        handlesubmitcompleted={this.handleSubmitcompleteddropdown}
                        handlesubmitnoncompleted={this.handleSubmitnoncompleteddropdown}
                        dropdownValue={this.state.dropdownValue} 
                        />
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
                            
                        <h6> Project </h6>
                        
                           {/* {projectcheckboxes} */}
                           <DisplayCheckbox tasks={this.props.tasks.tasks} checkboxname="project"/>
                            <input type="submit" value="Apply" />
                            
                            
                        </form>

                    </div>
                    <div className="col-10">
                        
                            <NotCompletedTasks tasks={this.props.tasks} postupdatetask={this.props.postupdatetask} deletetask={this.props.deletetask} getprioritytask={this.props.getprioritytask}/>
                        
                    </div>
                </div>
            </div>
        );
    
    }
}
    
 
export default connect(mapStateToProps,mapDispatchToProps)(Task);
