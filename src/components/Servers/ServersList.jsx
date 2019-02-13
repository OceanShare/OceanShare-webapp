import React, { Component } from "react";
import { PanelHeader, DashBoardHeader, DashBoardBody } from '..';
import { Card, CardHeader, Row, Col, Button} from 'reactstrap';
import UserService from "../../services/user-service.jsx"

function showError(id, txt) {
  document.getElementById(id).style.display = "block";
  document.getElementById(id).innerHTML=txt;
}

function closeModal(id) {
  document.getElementById(id).style.display = "none";
}

class ServersList extends Component {
  constructor(props) {
    super(props)
    this.state = {
      servers: false,
      SearchIt: ''
    }
  }

  componentDidMount() {
    this.loadServer();
    this.getServer();
    // this.getServerAlphaSort();
  }

  listSearchServer = (res) => {
    var serversState = []
    UserService.searchServer(res).then((servers) => {
      console.log(servers);
      servers.forEach((line) => {
        serversState.push(line)
      })
      console.log(serversState);
      this.setState({serversbase: serversState, servers: serversState})
    })
  }

  loadServer = () => {
    var serversState = []
    UserService.loadServerHetzner().then((servers) => {
      console.log(servers);
      servers.forEach((line) => {
        serversState.push(line)
      })
      console.log(serversState);
      this.setState({serversbase: serversState, servers: serversState})
    })
  }

  getServer = () => {
    var serversState = []
    UserService.getServerHetzner().then((servers) => {
      servers.forEach((line) => {
        serversState.push(line)
      })
      console.log(serversState);
      this.setState({serversbase: serversState, servers: serversState})
    })
  }

  OnClickSortIp = () => {
    var serversState = []
    UserService.getServerHetznerOrderIp().then((servers) => {
      servers.forEach((line) => {
        serversState.push(line)
      })
      console.log(serversState);
      this.setState({serversbase: serversState, servers: serversState})

    })
  }

  OnClickSortName = () => {
    var serversState = []
    UserService.getServerHetznerAlpha().then((servers) => {
      servers.forEach((line) => {
        serversState.push(line)
      })

      this.setState({serversbase: serversState, servers: serversState})
    })
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    var serversState = []

    const { SearchIt } = this.state;
    UserService.searchServer(SearchIt).then((servers) => {
      if (servers.length === 0) {
        showError("errorResearch","No results found.")
        servers.forEach((line) => {
          serversState.push(line)
        })
        this.setState({serversbase: serversState, servers: serversState})  
      }
      else if (servers.length > 0) {
        
        closeModal("errorResearch")
        servers.forEach((line) => {
          serversState.push(line)
        })
        this.setState({serversbase: serversState, servers: serversState})
      }
    })
  }

  OnClickRefresh = () => {
    this.loadServer();
    this.getServer();

  }


  render() {
      return (
        <div>
        <PanelHeader size="sm"/>
        <div className="container-fluid">
        <Row>
        <Col md={12}>
        <Card style={{marginTop: '-30px'}}>
        <CardHeader>
        <h5 className="card-title text-center" style={{fontWeight: "bold"}}>Crealytics Home</h5>
        <hr></hr>
        <div className="container">
          <Row>
            <Col xs={12} sm={6}>
              <form onSubmit={this.onSubmit}>
                <div className="input-group">
                  <input  className="form-control"
                          placeholder="Search"
                          name="SearchIt"
                          style={{marginTop: "2%", height: '36px'}}
                          value={this.state.SearchIt}
                          onChange={this.onChange}
                      />

                    <div className="input-group-append">
                      <button className="btn btn-outline-secondary" type="submit">Research</button>
                    </div>
                </div>
              </form>
            </Col>
            <Col xs={12} sm={2}>
              <Button className="btn-block" onClick={() => this.OnClickSortName()}>Server Name</Button>
            </Col>
            <Col xs={12} sm={2}>
                <Button className="btn-block" onClick={() => this.OnClickSortIp()}>IP</Button>
            </Col>
            <Col xs={12} sm={2}>
              <Button className="btn-block" onClick={() => this.OnClickRefresh()}>Refresh servers list</Button>
            </Col>
            <Col xs={12}>
            <div style={{display: "none"}} id="errorResearch" className="alert alert-info" role="alert" value={'error'}>
            
            </div>
            </Col>
          </Row>
          </div>
        <hr></hr>
        <DashBoardHeader/>
        <div id="info" style={{display: "none"}} className="alert alert-info" role="alert"></div>
        <DashBoardBody servers={this.state.servers}/>
        </CardHeader>
        </Card>
        </Col>
        </Row>
        <Row>
        <Col md={12}>
        </Col>
        </Row>
        </div>

        </div>
      );
  }
}

export default ServersList;
