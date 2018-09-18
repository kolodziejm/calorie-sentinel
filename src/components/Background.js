import styled from 'styled-components';
import img from '../assets/images/background.jpeg';

export default styled.div`
    width: 100%;
    height: 100vh;
    background-image: url(${img});
    background-position: bottom;
    background-size: cover;
    padding: 0 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
`;