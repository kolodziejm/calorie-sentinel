import React, { Component } from 'react'
import styled from 'styled-components';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import fire from '../fire';
import axios from 'axios';

import * as actions from '../store/actions';

import { MdAdd, MdModeEdit, MdDelete } from 'react-icons/md';

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
import Label from '../components/ui/typography/Label';
import SimpleListItem from '../components/ui/SimpleListItem';
import Paragraph from '../components/ui/typography/Paragraph';
import InputSecondary from '../components/ui/inputs/InputSecondary';
import Error from '../components/ui/Error';

class Daily extends Component {

  state = {
    mealName: '',
    error: '',
    apiError: '',
    mealKcal: '',
    editMealName: '',
    editMealKcal: '',
    editId: '',
    apiSearchMeal: '',
    apiResponseMeal: {name: '', kcal: 0},
    apiMealAmount: 0
  }

  inputChangedHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  createMealHandler = (e) => {
    e.preventDefault();

    if (this.state.mealKcal === '' || this.state.mealName === '') {
      this.setState({error: 'Fill in all fields'});
      setTimeout(() => {
        this.setState({error: ''});
      }, 5000)
      return
    }

    if (this.state.mealKcal > 50000 || this.state.mealKcal < 0) {
      this.setState({error: 'Invalid calorie input'});
      setTimeout(() => {
        this.setState({error: ''});
      }, 5000)
      return
    }

    const database = fire.database();
    const mealsRef = database.ref(`users/${this.props.uid}/meals`);
    const totalKcalRef = database.ref(`users/${this.props.uid}/totalKcal`)
    mealsRef.push({name: this.state.mealName, kcal: Math.round(this.state.mealKcal)});
    totalKcalRef.once('value', data => {
      const response = data.val();
      const dbTotalKcal = Number(response);
      const newTotalKcal = dbTotalKcal + Math.round(Number(this.state.mealKcal));
      totalKcalRef.set(newTotalKcal);
    })
    this.setState({
      mealName: '',
      mealKcal: '',
      editMealName: '',
      editMealKcal: '',
      editId: '',
      apiSearchMeal: '',
      apiResponseMeal: {name: '', kcal: 0},
      apiMealAmount: 0
    })
  }

  logout = () => {
    fire.auth().signOut();
    localStorage.removeItem('uid');
    this.props.hideMobileNav();
    this.props.onLogout();
    this.props.history.push('/');
  }

  editMeal = (id, name, kcal) => {
    this.setState({
      editMealName: name,
      editMealKcal: kcal,
      editId: id
    });
    this.props.showDailyEditModal();
  }

  deleteMealHandler = (e, id, kcal) => {
    e.preventDefault();

    const database = fire.database();
    const itemRef = database.ref(`users/${this.props.uid}/meals/${id}`);
    const totalKcalRef = database.ref(`users/${this.props.uid}/totalKcal`);

    itemRef.remove();
    totalKcalRef.once('value', data => {
      const response = data.val();
      const newTotalKcal = response - kcal;
      totalKcalRef.set(newTotalKcal);
    });
  }

  confirmEdit = (e) => {
    e.preventDefault();
    const database = fire.database();
    const itemRef = database.ref(`users/${this.props.uid}/meals/${this.state.editId}`);
    const totalKcalRef = database.ref(`users/${this.props.uid}/totalKcal`);

    itemRef.once('value', data => {
      const response = data.val();
      const dbName = response.name
      const dbKcal = Number(response.kcal);

      if (this.state.editMealKcal === dbKcal && this.state.editMealName === dbName) {
        this.props.hideDailyEditModal();
        this.setState({
          editMealName: '',
          editMealKcal: '',
          editId: '',
          apiSearchMeal: '',
          apiMealAmount: 0
        })
        return;

      } else {

        if (this.state.editMealKcal !== dbKcal) {
          const diff = Math.round(this.state.editMealKcal) - dbKcal;

          totalKcalRef.once('value', data => {
            const response = data.val();
            const newTotalKcal = response + diff;
            totalKcalRef.set(newTotalKcal);
          })
        }

        itemRef.set({
          kcal: Math.round(this.state.editMealKcal),
          name: this.state.editMealName
        })

        this.props.hideDailyEditModal();
        this.setState({
          editMealName: '',
          editMealKcal: '',
          editId: '',
          apiSearchMeal: '',
          apiMealAmount: 0
        })
      }
    })
  }

