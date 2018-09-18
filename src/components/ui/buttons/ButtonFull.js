import styled from 'styled-components';

export default styled.button`
    text-align: center;
    font-size: 1.6rem;
    color: #fff;
    width: 100%;
    padding: .5rem 0;
    background-color: #7FB800;
    border: none;
    margin: ${props => props.margin};
    transition: all .2s ease-in-out;
    cursor: pointer;
`;