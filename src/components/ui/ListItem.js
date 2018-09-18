import React from 'react';
import styled from 'styled-components';
import { MdUpdate } from 'react-icons/md';


const Item = styled.li`
    border: 1px solid #00A6ED;
    font-size: 1.2rem;
    padding: 1.5rem 2.5rem;
    color #666;
    background-color: #fff;
    display: flex;
    align-items: center;
    margin: ${props => props.margin};
    width: 100%;

    @media only screen and (min-width: 37.5em) {
        width: 80%;
    }

    @media only screen and (min-width: 56.25em) {
        width: 65%;
    }
`;

const NameSpan = styled.p`
    color: #00A6ED;
    font-size: 1.4rem;
    margin-right: auto;
`;

const IconWrapper = styled.button`
    background-color: transparent;
    outline: none;
    border: none;
    margin-right: 1.4rem;
    cursor: pointer;
`;

export default (props) => (
    <Item>
        <IconWrapper danger={props.danger}>
            {props.icon}
        </IconWrapper>
        {props.extraIcon ? <IconWrapper danger={props.danger}>{props.extraIcon}</IconWrapper> : null}
        <NameSpan>
            {props.name}
        </NameSpan>
        {props.additional ? props.additional : 'kcal: '}
        {props.calories}
    </Item>
);