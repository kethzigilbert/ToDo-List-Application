import React from 'react';
import {Badge} from 'reactstrap'
const RenderPriority=  (props) => {
       
        if(props.priority=="Low")
        {
            
            return (
                <Badge color="secondary">Low</Badge>
                
             );
            
        }
        else if (props.priority=="Medium")
        {
            return(
                <Badge color="warning">Medium</Badge>
            );
        }
        else 
        {
            return(
                <Badge color="danger">High</Badge>
            );
        }
    }

export default RenderPriority;
   