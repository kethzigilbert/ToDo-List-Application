import React, { Component } from 'react';
import Task from './TaskComponent';
import Header from './HeaderComponent';
import {Switch, Redirect,Route ,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchTasks, postTask, postupdatetask, deletetask } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return{
    tasks: state.tasks,
    
    }
}

const mapDispatchToProps = dispatch => ({
  
  postTask: ( priority, author, task) => dispatch(postTask( priority, author, task)),
  fetchTasks: () => dispatch(fetchTasks()),
  postupdatetask: (id,data) => dispatch(postupdatetask(id,data)),
  deletetask: (id) => dispatch(deletetask(id))
  
  
  
});

class Main extends Component {

  
  
  
  componentDidMount(){
    
    this.props.fetchTasks();
    
  }

  render() {
   

   
   
    return (
      <div className="taskbody_background">
        <Header/>
        <Switch>
              
              <Route exact path='/task' component={() => <Task tasks={this.props.tasks} postTask={this.props.postTask}
               postupdatetask={this.props.postupdatetask} deletetask={this.props.deletetask}
               />} />
             
              <Redirect to="/task" />
          </Switch>
          
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
