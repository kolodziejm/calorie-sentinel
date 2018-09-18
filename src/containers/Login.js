import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import fire from '../fire';
import { connect } from 'react-redux';

import { MdAccountBox, MdLock } from 'react-icons/md';

import Background from '../components/Background';
import Form from '../components/Form';
import LogoHeader from '../components/LogoHeader';
import InputWithIcon from '../components/ui/inputs/InputWithIcon';
import ButtonFull from '../components/ui/buttons/ButtonFull';
import Link from '../components/navigation/Link';
import Error from '../components/ui/Error';

import * as actions from '../store/actions';


class Login extends Component {

  state = {
    email: '',
    password: '',
    error: ''
  }

  inputChangedHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  login = (e) => {
    e.preventDefault();

    if (this.state.email === '' || this.state.password === '') {
      return;
    }

    fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        this.props.onLoadingStart();
        localStorage.setItem('uid', res.user.uid);
      })
      .catch(err => {
        console.log(err)

        this.setState({error: err.message});
        setTimeout(() => {
          this.setState({error: ''})
        }, 5000)
      });
  }

  render() {
    return (
      <Background>
        <Form>
            <LogoHeader src={require('../assets/images/Logo 1.jpg')} margin="0 auto 5rem auto"/>
            <Error margin="0 0 1rem 0">{this.state.error}</Error>
            <InputWithIcon changed={this.inputChangedHandler} value={this.state.email} name="email" type="email" required placeholder="Email" margin="0 0 2.4rem 0" icon={<MdAccountBox fill="#F6511D"/>}/>
            <InputWithIcon changed={this.inputChangedHandler} value={this.state.password} name="password" type="password" required placeholder="Password" margin="0 0 2.4rem 0" icon={<MdLock fill="#F6511D"/>}/>
            <ButtonFull onClick={this.login} margin="0 0 2.4rem 0">Login</ButtonFull>
            <Link to="/register">Create Account</Link>
        </Form>
      </Background>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLoadingStart: () => dispatch(actions.loadingStart())
  }
}

export default withRouter(connect(null, mapDispatchToProps)(Login));