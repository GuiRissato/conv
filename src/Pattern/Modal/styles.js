import styled, { css } from 'styled-components';

export const Modal = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:center;
  position: fixed; /* Stay in place */
  z-index: 10; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: hidden; /* Enable scroll if needed */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  backdrop-filter: blur(20px);

`;

export const Wrapper = styled.div`

  display:flex;
  flex-direction: column;
  justify-content:center;
  align-items:center;
  max-width:75%;
  max-height:85%;

  @media screen and (orientation:portrait){
    width: 90%;
    justify-content: flex-end;

    @media screen and (max-width:413px){
      justify-content:center;
    }
  }

  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;

`

export const Header = styled.div`


  display:flex;
  
  margin-bottom: 10px;
  align-self:center;

`;

export const Title = styled.div`

  display: flex;
  height:100%;
  width:33%;
  min-width: ${(window.innerWidth*0.6)/3}px;
  background-color:#003457;
  border-radius:20rem;

  justify-content: center;
  align-items: center;
  font-weight:450;
  padding-left:20px;
  padding-right:20px;

  @media(max-width:736px){
    // width:100%;
    border-radius:5rem;
  }

`;

export const Body = styled.div`

${css`
  display: flex;
  position:relative;
  flex-direction:column;
  justify-content:center;
  height:auto;
  width:auto;
  font-family: Helvetica;
  background-color:white;
  border-radius:2rem;

  overflow-y: auto;
  ::-webkit-scrollbar {
  display: none;
  };
  -ms-overflow-style: none;
  scrollbar-width: none;

  animation: appears 1.2s;
  animation-fill-mode:both;

  @keyframes appears{
    from { opacity:0%; }
    to { opacity:100%; }
  };

  `}

   animation: goUp .5s;
   animation-fill-mode: both;

   @keyframes goUp{
     from { top: ${window.innerHeight}px }
     to { top:0 }
   }

   p{
     color: #7a7a7a;
   }

`;

export const Footer = styled.div`

  width:100%;
  height: 2rem;
  display:flex;
  flex-direction: row;
  margin-top: 10px;
  justify-content: flex-end;
  align-items: center;
`;

export const ButtonContainer = styled.div`

  display:flex;
  flex-direction:row;
  background-color:rgba(206, 212, 208, 0.5);
  padding:5px;
  backdrop-filter: blur(50%);
  border-radius:20rem;
  min-width: 33%;
  height:100%;
  align-items:center;
  justify-content:space-between;

`;

export const Button = styled.button`
height:100%;
min-width:5rem;
width: 100%;
justify-content:center;
align-items:center;
margin:2px;
padding: .5rem;
font-size:14px;
border:none;
outline:none !important;
background-color:${(props)=>props.color};
color: white;
border-radius:20rem;

:hover{
  animation: overButton .7s;
  animation-fill-mode: both;
  @keyframes overButton{
    from { width: 100%; }
    to {
      width:150%;
    }
  }
}

:not(:hover){

  animation: returnNormalButton .3s;
  animation-fill-mode: both;
  @keyframes returnNormalButton{
    from {
      width:150%;
    }
    to {
      width: 100%;
    }
  }
}

@media(max-width:736px){
  border-radius:5rem;
}


`;