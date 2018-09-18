import styled from 'styled-components';

export default styled.form`
    position: absolute;
    top: ${props => props.top};
    display: ${props => props.show ? 'block' : 'none'};
    left: 0;
    right: 0;
    margin: 0 auto;
    z-index: 100;
    background-color: #fff;
    padding: 2.5rem 4rem 5rem 4rem;
    text-align: center;
    max-width: 35rem;
`;