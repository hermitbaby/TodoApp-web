import React from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import ListView from '../listview';
import FeedListView from '../myfeed';

import CreateTodoForm from '../create-todo-form';
import SubscribeForm from '../subscribe-form';
import Controller from '../controllers';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getMyFeed, getLists, getItems, deleteItem, selectItem, updateItem } from '../../actions/itemActions';

class Todos extends React.Component {
  
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    // isAuthenticated: PropTypes.bool,
  }

  componentDidMount () {
      this.props.getItems();
      this.props.getMyFeed();
      this.props.getLists();
  }

  onDeleteClick = id => {
      this.props.deleteItem(id);
  }
  
  state = {
    todos: [],
    isOpenTodoForm: false,
    isOpenSubForm: false,
    searchTerm: '',
    view: 'list',
    isFeed: false,
    filter: 'all'
  };

  toggleSelect = todoId => {
    const todos = this.props.item.items;
    const todo = todos.find(t => t.id === todoId);
    console.info(todo.id, todoId)
    this.props.selectItem(todoId);
  };

  toggleComplete = todoId => {
    const todos = this.props.item.items;
    const todo = todos.find(t => t.id === todoId);

    this.props.updateItem(todo.id);
  };

  toggleForm = () => {
    this.setState({
      isOpenTodoForm: !this.state.isOpenTodoForm
    });
  };

  toggleSubForm = () => {
    this.setState({
      isOpenSubForm: !this.state.isOpenSubForm
    });
  };

  toggleFeed = () => {
    this.setState({
      isFeed: !this.state.isFeed
    });
  };

  handleSearch = value => {
    this.setState({ searchTerm: value });
  };

  handleFilter = filter => {
    this.setState({ filter });
  };

  clearSelected = () => {
    const todos = this.props.item.items.filter(todo => todo.isSelect);
    
    // console.info(todos);
    todos.map(todo => {
        this.props.deleteItem(todo.id);
    });
  };

  clearCompleted = () => {
    const todos = this.props.item.items.filter(todo => todo.state === 'done');
    // console.info(todos);
    todos.map(todo => {
        this.props.deleteItem(todo.id);
    });
    
  };

  reset = () => {
    this.setState({
      filter: 'all',
      searchTerm: '',
      view: 'list',
      isOpenTodoForm: false
    });
  };

  performSearch = () => {
    return this.props.item.items.filter(todo => 
      todo.name
        .toLowerCase()
        .includes(this.state.searchTerm.toLowerCase())
    );
  };

  performFilter = todos => {
    const { filter } = this.state;
    if (filter === 'completed') {
      return todos.filter(todo => todo.state === 'done');
    } else if (filter === 'running') {
      return todos.filter(todo => todo.state !== 'done' );
    } else {
      return todos;
    }
  };

  getView = () => {
    let todos = this.performSearch();
    // console.info(todos);
    todos = this.performFilter(todos);
    const myfeed = this.props.item.feed;

    return (this.state.isFeed ? 
      <FeedListView 
        todos={myfeed}
        toggleSelect={this.toggleSelect}
        toggleComplete={this.toggleComplete}
      />
      : 
      <ListView 
        todos={todos}
        toggleSelect={this.toggleSelect}
        toggleComplete={this.toggleComplete}
      />
    )
  };

  render() {
    // const { items } = this.props.item;
        // console.info(this.props);
        // console.info(this.state);
        console.info(this.props.item);

    return (
      <div>
        <h1 className="display-4 text-center mb-5">Todo App</h1>
        
        
        <div className="d-flex">
            <Input type="switch" className="me-3" checked={this.state.isFeed}
                   onClick={ () => {
                      this.toggleFeed();
                    }} 
                   role="switch" />
            <Label className="me-3" check>My Subscribed Todos</Label>
            
            <Button color="success" className="me-3" onClick={this.toggleSubForm}>
              Subscribe
            </Button>

        </div> 

          <FormGroup>
            
          </FormGroup>
        

        <Controller 
          term={this.state.searchTerm}
          view={this.state.view}
          toggleForm={this.toggleForm}
          handleSearch={this.handleSearch}
          handleFilter={this.handleFilter}
          clearSelected={this.clearSelected}
          clearCompleted={this.clearCompleted}
          reset={this.reset}
        />
        
        <div>{this.getView()}</div>
        
        {/* create new todo item */}
        <Modal 
          isOpen={this.state.isOpenTodoForm} 
          toggle={this.toggleForm}
          >
          <ModalHeader toggle={this.toggleForm}>
            Create a New Todo Item
          </ModalHeader>
          <ModalBody>
            <CreateTodoForm toggleForm={this.toggleForm} />
          </ModalBody>
        </Modal>

                    
        {/* subscribe form */}
        <Modal 
          isOpen={this.state.isOpenSubForm} 
          toggle={this.toggleSubForm}
          >
          <ModalHeader toggle={this.toggleSubForm}>
            Subscibe todo lists
          </ModalHeader>
          <ModalBody>
            <SubscribeForm toggleForm={this.toggleSubForm} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}


const mapStateToProps = (state) => ({
  item: state.item,
  // isAuthenticated: state.auth.isAuthenticated,
});

export default connect(
  mapStateToProps,
  { 
      getItems,
      deleteItem,
      selectItem,
      updateItem,
      getMyFeed,
      getLists
  }
)(Todos);