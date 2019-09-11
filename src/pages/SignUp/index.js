import React, { Component } from "react";
import { Link } from "react-router-dom";
import api from "../../services/api";
import { setTokens } from "../../services/auth";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import logo from "../../assets/logo-azul-completa.png";
import "./styles.css";

class SignUp extends Component {
  state = {
    email: "",
    password: "",
    password_confirmation: ""
  };

  handleSignUp = async e => {
    e.preventDefault();
    console.log(this.props);
    const { email, password, password_confirmation } = this.state;
    if (!email || !password || !password_confirmation) {
      toast.error(
        "Preencha e-mail, senha e confirmação de senha para continuar!",
        { position: toast.POSITION.TOP_RIGHT }
      );
    } else {
      try {
        await api.post("/auth", { email, password, password_confirmation });
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
        let errors = ["Houve algum problema"];
        if (err.response.data.errors.full_messages) {
          errors = err.response.data.errors.full_messages;
        }
        toast.error(errors.join(", "), { position: toast.POSITION.TOP_RIGHT });
      }
    }
  };

  render() {
    return (
      <section id="sign-up">
        <div className="container">
          <img src={logo} alt="logoCompletar" />
          <h3>Cadastre-se já!</h3>
          <form onSubmit={this.handleSignUp}>
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
            <input
              type="password"
              placeholder="Confirmação de senha"
              onChange={e =>
                this.setState({ password_confirmation: e.target.value })
              }
            />

            <button type="submit">CADASTRAR</button>
          </form>
          <Link to="/auth/sign_in">Entrar</Link>
        </div>
        <ToastContainer />
      </section>
    );
  }
}

export default SignUp;
