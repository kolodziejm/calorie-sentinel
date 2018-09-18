import React from 'react';
import styled from 'styled-components';
import LogoHeader from '../../LogoHeader';



const Nav = styled.nav`
    position: fixed;
    top: 0; 
    left: ${props => props.active ? '0' : '-999px'}; 
    height: 100vh;
    background-color: #04B4FF;
    color: #fff;
    padding-top: 4rem;
    padding-left: 3rem;
    padding-right: 3rem;
    z-index: 100;
    transition: left .3s ease-out;
`;

const NavList = styled.ul`
    list-style: none;
    display: flex;
    flex-direction: column;
`;

export default (props) => (
    <Nav active={props.active}>
        <LogoHeader margin="0 0 6rem 0" src={require('../../../assets/images/Logo 1.png')}/>
        <NavList>
            {props.children}
        </NavList>
    </Nav>
);