  searchMeal = (e) => {
    e.preventDefault();

    if (this.state.apiSearchMeal === '') {
      this.setState({apiError: 'Fill in the search field'});
      setTimeout(() => {
        this.setState({apiError: ''});
      }, 5000)
      return;
    }

    const searchString = encodeURIComponent(this.state.apiSearchMeal);
    const appId = 'b71ac87e';
    const appKey = 'b8fc1f695375af32aca63f95fd8d6ee5';
    axios.get(`https://api.edamam.com/api/food-database/parser?ingr=${searchString}&app_id=${appId}&app_key=${appKey}`)
      .then(res => {
        const response = res.data.parsed;
        for (let key in response) {
          const name = response[key].food.label; 
          const kcal = response[key].food.nutrients.ENERC_KCAL;
          this.setState({
            apiResponseMeal: {name: name, kcal: kcal}
          })
        }
        
      })
      .catch(err => console.log(err));
  }

  createMealWithApiHandler = (e, id) => {
    e.preventDefault();
    if (this.state.apiMealAmount === 0 || this.state.apiMealAmount > 50000) {
      return;
    }
    const database = fire.database();
    const mealsRef = database.ref(`users/${this.props.uid}/meals`);
    const totalKcalRef = database.ref(`users/${this.props.uid}/totalKcal`)

    const calories = Math.round(this.state.apiResponseMeal.kcal * this.state.apiMealAmount / 100);

    mealsRef.push({name: this.state.apiResponseMeal.name, kcal:calories});
    totalKcalRef.once('value', data => {
      const response = data.val();
      const dbTotalKcal = Number(response);
      const newTotalKcal = dbTotalKcal + Number(calories);
      totalKcalRef.set(newTotalKcal);
    })
    this.setState({
      mealName: '',
      mealKcal: '',
      editMealName: '',
      editMealKcal: '',
      editId: '',
      apiSearchMeal: '',
      apiResponseMeal: {name: '', kcal: 0},
      apiMealAmount: 0
    })
  }

