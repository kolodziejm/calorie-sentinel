import React, { Component } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import fire from '../fire';

import * as actions from '../store/actions';

import { MdModeEdit } from 'react-icons/md';

import Main from '../components/Main';
import MenuBtn from '../components/navigation/MenuBtn';
import HeadingMain from '../components/ui/typography/HeadingMain';
import Button from '../components/ui/buttons/Button';
import List from '../components/ui/List';
import ListItem from '../components/ui/ListItem';
import NavContainer from '../components/navigation/Mobile/NavContainer';
import NavItem from '../components/navigation/Mobile/NavItem';
import Backdrop from '../components/ui/Backdrop';
import Form from '../components/Form';
import Modal from '../components/Modal';
import HeadingModal from '../components/ui/typography/HeadingModal';
import Input from '../components/ui/inputs/Input';
import InputWrapper from '../components/ui/inputs/InputWrapper';
import SearchBtn from '../components/ui/buttons/SearchBtn';
import ButtonFull from '../components/ui/buttons/ButtonFull';
import Layout from '../components/Layout';
import Paragraph from '../components/ui/typography/Paragraph';
import Anchor from '../components/ui/Anchor';
import Error from '../components/ui/Error';

class Settings extends Component {

  state = {
    newIntake: 0,
    error: '',
  }

  logout = () => {
    fire.auth().signOut();
    localStorage.removeItem('uid');
    this.props.hideMobileNav();
    this.props.onLogout();
    this.props.history.push('/');
  }

  setIntake = (e) => {
    e.preventDefault();
    if (this.state.newIntake <= 0 || this.state.newIntake === '' || this.state.newIntake > 100000) {
      this.setState({error: 'Provided intake is not valid'});
      setTimeout(() => {
        this.setState({error: ''})
      }, 5000)
      return;
    }
    const database = fire.database();
    const intakeRef = database.ref(`users/${this.props.uid}/intake`);
    intakeRef.set(Math.round(this.state.newIntake));
    this.props.hideMobileNav();
  }

  inputChangedHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  render() {
    return (
      <Layout>
        <Backdrop />
      <Main>
      <NavContainer active={this.props.showMobileNav}>
          <NavItem to="/daily">Today</NavItem>
          <NavItem to="/weekly">Weekly stats</NavItem>
          <NavItem to="/settings" active="true">Settings</NavItem>
          <NavItem to="/" clicked={this.logout}>Logout</NavItem>
      </NavContainer>
        <MenuBtn />
        <HeadingMain margin="0 0 1.5rem 0">Your current daily calorie intake:</HeadingMain>
        <HeadingMain margin="0 0 2.8rem 0">{this.props.intake} {this.props.intake ? 'kcal' : null}</HeadingMain>
        <Button 
        margin="0 0 2.8rem 0"
        onClick={this.props.showSettingsModal}><MdModeEdit fontSize="1.6rem" style={{marginRight: '.5rem'}}/>Set</Button>
        <Modal top="50%" show={this.props.settingsModal}>
          <HeadingModal margin="0 0 2.5rem 0">Set calorie intake:</HeadingModal>
          <Paragraph margin="0 0 1.7rem 0">1. Calculate calorie intake on this page</Paragraph>
          <Anchor href="https://www.calculator.net/calorie-calculator.html" target="_blank" margin="0 0 1.7rem 0">Click here to visit a calorie intake calculator</Anchor>
          <Paragraph margin="0 0 2rem 0">2. Type it in the input field below</Paragraph>
          <Error>{this.state.error}</Error>
          <Input 
          type="number" 
          onChange={this.inputChangedHandler}  
          name="newIntake" 
          placeholder="Enter your intake" 
          margin="0 0 1rem 0" 
          width="100%" 
          required
          />
          <ButtonFull onClick={this.setIntake}>Set intake</ButtonFull>
        </Modal>
      </Main>
      </Layout>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showSettingsModal: () => dispatch(actions.showSettingsModal()),
    hideSettingsModal: () => dispatch(actions.hideDailyEditModal()),
    hideMobileNav: () => dispatch(actions.hideMobileNav()),
    onLogout: () => dispatch(actions.logout())
  }
}

const mapStateToProps = state => {
  return {
    showMobileNav: state.ui.showMobileNav,
    settingsModal: state.ui.settingsModal,
    intake: state.items.intake,
    uid: state.auth.uid,
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Settings));