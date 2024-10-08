import React from "react";
import PropTypes from 'prop-types';
import { ButtonGroup, Button } from 'reactstrap';

const FilterController = ({ handleFilter }) => (
  <ButtonGroup>
    <Button onClick={() => handleFilter('all')} 
      color='primary'>All</Button>
    <Button onClick={() => handleFilter('running')}
      color='warning'>Running</Button>
    <Button onClick={() => handleFilter('completed')} 
    color='success'>Completed</Button>
  </ButtonGroup>
);

FilterController.propTypes = {
  handleFilter: PropTypes.func.isRequired
};

export default FilterController;