import styled from 'styled-components';

export default styled.h1`
    font-size: 2rem;
    font-weight: 400;
    margin: ${props => props.margin};
    color: ${props => props.color ? props.color : '#666'};
`; 