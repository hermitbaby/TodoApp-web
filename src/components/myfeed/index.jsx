import React from "react";
import PropTypes from 'prop-types';
import { ListGroup, ListGroupItem, Input, Button } from 'reactstrap';

// List Item Component (Child Component/Helper Component/Supportive Component)
const ListItem = ({ todo, toggleSelect, toggleComplete }) => {
  return (
    <ListGroupItem className="d-flex align-items-center">
      <Input 
        type="checkbox"
        id={todo.id}
        checked={todo.isSelect}
        onChange={() => toggleSelect(todo.id)}
        disabled={true}
      />
      <div className="mx-3" >
        <h4>{todo.name}</h4>  
        <p>{todo.description}</p>
        <span>{todo.createdDate}</span>
      </div>
      <Button 
        className="ms-auto" 
        color={todo.state === 'done' ? 'success' : 'warning'} 
        onClick={() => toggleComplete(todo.id)}
        disabled={true}
      >
        {todo.state === 'done' ? 'Completed' : 'Running'}
      </Button>
    </ListGroupItem>
  );
};

ListItem.propTypes = {
  todo: PropTypes.object.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired
};

// List View Component (Main Component)
const FeedListView = ({ todos, toggleSelect, toggleComplete }) => {
  return (
    <ListGroup>
      {todos.map(todo => (
        <ListItem 
          key={todo.id}
          todo={todo}
          toggleSelect={toggleSelect}
          toggleComplete={toggleComplete}
        />
      ))}
    </ListGroup>
  );
};

FeedListView.propTypes = {
  todos: PropTypes.array.isRequired,
  toggleSelect: PropTypes.func.isRequired,
  toggleComplete: PropTypes.func.isRequired
};

export default FeedListView;