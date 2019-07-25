import React, { Component } from 'react';
import Task from './TaskComponent';
import Header from './HeaderComponent';
import Footer from './FooterComponent';
import {Switch, Redirect,Route ,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchTasks, postTask, postupdatetask, deletetask,getprioritytask } from '../redux/ActionCreators';

// const mapStateToProps = state => {
//     return{
    
    
//     }
// }

// const mapDispatchToProps = dispatch => ({
  
//   // postTask: ( priority, author, task) => dispatch(postTask( priority, author, task)),
//   //fetchTasks: () => dispatch(fetchTasks()),
//   // postupdatetask: (id,data) => dispatch(postupdatetask(id,data)),
//   // getprioritytask: (data) => dispatch(getprioritytask(data)),
//   // deletetask: (id) => dispatch(deletetask(id))
  
  
  
// });

class Main extends Component {

  

  render() {
   

   
   
    return (
      <div className="taskbody_background">
        <Header/>
        <Switch>
              
              <Route exact path='/task' component={() => <Task 
              // postTask={this.props.postTask}
              //  postupdatetask={this.props.postupdatetask} deletetask={this.props.deletetask} getprioritytask={this.props.getprioritytask}
              //  fetchTasks={this.props.fetchTasks}
               />}
                />
             
              <Redirect to="/task" />
          </Switch>
          <br/>
          <Footer/>
      </div>
    );
  }
}


//export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
export default withRouter(Main);
