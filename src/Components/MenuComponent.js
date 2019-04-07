import React from 'react';
import { Card,CardText,CardSubtitle,CardBody,CardImg,CardImgOverlay,CardTitle, Breadcrumb,BreadcrumbItem,Media } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Loading} from './LoadingComponent';
//import { baseUrl } from '../shared/baseUrl';


const Menu = (props) => {

    
        const task=props.tasks.tasks.map((task) => {
            return (
                <div key={task.id} className="col-12 mt-5">
                <Card>
        
            <CardBody>
            <CardTitle>{task.comment}</CardTitle>
            <CardSubtitle>Card subtitle</CardSubtitle>
            <CardText>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
          
            </CardBody>
      </Card>
                
              </div>
            );
        });
        if (props.tasks.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.tasks.errMess) {
            return(
                <div className="container">
                    <div className="row"> 
                        <div className="col-12">
                            <h4>{props.tasks.errMess}</h4>
                        </div>
                    </div>
                </div>
            );
        }
        else
        return(
            <div className="container">
            <div className="row">
            
           
            <div className="col-12">
                        <h3>Tasks</h3>
                        <hr />
            </div>     
            
            </div>
            <div className="row">
            
            {task}
            
            </div>
            
            </div>


        );
    

}

        
 



export default Menu;
