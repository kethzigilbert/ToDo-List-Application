import React, { Component } from 'react';
import Task from './TaskComponent';
import Header from './HeaderComponent';
import {Switch, Redirect,Route ,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchTasks, postTask } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return{
    tasks: state.tasks,
    
    }
}

const mapDispatchToProps = dispatch => ({
  
  postTask: ( priority, author, task) => dispatch(postTask( priority, author, task)),
    fetchTasks: () => dispatch(fetchTasks()),
  
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
              
              <Route exact path='/task' component={() => <Task tasks={this.props.tasks} postTask={this.props.postTask}/>} />
             
              <Redirect to="/task" />
          </Switch>
          
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
