import React from 'react';
import styled from 'styled-components';

const Li = styled.li`
    border-bottom: 1px solid #00A6ED;
    font-size: 1.4rem;
    padding: 1rem 1rem;
    color: #666;
    text-align: center;
    margin: ${props => props.margin};
    width: 100%;
    list-style: none;
`;

export default (props) => (
    <Li margin={props.margin}>
        {props.name}
    </Li>
);