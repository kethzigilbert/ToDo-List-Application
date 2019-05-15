import React, {Component} from 'react';
import {Button} from 'reactstrap';

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

export default RenderDelete