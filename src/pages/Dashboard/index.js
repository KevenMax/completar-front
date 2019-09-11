import React, { Component } from "react";
import Header from "../../components/Header";

class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header history={this.props.history} />
      </div>
    );
  }
}

export default Dashboard;
