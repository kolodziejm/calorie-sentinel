import styled from 'styled-components';

export default styled.input`
    border: 1px solid #7FB800;
    border-left: none;
    border-right: none;
    border-top: none;
    outline: none;
    color: #666;
    padding: .8rem 0 .8rem 2rem;
    background-color: #fff;
    height: ${props => props.height};
    margin: ${props => props.margin};
    width: ${props => props.width};
    display: inline-block;
    transition: all .4s;

    &:focus {
        border: 1px solid #04B4FF;
        border-left: none;
        border-right: none;
        border-top: none;
        &::placeholder {
            color: #7FB800;
        }
    }
`;