  render() {

    const mealsList = this.props.meals.map((item, i) => {
      return <ListItem 
      key={item.id} 
      name={item.name} 
      calories={item.kcal} 
      icon={<MdModeEdit fontSize="2.4rem" fill="#7FB800" onClick={() => this.editMeal(item.id, item.name, item.kcal)}/>}
      extraIcon={<MdDelete fontSize="2.4rem" fill="#F6511D" onClick={(e) => this.deleteMealHandler(e, item.id, item.kcal)}/>}/>
    })

    const mealsKcal = this.props.meals.map(meal => {
      return meal.kcal;
    })
    const kcalEaten = mealsKcal.reduce((el1, el2) => {
      return el1 + el2;
    }, 0)

    const intakeLeft = Number(this.props.intake) - Number(kcalEaten);
    const aboveIntake = Math.abs(intakeLeft);
    

    let apiResponse;
    if (this.state.apiResponseMeal.name !== '') {
      apiResponse = (
        <React.Fragment>
          <SimpleListItem 
          name={this.state.apiResponseMeal.name} 
          margin="0 0 1rem 0"/>
          <Paragraph margin="0 0 1rem 0">{this.state.apiResponseMeal.kcal} kcal per 100g</Paragraph>
          <InputSecondary
          margin="0 0 1rem 0" 
          placeholder="Enter amount in grams" 
          type="number" required 
          onChange={this.inputChangedHandler} 
          name="apiMealAmount"
          min="1" step="1"
          max="9999"
          width="100%"/>
          <Button onClick={this.createMealWithApiHandler}>Add</Button>
        </React.Fragment>
      );
    }

    return (
      <Layout>
        <Backdrop />
      <Main>
      <NavContainer active={this.props.showMobileNav}>
          <NavItem active="true" to="/daily">Today</NavItem>
          <NavItem to="/weekly">Weekly stats</NavItem>
          <NavItem to="/settings">Settings</NavItem>
          <NavItem to="/" clicked={this.logout}>Logout</NavItem>
      </NavContainer>
        <MenuBtn />
        <HeadingMain margin="0 0 2.8rem 0" color="#F6511D">{this.props.intake <= 0 ? 'Set your calorie intake in the settings!' : null}</HeadingMain>
        <HeadingMain margin="0 0 2.8rem 0">{intakeLeft >= 0 ? `Calories remaining: ${intakeLeft}` : `Calories above limit: ${aboveIntake}`}</HeadingMain>
        <Button
        disabled={this.props.intake > 0 ? false : true} 
        margin="0 0 2.8rem 0"
        onClick={this.props.showDailyModal}><MdAdd fontSize="2.4rem" style={{marginLeft: '-1rem'}}/> Add meal</Button>
        <HeadingMain margin="0 0 2.8rem 0">Today's meals</HeadingMain>

        <List>
            {mealsList}
        </List>

        <Modal top="30%" show={this.props.dailyModal}>
          <HeadingModal margin="0 0 2.5rem 0">Add food by browsing</HeadingModal>
          <Error margin="0 0 1rem 0">{this.state.apiError}</Error>
          <InputWrapper margin="0 0 2rem 0">
            <Input 
            type="text" 
            placeholder="Search food" height="3.4rem" name="apiSearchMeal" maxLength="60" value={this.state.apiSearchMeal} onChange={this.inputChangedHandler}/>
            <SearchBtn clicked={this.searchMeal}/>
          </InputWrapper>
          
          {apiResponse}

          <HeadingModal margin="2rem 0 1rem 0">Add meal manually</HeadingModal>
          <Error>{this.state.error}</Error>
          <Input 
          type="text" 
          placeholder="Meal name"
          maxLength="80" 
          margin="0 0 1rem 0" 
          width="100%" 
          name="mealName" 
          onChange={this.inputChangedHandler} 
          value={this.state.mealName}/>
          <Input 
          type="number" 
          placeholder="Meal calories" 
          margin="0 0 1rem 0" 
          width="100%" 
          name="mealKcal" 
          onChange={this.inputChangedHandler} 
          max={50}
          value={this.state.mealKcal}/>
          <ButtonFull onClick={this.createMealHandler}>Add it</ButtonFull>
        </Modal>

        <Modal top="30%" show={this.props.dailyEditModal}>
          <HeadingModal margin="0 0 2.5rem 0">Meal editing</HeadingModal>
          <Label>Name</Label>
          <Input name="editMealName" type="text" placeholder="Meal name" value={this.state.editMealName} margin="0 0 1rem 0" width="100%" onChange={this.inputChangedHandler}/>
          <Label>Kcal</Label>
          <Input name="editMealKcal" type="number" placeholder="Meal calories" margin="0 0 3rem 0" width="100%" value={this.state.editMealKcal} onChange={this.inputChangedHandler}/>
          <Button onClick={this.confirmEdit}>Edit</Button>
        </Modal>
      </Main>
      </Layout>
    )
  }
}

const mapStateToProps = state => {
  return {
    showMobileNav: state.ui.showMobileNav,
    dailyModal: state.ui.dailyModal,
    intake: state.items.intake,
    uid: state.auth.uid,
    meals: state.items.meals,
    dailyEditModal: state.ui.dailyEditModal,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    showDailyModal: () => dispatch(actions.showDailyModal()),
    showDailyEditModal: () => dispatch(actions.showDailyEditModal()),
    hideDailyEditModal: () => dispatch(actions.hideDailyEditModal()),
    hideMobileNav: () => dispatch(actions.hideMobileNav()),
    onLogout: () => dispatch(actions.logout())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Daily));