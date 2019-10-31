import { Meteor } from 'meteor/meteor';
import { Restivus } from 'meteor/nimble:restivus';
import { CustomerRgister } from './../../api/customer'
import { RunnerRegister } from './../../api/runner'

/*
* ============================================
* @summary - created whizz rest api
* @Date - 09/10/2019
* @Version - v1.0
* @Path - whizz-api
* ============================================
*/
const WHIZZAPI = new Restivus({
  apiPath: 'whizz-api',
  version: 'v1',
  useDefaultAuth: false,
  prettyJson: true,
  enableCors: true,
  defaultHeaders: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Content-Type': 'application/json'
  },
  defaultOptionsEndpoint: {
    action: function() {
      this.response.writeHead(201, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept, Z-Key, X-Auth-Token, X-User-Id',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
      });
      this.done();
      return { status: true }
    }
  },
  onLoggedIn: () => { console.log(this.user.username + ' (' + this.userId + ') logged in') },
  onLoggedOut: () => { console.log(this.user.username + ' (' + this.userId + ') logged out') }
});

  WHIZZAPI.addRoute('register/customer', { post: { authRequired: true, action: CustomerRgister } });

  WHIZZAPI.addRoute('register/runner', { post: { authRequired: true, action: RunnerRegister } });

  WHIZZAPI.addRoute('register/runner', { post: { authRequired: true, action: RunnerRegister } });
  
  WHIZZAPI.addRoute('register/runner', { post: { authRequired: true, action: RunnerRegister } });

  // WHIZZAPI.addRoute('getUserInfo', { get: { authRequired: true, action: getUser } });
