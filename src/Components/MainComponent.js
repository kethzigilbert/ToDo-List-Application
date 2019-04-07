import React, { Component } from 'react';
import Menu from './MenuComponent';
import Header from './HeaderComponent';
import {Switch, Redirect,Route ,withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchTasks } from '../redux/ActionCreators';

const mapStateToProps = state => {
    return{
    tasks: state.tasks,
    
    }
}

const mapDispatchToProps = dispatch => ({
  
 
    fetchTasks: () => dispatch(fetchTasks()),
  
});

class Main extends Component {

  
  
  
  componentDidMount(){
    this.props.fetchTasks();
    
  }

  render() {
   

   
   
    return (
      <div>
        <Header/>
        <Switch>
              
              <Route exact path='/menu' component={() => <Menu tasks={this.props.tasks} />} />
             
              <Redirect to="/menu" />
          </Switch>
          
      </div>
    );
  }
}


export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Main));
