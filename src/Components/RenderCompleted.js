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

export default RenderCompleted;