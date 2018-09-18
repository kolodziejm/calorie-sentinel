import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux'; 

import * as actions from '../../store/actions';

const Div = styled.div`
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 100vh;
    background-color: rgba(0,0,0,.4);
    display: ${props => props.visible ? 'block' : 'none'};
`;

class Backdrop extends Component {

    render() {
        return (
            <Div onClick={this.props.onHideModal} visible={this.props.settingsModal || this.props.dailyModal || this.props.showMobileNav || this.props.dailyEditModal}/>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onHideModal: () => dispatch(actions.hideModal())
    }
}

const mapStateToProps = state => {
    return {
        settingsModal: state.ui.settingsModal,
        dailyModal: state.ui.dailyModal,
        showMobileNav: state.ui.showMobileNav,
        dailyEditModal: state.ui.dailyEditModal,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Backdrop);