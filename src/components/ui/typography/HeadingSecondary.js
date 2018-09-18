import styled from 'styled-components';

export default styled.h2`
    color: ${props => props.color ? props.color : '#666'};
    font-weight: 400;
    font-size: 1.8rem;
    margin: ${props => props.margin};
`;