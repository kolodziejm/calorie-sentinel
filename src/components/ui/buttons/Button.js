import styled from 'styled-components';

export default styled.button`
    text-align: center;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 1.6rem;
    color: #fff;
    padding: .9rem 3rem;
    background-color: #7FB800;
    border: none;
    margin: ${props => props.margin};
    transition: all .2s ease-in-out;
    cursor: pointer;

   &:hover {
    background-color: #04B4FF;
   }
`;