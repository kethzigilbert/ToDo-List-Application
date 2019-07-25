import React, {Component} from 'react';
import {label} from 'reactstrap';
class DisplayCheckbox extends Component
{
    constructor(props){
        super(props)

    }
    

    render(){
        function getUniqueProject(data,property){
        
            var lookup = {};
            var items = data;
            var result = [];
            
            for (var item, i = 0; item = items[i++];) {
              var name = item[property];
            
              if (!(name in lookup)) {
                lookup[name] = 1;
                result.push(name);
              }
            }
            return result;
          }
    const result= getUniqueProject(this.props.tasks,this.props.checkboxname);
  
    const projectcheckboxes= result.map((property)=>{
        return(
            <div className="col-12">
                    <label>
                    <input type="checkbox" value={property} name={this.props.checkboxname} />
                        {property}
                    </label>
            </div>
        );
    })

        return(
            <div className="checkbox-size">
            {projectcheckboxes}
            </div>
        );
    }
}

export default DisplayCheckbox;


