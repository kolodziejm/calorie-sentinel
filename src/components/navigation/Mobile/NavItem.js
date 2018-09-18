import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import * as actions from '../../../store/actions';

const NavLi = styled.li`
    &:not(:last-child) {
        margin-bottom: 7rem;
    }
`;

const NavLink = styled(Link)`
    text-decoration: none;
    color: #fff;
    font-size: 2rem;
    border-bottom: ${props => props.active ? '1px solid #FFB400' : 'none'};
`;

class NavItem extends Component {

    render () {
        return (
            <NavLi onClick={this.props.clicked ? this.props.clicked : this.props.hideMobileNav}>
                <NavLink active={this.props.active} to={this.props.to}>{this.props.children}</NavLink>
            </NavLi>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        hideMobileNav: () => dispatch(actions.hideMobileNav())
    }
}

export default connect(null, mapDispatchToProps)(NavItem);