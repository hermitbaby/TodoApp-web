import React from "react";
import { Modal, ModalHeader, ModalBody } from 'reactstrap';

import ListView from '../listview';
import CreateTodoForm from '../create-todo-form';
import Controller from '../controllers';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getItems, deleteItem, selectItem, updateItem } from '../../actions/itemActions';

class Todos extends React.Component {
  
  static propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired,
    // isAuthenticated: PropTypes.bool,
  }

  componentDidMount () {
      this.props.getItems();
  }

  onDeleteClick = id => {
      this.props.deleteItem(id);
  }
  
  state = {
    todos: [],
    isOpenTodoForm: false,
    searchTerm: '',
    view: 'list',
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

    return (
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

    return (
      <div>
        <h1 className="display-4 text-center mb-5">Todo App</h1>
        
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
      updateItem
  }
)(Todos);