import React from 'react';

import styled from 'styled-components';
import Spinner from 'react-spinkit';

const LoadingWrapper = styled.div`
    position: absolute;
    width: 100vw;
    height: 100vh;
    background-color: #7FB800;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    opacity: ${props => props.loading ? '1' : '0'};
    top: ${props => props.loading ? '0' : '-999px'};
    left: ${props => props.loading ? '0' : '999px'};
    z-index: 9999;


    .sk-spinner > div {
        width: 4rem;
        height: 4rem;
    }
`;

const LoadingMessage = styled.p`
    color: #fff;
    font-size: 1.6rem;
    margin-top: 4rem;
`


export default (props) => (
    <LoadingWrapper loading={props.loading}>
        <Spinner name="double-bounce"  color="#fff" fadeIn="none"/>
        <LoadingMessage>Hang on, preparing everything for you</LoadingMessage>
    </LoadingWrapper>
);