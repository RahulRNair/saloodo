let express = require('express');
const bodyParser = require('body-parser');
let jwt = require('jsonwebtoken');
let config = require('./config');
let middleware = require('./middleware');
let data = require('./data.json');
let users = require('./users.json');
var _ = require('lodash');
const fs = require('fs');
var cors = require('cors')


class HandlerGenerator {
  login (req, res) {
    let username = req.body.username;
    let password = req.body.password;
    let user = _.find(users, { 'username': username, 'password': password });
    if (username && password && user) {
      if (username === user.username && password === user.password) {
        let token = jwt.sign({username: username, type:user.user_type, userid: user.id},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        // return the JWT token for the future API calls
        res.json({
          success: true,
          message: 'Authentication successful!',
          token: token
        });
      } else {
        res.json({
          success: false,
          message: 'Incorrect username or password'
        });
      }
    } else {
      res.json({
        success: false,
        message: 'Authentication failed! Please check the request'
      });
    }
  }
  index (req, res) {
    res.json({
      success: true,
      message: 'Index page'
    });
  }
}
let app = express();
app.use(bodyParser.urlencoded({ // Middleware
    extended: true
  }));
app.use(cors());
  app.use(bodyParser.json());
// Setup server port
var port = process.env.PORT || 8080;
// Send message for default URL
let handlers = new HandlerGenerator();
/*
 * Login API
 * Request param : username and password
 * Auth Token will return on successful login
 */
app.post('/api/login', handlers.login);

/*
 * List All Orders based on user type(Manager or Biker)
 * Api is respond based on the token
 * if usertype is manager list all the orders
 * if usertype is biker list order assigned to that biker
 */
app.get('/api/orders',middleware.checkToken, (req, res) => {

  let respond_data = [];
  if(req.decoded.type === 'manager'){
    respond_data = data;
    var arrResult = _.map(data, function(obj) {
    return _.assign(obj, _.find(users, {
        id: obj.assignee_id
    }));
});
    return res.send(arrResult);
  } else {
    let id = req.decoded.userid;

    let respond = _.filter(data, { 'assignee_id': id });
    return res.send(respond);

  }

});

/*
 * List All users
 * Api is respond based on the token
 * if usertype is manager list all the orders
 * if usertype is biker users list will be empty
 */
app.get('/api/users',middleware.checkToken, (req, res) => {

  let respond_data = [];
  if(req.decoded.type === 'manager'){
    respond_data = users;
    return res.send(respond_data);
  } else {
    return res.send(respond_data);

  }

});

/*
 * Update Order data
 * @param id : id of the order
 * @param status : status of order
 * @ param assignee_id : id of Assignee to deleiver the order
 * delivery and pick up date and time will be update based on the status user is submitting
 *
 */

app.post('/api/updateorders',middleware.checkToken, (req, res) => {
  let respond_data = [];
  let response = {};
  let assignee_id = req.decoded.userid;
  let id = req.body.id;
  let status = req.body.status;
  let assigneeid = req.body.assignee_id;
  let updatedata = _.find(data, { 'id': id });
  if(updatedata){
      var today = new Date();
      var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      var dateTime = date+' '+time;

      updatedata.status = status ? status : updatedata.status;
      updatedata.assignee_id = assigneeid ? assigneeid : updatedata.assignee_id;
      if(status ==='PICKED_UP'){
        updatedata.pickup = dateTime;
      }
      if(status ==='DELIVERED'){
        updatedata.delivery = dateTime;
      }
      const jsonString = JSON.stringify(data);
      fs.writeFile('./data.json', jsonString, err => {
        if (err) {
            response = {"status": "failed", "data":{"msg":"Updated failed"}}
            return res.send(response);
        } else {
          let id = req.decoded.userid;
          let respond = _.filter(data, { 'assignee_id': id });
          if(req.decoded.type === 'manager'){

            respond_data = data;
          }else{
            respond_data = respond;
          }


            response = {"status": "success", "data":{"msg":"Data Updated Successfully"}}
            return res.send(respond_data);
        }
    })
  }else{
    response = {"status": "failed", "data":{"msg":"Updated failed"}}
    return res.send(response);
  }

});

// Launch app to listen to specified port
app.listen(port, function () {
     console.log("Running Server on port " + port);
});
