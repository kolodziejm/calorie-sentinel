import React, { Component } from 'react';

import styled, { injectGlobal } from 'styled-components';

import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from './store/actions';

import fire from './fire';

import Login from './containers/Login';
import Register from './containers/Register';
import Daily from './containers/Daily';
import Weekly from './containers/Weekly';
import Settings from './containers/Settings';
import Loading from './components/ui/Loading';

import format from 'date-fns/format';
import isAfter from 'date-fns/is_after';

injectGlobal`
  *,
  *:after,
  *:before {
      margin: 0;
      padding: 0;
      box-sizing: inherit;
  }

  ::selection {
    color: #333;
    background-color: #7FB800;
  }
  
  html {
      font-size: 62.5%;
      @media only screen and (min-width: 37.5em) {
        font-size: 70%;
      }

      @media only screen and (min-width: 56.25em) {
        font-size: 75%;
      }

      @media only screen and (min-width: 75em) {
        font-size: 80%;
      }
  }
      
  body {
    box-sizing: border-box;
    overflow-x: hidden;
    font-family: 'Montserrat', sans-serif;
    height: 100%;
    background-color: #f6f6f6;
  }
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      weeklyResetDay: '',
      weeklyResetMonth: '',
      weeklyResetYear: ''
    }

    if (localStorage.getItem('uid')) {
      this.props.onLoadingStart();
    }
  }
  

  componentDidMount() {
    fire.auth().onAuthStateChanged(user => {
      if (user) {
        const database = fire.database();
        const intakeRef = database.ref(`users/${user.uid}/intake`);
        const mealsRef = database.ref(`users/${user.uid}/meals`);
        const totalKcalRef = database.ref(`users/${user.uid}/totalKcal`);

        // date of week's beginning to show on the weekly view
        const startDayRef = database.ref(`users/${user.uid}/startDay`);
        const startMonthRef = database.ref(`users/${user.uid}/startMonth`);
        const startYearRef = database.ref(`users/${user.uid}/startYear`);

        // date of week's ending to show on the weekly view
        const endDayRef = database.ref(`users/${user.uid}/endDay`);
        const endMonthRef = database.ref(`users/${user.uid}/endMonth`);
        const endYearRef = database.ref(`users/${user.uid}/endYear`);

        // WEEKLY RESET DATE
        const weeklyResetDayRef = database.ref(`users/${user.uid}/weeklyResetDay`);
        const weeklyResetMonthRef = database.ref(`users/${user.uid}/weeklyResetMonth`);
        const weeklyResetYearRef = database.ref(`users/${user.uid}/weeklyResetYear`);

        // DAILY RESET DAY
        const dbTodayRef = database.ref(`users/${user.uid}/today`);

        const todayDate = new Date();
        todayDate.setHours(0, 0, 0, 0);


        // daily reset
        const date = new Date();
        const today = date.getDate();

        dbTodayRef.once('value', data => {
          const response = data.val();
          if (today !== response) {
            mealsRef.remove();
            dbTodayRef.set(today);
          }
        })


        // WEEKLY RESET!!!
        weeklyResetDayRef.once('value', data => {
          const response = data.val();
          this.setState({ weeklyResetDay: response });
        }).then(weeklyResetMonthRef.once('value', data => {
          const response = data.val();
          this.setState({ weeklyResetMonth: response });
        }).then(weeklyResetYearRef.once('value', data => {
          const response = data.val();
          this.setState({ weeklyResetYear: response });

          const resetDate = new Date();
          resetDate.setFullYear(this.state.weeklyResetYear, this.state.weeklyResetMonth - 1, this.state.weeklyResetDay);
          resetDate.setHours(0, 0, 0, 0);

          if (todayDate >= resetDate) {

            const date = new Date();

            const today = date.getDate();
            const todayMonth = date.getMonth() + 1;
            const todayYear = date.getFullYear();

            const end = new Date();
            end.setDate(today + 6);
            const endDay = end.getDate();
            const endMonth = end.getMonth() + 1;
            const endYear = end.getFullYear();

            const weekly = new Date();
            weekly.setDate(today + 7);
            const weeklyResetDay = weekly.getDate();
            const month = weekly.getMonth();
            const weeklyResetMonth = month + 1;
            const weeklyResetYear = weekly.getFullYear();

            mealsRef.remove();
            totalKcalRef.set(0);

            startDayRef.set(today);
            startMonthRef.set(todayMonth);
            startYearRef.set(todayYear);

            endDayRef.set(endDay);
            endMonthRef.set(endMonth);
            endYearRef.set(endYear);

            weeklyResetDayRef.set(weeklyResetDay);
            weeklyResetMonthRef.set(weeklyResetMonth);
            weeklyResetYearRef.set(weeklyResetYear);
          }
        })))

        startDayRef.once('value', data => {
          const response = data.val();
          this.props.onGetStartDay(response);
        })

        startMonthRef.once('value', data => {
          const response = data.val();
          this.props.onGetStartMonth(response);
        })

        startYearRef.once('value', data => {
          const response = data.val();
          this.props.onGetStartYear(response);
        })

        endDayRef.once('value', data => {
          const response = data.val();
          this.props.onGetEndDay(response);
        })

        endMonthRef.once('value', data => {
          const response = data.val();
          this.props.onGetEndMonth(response);
        })

        endYearRef.once('value', data => {
          const response = data.val();
          this.props.onGetEndYear(response);
        })


        intakeRef.on('value', data => {
          const response = data.val();
          this.props.onGetIntake(response);
        });

        mealsRef.on('value', data => {
          const response = data.val();
          const mealArray = [];

          for (let key in response) {
            mealArray.push({ id: key, name: response[key].name, kcal: Number(response[key].kcal) });
          }
          this.props.onGetMeals(mealArray);
        })

        totalKcalRef.on('value', data => {
          const response = data.val();
          this.props.onGetTotalKcal(response);
          this.props.onLoadingEnd();
        })

        this.props.onGetUid(user.uid);
        this.props.history.push('/daily');
      }
    })
  }

  render() {

    let routes;
    if (this.props.authenticated) {
      routes = (
        <Switch>
          <Route path="/daily" component={Daily} />
          <Route path="/settings" component={Settings} />
          <Route path="/weekly" component={Weekly} />
          <Redirect to="/daily"/>
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route path="/register" component={Register} />
          <Route path="/" component={Login} />
          <Redirect to="/"/>
        </Switch>
      );
    }

    return (
      <Container>
        <Loading loading={this.props.loading}/>
        {routes}
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onGetIntake: (intake) => dispatch(actions.getIntake(intake)),
    onGetUid: (uid) => dispatch(actions.getUid(uid)),
    onGetMeals: (meals) => dispatch(actions.getMeals(meals)),
    onGetTotalKcal: (kcal) => dispatch(actions.getTotalKcal(kcal)),
    onGetStartDay: (day) => dispatch(actions.getStartDay(day)),
    onGetStartMonth: (month) => dispatch(actions.getStartMonth(month)),
    onGetStartYear: (year) => dispatch(actions.getStartYear(year)),
    onGetEndDay: (day) => dispatch(actions.getEndDay(day)),
    onGetEndMonth: (month) => dispatch(actions.getEndMonth(month)),
    onGetEndYear: (year) => dispatch(actions.getEndYear(year)),
    onLoadingStart: () => dispatch(actions.loadingStart()),
    onLoadingEnd: () => dispatch(actions.loadingEnd())
  }
}

const mapStateToProps = state => {
  return {
    loading: state.ui.loading,
    authenticated: state.auth.authenticated
  }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
