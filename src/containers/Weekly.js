import React, { Component } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import fire from '../fire';

import * as actions from '../store/actions';

import Main from '../components/Main';
import MenuBtn from '../components/navigation/MenuBtn';
import HeadingMain from '../components/ui/typography/HeadingMain';
import NavContainer from '../components/navigation/Mobile/NavContainer';
import NavItem from '../components/navigation/Mobile/NavItem';
import Backdrop from '../components/ui/Backdrop';
import Layout from '../components/Layout';
import HeadingSecondary from '../components/ui/typography/HeadingSecondary';


class Weekly extends Component {

  state = {
    overTheLimit: 0
  }

  logout = () => {
    fire.auth().signOut();
    localStorage.removeItem('uid');
    this.props.hideMobileNav();
    this.props.onLogout();
    this.props.history.push('/');
  }

  render() {
    const totalKcal = this.props.totalKcal;
    const intake = this.props.intake;

    const overTheLimit = totalKcal - intake * 7;

    return (
      <Layout>
        <Backdrop />
      <Main>
      <NavContainer active={this.props.showMobileNav}>
          <NavItem to="/daily">Today</NavItem>
          <NavItem to="/weekly" active="true">Weekly stats</NavItem>
          <NavItem to="/settings">Settings</NavItem>
          <NavItem to="/" clicked={this.logout}>Logout</NavItem>
      </NavContainer>
        <MenuBtn />
        <HeadingMain margin="0 0 3rem 0">Week: {this.props.startDay}.{this.props.startMonth}.{this.props.startYear} - {this.props.endDay}.{this.props.endMonth}.{this.props.endYear}</HeadingMain>
        <HeadingSecondary color="#00A6ED" margin="0 0 1.5rem 0">Calories eaten this week</HeadingSecondary>
        <HeadingSecondary margin="0 0 4rem 0">{this.props.totalKcal} kcal</HeadingSecondary>
        <HeadingSecondary color="#00A6ED" margin="0 0 1.5rem 0">Calories over the limit</HeadingSecondary>
        <HeadingSecondary>{overTheLimit <= 0 ? `None` : `${overTheLimit} kcal`}</HeadingSecondary>
      </Main>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    showMobileNav: state.ui.showMobileNav,
    totalKcal: state.items.totalKcal,
    intake: state.items.intake,
    startDay: state.items.startDay,
    startMonth: state.items.startMonth,
    startYear: state.items.startYear,
    endDay: state.items.endDay,
    endMonth: state.items.endMonth,
    endYear: state.items.endYear
  }
}

const mapDispatchToProps = dispatch => {
  return {
    hideMobileNav: () => dispatch(actions.hideMobileNav()),
    onLogout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Weekly));