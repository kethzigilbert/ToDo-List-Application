import React,{Component} from 'react';
import {Button} from 'reactstrap';

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
            return (
                
     <Button outline 
      onClick={this.toggleCheckBox}
       className="float-right btn " type="submit" >
       <span className="fa fa-check fa-sm ">Completed</span>
            
        
                                     
        </Button>
        );
            
        }
        
        else 
        {
            return(
                <Button outline 
       onClick={this.toggleCheckBox}
       className="float-right font-completed" type="submit" >
       <span className="fa fa-list fa-sm ">To Be Done</span>
            
                                     
        </Button>
            );
        }
    }
    }

export default RenderCompleted;