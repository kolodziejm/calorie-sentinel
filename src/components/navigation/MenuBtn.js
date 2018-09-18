import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import * as actions from '../../store/actions';

import { MdMenu } from 'react-icons/md'

const Button = styled.button`
    outline: none;
    border: none;
    background-color: transparent;
    font-size: 4.8rem;
    position: fixed;
    top: 2rem;
    left: 2rem;
    cursor: pointer;
`;

class MenuBtn extends Component {

    render () {
        return (
            <Button onClick={this.props.showMobileNav}>
                <MdMenu fill="#7FB800"/>
            </Button>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        showMobileNav: () => dispatch(actions.showMobileNav())
    }
}

export default connect(null, mapDispatchToProps)(MenuBtn);