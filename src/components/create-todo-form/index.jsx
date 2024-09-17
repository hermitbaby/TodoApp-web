import React from "react";
// import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { connect } from 'react-redux';
import { addItem } from '../../actions/itemActions';

class CreateTodoForm extends React.Component {
  state = {
    name: '',
    description: ''
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };


  onSubmit = e => {
    e.preventDefault();
    const newItem = {
        name: this.state.name,
        description: this.state.description
    }
    this.props.addItem(newItem);
    // e.target.reset();
    this.props.toggleForm();
    this.setState({ name: '', description: '' });
  }


  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label>Task Name: </Label>
          <Input 
            placeholder=""
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
        </FormGroup>
        <FormGroup>
          <Label>Task Description</Label>
          <Input 
            type="textarea"
            placeholder=""
            name="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
        </FormGroup>
        <Button type="submit">Create Task</Button>
      </Form>
    );
  }
}

CreateTodoForm.propTypes = {
  // createTodo: PropTypes.func.isRequired
};


const mapStateToProps = state => ({
  item: state.item,
});

export default connect(
  mapStateToProps,
  { 
      addItem,
  }
)(CreateTodoForm);