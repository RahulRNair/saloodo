import React, { Component } from 'react';
import { Button, Container, Row, Alert, Col, Navbar} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faArrowsAltH, faMapMarkerAlt, faUser, faTruck, faTruckLoading, faUserClock, faClock, faCaretDown } from "@fortawesome/free-solid-svg-icons";

import {  updateOrder, fetchUsers, fetchOrders } from '../actions/orderActions';
import { connect } from 'react-redux';
import { parseJwt} from '../utils/session';

library.add(faArrowsAltH, faMapMarkerAlt, faUser, faTruck, faTruckLoading, faUserClock, faClock, faCaretDown);
class DashboardPage extends Component {

  logout(){
    localStorage.removeItem('token');
    window.location.reload();
  }
  updatePickup(id){
    let status = "PICKED_UP";
    const data = {
      id, status
    };
    this.props.dispatch(updateOrder(data));
  }
  updateDelivery(id){
    let status = "DELIVERED";
    const data = {
      id, status
    };
    this.props.dispatch(updateOrder(data));
  }
  updateAssignee(id,event){
    let status = "ASSIGNED";
    let assignee_id = event.target.value;
    const data = {
      id, status, assignee_id
    };
    this.props.dispatch(updateOrder(data));
  }
  componentWillMount() {
          this.props.dispatch(fetchOrders());
          this.props.dispatch(fetchUsers());
      }

  render() {
      var data = this.props.orders;
      console.log(this.props);
      if(data){

          const token = localStorage.getItem('token');
          var userdata = '';
          if(token !== ''){
             userdata = parseJwt(token);
          }

          var items = []
          var variant = 'secondary';
          var status = 'Waiting';


          for (const [index, value] of data.entries()) {
            var time = '';
            var userList = [];
            var options = [];
            var user = '';
            userList = this.props.users;
            if(userList!==undefined && userList.length>0){
            userList.map(o => options.push(<option key={o.id} value={o.id} selected={o.id===value.assignee_id}>{o.name}</option>));
            user = <p><FontAwesomeIcon icon="user" /> <select onChange={this.updateAssignee.bind(this,value.id)} tyle={{'color':'#004085'}}>
            {options}
          </select><FontAwesomeIcon icon="caret-down" /></p>
          }
            if(value.status === 'ASSIGNED'){
              variant = 'primary';
              status = 'Assigned';
            } else if(value.status === 'PICKED_UP'){
              variant = 'warning';
              status = 'Picked Up';
            }else if(value.status === 'DELIVERED'){
              variant = 'success';
              status = 'Delivered';
            }else{
              variant = 'secondary';
              status = 'Waiting';
            }
            if(userdata.type==='manager'){
              time = <div><p><FontAwesomeIcon icon="clock" /> {value.pickup?"Picked up On "+value.pickup:' Pick Up Waiting'}</p>
              <p><FontAwesomeIcon icon="clock" /> {value.delivery?"Delivered On "+value.delivery:' Delivery Waiting'}</p></div>

            } else {
              user = '';
              if(value.status === 'ASSIGNED'){
                time = (<div><p><Button size="sm" inline type="button" variant="warning" onClick={this.updatePickup.bind(this, value.id)}><FontAwesomeIcon icon="truck-loading" /> Update PIck Up Time</Button></p>
                </div>)
              }
              if(value.status === 'PICKED_UP'){
                time = (<div><p><Button size="sm" inline type="button" variant="success" onClick={this.updateDelivery.bind(this, value.id)}><FontAwesomeIcon icon="user-clock" /> Update Delivery Time</Button></p></div>)
              }

            }
            items.push(<Alert variant={variant} key={index}>
              <p><FontAwesomeIcon icon="map-marker-alt" /> {value.origin}  <FontAwesomeIcon icon="arrows-alt-h" />  {value.destination} <FontAwesomeIcon icon="map-marker-alt" /></p>
              {user}
              <p><FontAwesomeIcon icon="truck" /> Status: {status}</p>
              {time}
              </Alert>)
          }
        }
    return (
      <Container>
      <Row>
      <Col xs lg>
      <Navbar bg="dark" variant="dark" className="justify-content-between">
        <Navbar.Brand inline>My Orders</Navbar.Brand>
        <Button inline type="button" onClick={this.logout.bind(this)}>Log Out</Button>
      </Navbar>
      <div>

      {items}
      </div>
      </Col>
      </Row>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  orders: state.order.orders,
  users:state.order.users,
  logout: state.login.logout
});

export default connect(mapStateToProps)(DashboardPage);
