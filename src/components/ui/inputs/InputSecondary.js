import styled from 'styled-components';

export default styled.input`
    border: 1px solid #7FB800;
    outline: none;
    color: #666;
    padding: .9rem 0 .9rem 0;
    background-color: #fff;
    height: ${props => props.height};
    margin: ${props => props.margin};
    width: ${props => props.width};
    display: inline-block;
    text-align: center;
    transition: all .4s;
`;