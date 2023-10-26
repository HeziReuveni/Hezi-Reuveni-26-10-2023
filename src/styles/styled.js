import styled, { keyframes } from 'styled-components';

export const ContainerHomePage = styled.div`
    display:flex;
      align-items:center;
      justify-content:center;
      flex-direction:column;
    width:100vw;
    min-height:50vh;
`

export const ContainerNavbar = styled.div`
width: 100%;
height: 10vh;
background-color: #001f3f;
display: flex;
align-items: center;
justify-content: space-around;
`

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
`;

export const ContainerArrow = styled.div`
  position: absolute;
  bottom: 20px;
  right: 30px;
  animation: ${bounceAnimation} 2.5s ease-in-out forwards;
`;


export const ContainerFiveDays = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between; 
  grid-gap: 20px;
  @media (max-width: 768px) {
    flex-direction: column; 
  }
`;

export const ContainerFavoriteButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  height: 100%;
`;


export const BottomLeftButton = styled.button`
cursor: pointer;
background-color: #1976D2;
color: whitesmoke;
box-shadow: 2px 2px 5px gray;
  border: none;
  width: 50px; 
  height: 50px;
  border-radius: 50%;
  font-size: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 2;
  bottom: 80px; 
  left: 30px; 
  transition: all 0.3s ease; 
  &:hover {
    box-shadow: 5px 5px 10px gray; 
    transform: translateY(-5px); 
  }
  &:focus {
    outline: none; /* Remove the default focus outline */
    box-shadow: 0 0 5px #1976D2; /* Add a custom box-shadow when focused */
  }
`;


export const ContainerDay = styled.div`
  height: 20vh;
  width: 250px;
  background-color: #DDDDDD;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.2);
  border-radius: 10px;
`;

export const TitleDay = styled.div`
  background-color: #001f3f;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  color: #DDDDDD;
  padding: 10px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-weight: bold;
`;


export const ContentDay = styled.div`
  font-family: 'Roboto', sans-serif;
  font-size: 1.2rem;
  letter-spacing: 1px;
  font-weight: bold;
  height:10vh;
          display:flex;
          align-items:center;
          justify-content:space-around;
          
`

