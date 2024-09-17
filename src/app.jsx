import React, { Component } from 'react';
import { Provider } from 'react-redux';


import { Container, Row, Col } from 'reactstrap';

import Todos from './components/todos';

import store from './store';

// import { getItems } from './actions/itemActions';


class App extends Component {

  componentDidMount () {
  }

  render () {
    return <Provider store={store}>
     <Container className="my-3">
      <Row>
        <Col>

          <Todos />
        </Col>
      </Row>
    </Container>
  </Provider>;
  }
}

export default App;

