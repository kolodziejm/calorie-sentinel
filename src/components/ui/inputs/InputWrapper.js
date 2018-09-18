import styled from 'styled-components';

export default styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: ${props => props.margin};
    transition: all .4s;
`;