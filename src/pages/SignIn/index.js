import React, { Component } from "react";

import { Link } from "react-router-dom";
import api from "../../services/api";
import { setTokens } from "../../services/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/logo-azul-completa.png";
import "./styles.css";

import { connect } from "react-redux";

class SignIn extends Component {
  state = {
    email: "",
    password: ""
  };

  componentDidMount() {
    if (this.props.message) {
      toast.warning(this.props.message, toast.POSITION.TOP_RIGHT);
    }
  }

  handleSignIn = async e => {
    e.preventDefault();
    const { email, password } = this.state;
    if (!email || !password) {
      toast.error(
        "Preencha e-mail e senha para continuar!",
        toast.POSITION.TOP_RIGHT
      );
    } else {
      try {
        const authenticate = await api.post("/auth/sign_in", {
          email,
          password
        });
        const headers = authenticate.headers;
        setTokens(
          headers["access-token"],
          headers["uid"],
          headers["expiry"],
          headers["client"],
          headers["token-type"]
        );
        this.props.history.push("/dashboard");
      } catch (err) {
        let errors = ["Houve algum problema na autenticação!"];
        if (err.response.data.errors) {
          errors = err.response.data.errors;
        }
        toast.error(errors.join(", "), toast.POSITION.TOP_RIGHT);
      }
    }
  };

  render() {
    return (
      <section id="sign-in">
        <div className="container">
          <img src={logo} alt="logoCompletar" />
          <form onSubmit={this.handleSignIn}>
            <input
              type="email"
              placeholder="E-mail"
              onChange={e => this.setState({ email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Senha"
              onChange={e => this.setState({ password: e.target.value })}
            />

            <button type="submit">ENTRAR</button>
          </form>
          <Link to="/auth/sign_up">
            Ainda não tem conta? <b>Cadastre-se!</b>
          </Link>
        </div>
        <ToastContainer />
      </section>
    );
  }
}

const mapStateToProps = state => ({
  message: state.auth.message
});

export default connect(mapStateToProps)(SignIn);
