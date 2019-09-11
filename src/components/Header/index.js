import React from "react";
import "./styles.css";
import logo from "../../assets/logo-roxa-completa.png";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as AuthActions } from "../../store/ducks/auth";
import { logout } from "../../services/auth";
import { FaSignOutAlt } from "react-icons/fa";

const Header = props => {
  const handleLogout = e => {
    e.preventDefault();
    logout();
    props.notifyLogout("Até logo!");
    props.history.push("/");
  };

  return (
    <div id="header">
      <div className="header-container">
        <img src={logo} alt="logo" className="header-logo" />
        <div className="header-menu">
          <div className="option">
            <a href="#dashboard" className="effect-link">
              Dashboard
            </a>
          </div>
          <div className="option">
            <a href="#dashboard" className="effect-link">
              Cadastrar Atividade
            </a>
          </div>
          <div className="option">
            <a href="#dashboard" className="effect-link">
              Perfil
            </a>
          </div>
          <div className="option">
            <a onClick={handleLogout} href="#sair" className="effect-link">
              Sair
              <span>
                <FaSignOutAlt />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  message: state.auth.message
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(AuthActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
