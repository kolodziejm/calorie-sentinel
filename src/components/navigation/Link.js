import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default styled(Link)`
    text-decoration: none;
    display: inline-block;
    color: #666;
    font-size: 1.2rem;
    margin: ${props => props.margin};
`;