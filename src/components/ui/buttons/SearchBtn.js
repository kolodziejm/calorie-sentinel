import React from 'react';
import styled from 'styled-components';
import { MdSearch} from 'react-icons/md';

const Button = styled.button`
    border: 1px solid #666;
    background-color: #7FB800;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: .6rem;
    transition: all .2s;
    cursor: pointer;

    &:hover {
        background-color:#00A6ED
    }
`;

export default (props) => (
    <Button onClick={props.clicked}>
        <MdSearch fontSize="2rem"/>
    </Button>
);

