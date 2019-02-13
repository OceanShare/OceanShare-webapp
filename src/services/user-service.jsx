import { createBrowserHistory } from 'history';
const history = createBrowserHistory();
const axios = require('axios');
// const API_ENDPOINT = "http://35.242.196.217:5000/api"
const API_ENDPOINT = "http://0.0.0.0:5000/api"

const config = {
  crossdomain: true
};

export default class UserService {


  static async getServerHetznerAlpha() {
    var token = localStorage.getItem('token')
    return axios.get(API_ENDPOINT + '/hetzner/alphaServer', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        return (response.data.server_data)
      }).catch((error) => {
        console.log(error)
        return (error)
      })
  }

  static async getServerHetznerOrderIp() {

    var token = localStorage.getItem('token')
    return axios.get(API_ENDPOINT + '/hetzner/orderIp', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {

        return (response.data.server_data)
      }).catch((error) => {
        console.log(error)
        return (error)
      })

  }

  static async getServerGCPOrderIp() {
    var token = localStorage.getItem('token')
    return axios.get(API_ENDPOINT + '/gcp/orderIp', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {

        return (response.data.gcp)
      }).catch((error) => {
        console.log(error)
        return (error)
      })
  }

  static async changeEmail(Email, NewEmail) {
    var token = localStorage.getItem('token')
    return axios.put(API_ENDPOINT + '/user/update', { "email": Email, "newemail": NewEmail }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response)
        return (response.data)
      }).catch((error) => {
        console.log(error)
        return (error)
      })

  }

  static async resetPassword(Password, Newpassword) {
    // console.log("email:" +localStorage.getItem("email").toString()+"\npass:" + Password + "\nNP:" + Newpassword)
    var token = localStorage.getItem('token')
    return axios.put(API_ENDPOINT + '/user/resetPassword', { "password": Password, "newPassword": Newpassword }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        return response.data
      }).catch((error) => {
        console.log(error)
        return error
      })

  }


  static async login(email, password) {
    return axios.post(API_ENDPOINT + '/user/login', { "email": email, "password": password }, config)
      .then((response) => {
        if (response.data.status === true) {
          localStorage.setItem('token', response.data.users.token);
          localStorage.setItem('email', email);
          localStorage.setItem('role', response.data.users.Role);
          console.log(response.data.users.Role)
          history.push('/servers')
          window.location.reload()
        }
        return response.data
      }).catch((error) => {
        console.log(error)
        return error
      })
  }

  static async register(email, password) {
    return axios.post(API_ENDPOINT + '/user/new', { "email": email, "password": password }, config)
      .then((response) => {
        if (response.data.status === true) {
          localStorage.setItem('token', response.data.users.token);
          localStorage.setItem('email', email);
          localStorage.setItem('role', response.data.users.Role);
          history.push('/servers')
          window.location.reload()
        }
        return response.data
      }).catch((error) => {
        console.log(error)
        return (error)
      })
  }

  static async getAllServers() {

    var token = localStorage.getItem('user')
    return axios.get(API_ENDPOINT + '/server/list', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        return response.data.server_data
      }).catch((error) => {
        console.log(error)
        return error
      })
  }

  static async getServerHetzner() {

    var token = localStorage.getItem('token')
    return axios.get(API_ENDPOINT + '/hetzner/list', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        return response.data.data
      }).catch((error) => {
        console.log(error)
        return error
      })

  }

  static async loadServerHetzner() {

    var token = localStorage.getItem('token')
    return axios.get(API_ENDPOINT + '/hetzner/load', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        console.log(response)
        return response.data.data
      }).catch((error) => {
        console.log(error)
        return (error)
      })
  }

  static async loadServerGCP() {
    var token = localStorage.getItem('token')
    return axios.get(API_ENDPOINT + '/gcp/load', { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        return response.data.gcp
      }).catch((error) => {
        console.log(error)
        return (error)
      })

  }

  static async searchServer(server) {
    var token = localStorage.getItem('token')
    return axios.post(API_ENDPOINT + '/hetzner/getResearch', { "server_name": server }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        return (response.data.data)
      }).catch((error) => {
        console.log(error)
        return (error)
      })
  }

  static async setAcl(email) {
    var token = localStorage.getItem('token')
    return axios.post(API_ENDPOINT + '/user/setacl', { "email": email }, { headers: { Authorization: `Bearer ${token}` } })
      .then((response) => {
        return (response.data.status)
      }).catch((error) => {
        console.log(error)
        return (error)
      })
  }
}
