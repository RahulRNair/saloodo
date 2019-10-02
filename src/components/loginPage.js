import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/authenticationActions';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';

class LoginPage extends Component {
  onHandleLogin = (event) => {
    event.preventDefault();

    let username = event.target.username.value;
    let password = event.target.password.value;

    const data = {
      username, password
    };

    this.props.dispatch(login(data));
  }
  render() {

    let isSuccess, message;
    if (this.props.response.login.hasOwnProperty('login_resp')) {
      isSuccess = this.props.response.login.login_resp.success;
      message = this.props.response.login.login_resp.message;

      if (isSuccess) {
        localStorage.setItem('token', this.props.response.login.login_resp.token);
      }
    }

    return (
      <Container>
      <Row>
      <Col xs lg>
      <div id="login">
        <h3>Login Page</h3>
        {!isSuccess ? <div style={{'color':'red'}}>{message}</div> : <Redirect to='dashboard' />}
        <Form onSubmit={this.onHandleLogin}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control type="text" placeholder="Enter Username" name="username" id="username"/>
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" name="password" id="password" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form>
      </div>
      </Col>
      </Row>
      </Container>

    );
  }
}

//const mapStateToProps = (response) => ({response});

const mapStateToProps = state => ({
  response: state
});

export default connect(mapStateToProps)(LoginPage);
