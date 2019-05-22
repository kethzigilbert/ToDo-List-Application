import React, {Component} from 'react';
import {  Jumbotron } from 'reactstrap';
//import {NavLink} from 'react-router-dom';
class Header extends Component{

    constructor(props){
        super(props);

        this.state={
            isNavOpen:false,
            

        }
        this.toggleNav=this.toggleNav.bind(this);
        
   
    }
    toggleNav()
    {
        this.setState({
            isNavOpen: !this.state.isNavOpen
        });
    }

   

    render(){
        return(
            <React.Fragment>
                
                <Jumbotron className="bg-dark text-white">
                    <div className="container">
                        <div className="row row-header">
                            <div className="col-12 col-sm-6">
                            <h1>To Do List Application </h1>
                            
                            </div>

                        </div>
                    </div>
                </Jumbotron>
                
            </React.Fragment>
        );

    }
}

export default Header;