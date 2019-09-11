import React, { Component } from "react";
import { logout } from "../../services/auth";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as AuthActions } from "../../store/ducks/auth";

class Dashboard extends Component {
  handleLogout = e => {
    e.preventDefault();
    logout();
    this.props.notifyLogout("Até logo!");
    this.props.history.push("/");
  };

  render() {
    return (
      <div>
        <h1>Olá</h1>
        <form onSubmit={this.handleLogout}>
          <button type="submit">Sair</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  message: state.auth.message
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
