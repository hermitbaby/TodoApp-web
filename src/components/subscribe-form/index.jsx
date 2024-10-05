import React from "react";
// import PropTypes from 'prop-types';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { connect } from 'react-redux';
import { addItem } from '../../actions/itemActions';

class SubscribeForm extends React.Component {
  state = {
    name: '',
    user: 'jack', 
    subscribe:[],
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });

  };

  handleSubChange = e => {
    this.setState({
      'subscribe': this.state.subscribe.concat(e.target.value)
    });

    // console.info(e.target.value);
  };


  onSubmit = e => {
    e.preventDefault();

    const newSub = {
        userName: this.state.user,
        subscribedLists: this.state.subscribe
    };
    // console.info(this.state, newSub);
    // this.props.addItem(newSub);
    // e.target.reset();
    this.props.toggleForm();
    this.setState({  subscribe: []});
  }


  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormGroup>
          <Label>Current User: </Label>
          <Input 
            placeholder={this.state.user}
            name="name"
            value={this.state.user}
            onChange={this.handleChange}
            disabled={true}
          />
        </FormGroup>
        
        <FormGroup>
          <Label for="SelectMulti">
            Available List to Subscribe
          </Label>
          <Input
            id="SelectMulti"
            multiple
            name="subscribe"
            type="select"
            onChange={this.handleSubChange}
          >
          
          {this.props.item.subLists.map(list => (
             <option key={list.id}>{list.id}</option>
          ))}

          </Input>
        </FormGroup>

        <Button type="submit">Subscribe</Button>
      </Form>
    );
  }
}

SubscribeForm.propTypes = {
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
)(SubscribeForm);