import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    width: 100%;
    margin: ${props => props.margin};
`

const IconWrapper = styled.div`
    position: absolute;
    display: inline-block;
    top: 55%;
    left: 1.5rem;
    transform: translateY(-50%);
    font-size: 2rem;
`

const Input = styled.input`
    width: 100%;
    background-color: #fff;
    border: 1px solid #00A6ED;
    color: #666;
    font-size: 1.6rem;
    padding: .9rem 0  .9rem 5rem;
    margin: ${props => props.margin};
    transition: all .4s ease-out;

    &:focus {
        background-color: #FFB400;
        border: 1px solid #FFB400;
    }
`;


export default (props) => (
    <Container margin={props.margin}>
        <IconWrapper>{props.icon}</IconWrapper>
        <Input name={props.name} placeholder={props.placeholder} value={props.value} type={props.type} required={props.required} onChange={props.changed}/>
    </Container>
);