import React, { Component } from 'react';
import {  Button,  Modal, ModalHeader, ModalBody, Row,Col, Label} from 'reactstrap';

import {connect} from 'react-redux';
import {postTask} from '../redux/ActionCreators';

import { Control, LocalForm, Errors} from 'react-redux-form';
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);

const mapStateToProps = state => {
    return{
    tasks: state.tasks,
    
    }
}

const mapDispatchToProps = dispatch => ({
  
  postTask: ( priority, author, task, category) => dispatch(postTask( priority, author, task, category)),
  
  
  
  
});
class AddTaskForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        }
    this.toggleModal = this.toggleModal.bind(this);
   
    this.handleSubmit = this.handleSubmit.bind(this);
    }
   
    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
      }
   
    handleSubmit(values) {
        this.toggleModal();
        alert('Current State is: ' + JSON.stringify(values));
        this.props.postTask(values.priority, values.name, values.taskdescription,values.category);
       
    }
    
    render(){
        return(
        <React.Fragment>
        <Button outline onClick={this.toggleModal} className="float-right" type="submit" color="secondary">
        <span className="fa fa-pencil fa-lg"></span>
                                Add Task
        </Button>


         <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Add Task</ModalHeader>
                <ModalBody>
                <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                    <Row className="form-group">
                        <Label htmlFor="priority" md={12}>Priority</Label>
                            
                            <Col>
                                <Control.select model=".priority" name="priority"
                                className="form-control" defaultValue="Low">
                                    <option >Low</option>
                                    <option>Medium</option>
                                    <option>High</option>
                                   
                                    
                                </Control.select>
                            </Col>
                    </Row>
                    <Row className="form-group">
                            <Label htmlFor="name" md={12}>Your name</Label>
                            <Col>
                                <Control.text model=".name" id="name" name="name"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)}}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".name"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 3 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} />
                                
                            </Col>

                        </Row>
                        
                        
                        <Row className="form-group">
                            <Label htmlFor="taskdescription" md={12}>Task </Label>
                            <Col >
                                <Control.textarea model=".taskdescription" id="taskdescription" name="taskdescription"
                                    rows="6" className="form-control"></Control.textarea>
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="category" md={12}>Task </Label>
                            <Col >
                            <Control.text model=".category" id="category" name="category"
                                    placeholder="Category"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)}}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".category"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 3 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }} />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Col md={{size: 10}}>
                                <Button type="submit" color="primary">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </LocalForm>
                </ModalBody>
            </Modal>
            </React.Fragment>
        );
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(AddTaskForm);