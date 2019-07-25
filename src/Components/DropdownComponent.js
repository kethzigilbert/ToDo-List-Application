import React,{Component} from 'react';
import PropTypes  from 'prop-types';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap';


class DropdownComponent extends Component {
constructor(props){
    super(props);
    this.toggle = this.toggle.bind(this);
    //this.handleSubmitcompleteddropdown=this.handleSubmitcompleteddropdown.bind(this);
    //this.handleSubmitnoncompleteddropdown=this.handleSubmitnoncompleteddropdown.bind(this);
    this.state={
        dropdownOpen: false,
        //dropdownValue:"Select Action"
           
        }; 

    }

   

toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

    
render(){
    return(
        <Dropdown 
                        isOpen={this.state.dropdownOpen} 
                        toggle={this.toggle}
                        >
                            <DropdownToggle color="muted" caret>
                            {this.props.dropdownValue}
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem  onClick={()=>this.props.handleSubmitcommoncompleteddropdown("Completed")}>Completed</DropdownItem>
                                
                                <DropdownItem onClick={()=>this.props.handleSubmitcommoncompleteddropdown("Pending")}> All Pending Tasks</DropdownItem>
                                <DropdownItem onClick={this.props.handleAllTasksButton}> All Tasks</DropdownItem>
                                
                            </DropdownMenu>
        </Dropdown> 

    );
}

}

DropdownComponent.propTypes= {
        dropdownValue: PropTypes.string,
        //handlesubmitcompleted: PropTypes.func,
        //handlesubmitnoncompleted: PropTypes.func,
        handleAllTasksButton: PropTypes.func,
        handleSubmitcommoncompleteddropdown: PropTypes.func
    };


export default (DropdownComponent);