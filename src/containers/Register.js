import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

import { MdAccountBox, MdLock } from 'react-icons/md';

import fire from '../fire';

import Background from '../components/Background';
import Form from '../components/Form';
import LogoHeader from '../components/LogoHeader';
import InputWithIcon from '../components/ui/inputs/InputWithIcon';
import ButtonFull from '../components/ui/buttons/ButtonFull';
import Link from '../components/navigation/Link';
import Error from '../components/ui/Error';


class Register extends Component {

  state = {
    email: '',
    password: '',
    confirmPassword: '',
    error: '',
  }

  inputChangedHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  createAccount = (e) => {
    e.preventDefault();
    if (this.state.email === '' || this.state.password === '' || this.state.confirmPassword === '' || this.state.password !== this.state.confirmPassword) {
      return;
    }
    fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then(res => {
        const database = fire.database();
        const dbRef = database.ref(`users/${res.user.uid}/intake`);
        const totalKcalRef = database.ref(`users/${res.user.uid}/totalKcal`);

        // today's date for daily reset
        const todayRef = database.ref(`users/${res.user.uid}/today`);

        // date of week's beginning to show on the weekly view
        const startDayRef = database.ref(`users/${res.user.uid}/startDay`);
        const startMonthRef = database.ref(`users/${res.user.uid}/startMonth`);
        const startYearRef = database.ref(`users/${res.user.uid}/startYear`);

        // date of week's ending to show on the weekly view
        const endDayRef = database.ref(`users/${res.user.uid}/endDay`);
        const endMonthRef = database.ref(`users/${res.user.uid}/endMonth`);
        const endYearRef = database.ref(`users/${res.user.uid}/endYear`);

        // date of desired weekly database reset
        const weeklyResetDayRef = database.ref(`users/${res.user.uid}/weeklyResetDay`);
        const weeklyResetMonthRef = database.ref(`users/${res.user.uid}/weeklyResetMonth`);
        const weeklyResetYearRef = database.ref(`users/${res.user.uid}/weeklyResetYear`);
        
        const kcal = 0;
        const date = new Date();

        const today = date.getDate();
        const todayMonth = date.getMonth()+1;
        const todayYear = date.getFullYear();

        const end = new Date();
        end.setDate(today + 6);
        const endDay = end.getDate();
        const endMonth = end.getMonth()+1;
        const endYear = end.getFullYear();

        const weekly = new Date();
        weekly.setDate(today + 7);
        const weeklyResetDay = weekly.getDate();
        const month = weekly.getMonth();
        const weeklyResetMonth = month + 1;
        const weeklyResetYear = weekly.getFullYear();


        dbRef.set(kcal);
        totalKcalRef.set(kcal);

        todayRef.set(today);

        startDayRef.set(today);
        startMonthRef.set(todayMonth);
        startYearRef.set(todayYear);

        endDayRef.set(endDay);
        endMonthRef.set(endMonth);
        endYearRef.set(endYear);

        weeklyResetDayRef.set(weeklyResetDay);
        weeklyResetMonthRef.set(weeklyResetMonth);
        weeklyResetYearRef.set(weeklyResetYear);

        localStorage.setItem('uid', res.user.uid);

        this.setState({email: '', password: '', confirmPassword: ''});
      })
      .catch(err => {
        console.log(err);
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
            <InputWithIcon changed={this.inputChangedHandler} value={this.state.confirmPassword} name="confirmPassword" type="password" required placeholder="Confirm password" margin="0 0 2.4rem 0" icon={<MdLock fill="#F6511D"/>}/>
            <ButtonFull onClick={this.createAccount} margin="0 0 2.4rem 0">Register</ButtonFull>
            <Link to="/">Login here</Link>
        </Form>
      </Background>
    )
  }
}

export default withRouter(Register);