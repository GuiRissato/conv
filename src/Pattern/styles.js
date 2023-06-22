import styled, { css } from "styled-components";

export const Container = styled.div`
  ${css`
    display: flex;
    position:relative;
    flex-direction:column;
    align-items:center;
    height:auto;
    width:100%;
    font-family: Helvetica;


    animation: appears 1.2s;
    animation-fill-mode:both;

    @keyframes appears{
      from { opacity:0%; }
      to { opacity:100%; }
    };

    `}
`;

export const Line = styled.div`

  width:100%;
  height:auto;
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-auto-row: 1fr;
  row-gap:1.5rem;
  column-gap:1rem;

  margin: .5rem;
  overflow-wrap:normal;
  // justify-content: space-evenly;
  align-content: center;
  color: #7a7a7a !important;

  box-sizing: border-box;

  align-items:center;

  @media screen and (max-width:800px){
    grid-template-columns: 1fr;
    grid-template-rows: auto;

    :nth-child(<=1){
      Pack{
        grid-column 1 / span 4;
      }
    }

    :nth-child(>3){
      justify-content: space-evenly;
    }

  }

  ${props=> props.hightlight?css`
  @media screen and (min-width:600px){
    :focus-within{
      background-color:#e0e0e0;
      border-radius: calc(2rem + .3rem);
      padding: .3rem .3rem .3rem 1rem;
      transition:
         background-color .5s, padding .7s;
    }

    :not(:focus-within){
      background-color:none;
      padding:0rem;
      transition: background-color .5s, border-radius .6s, padding .7s;
      border-radius:none;
    }
  }
`
:
``
}

`;

export const Pack = styled.div`

  display:flex;
  flex-direction:row;
  grid-column:${props=> `${props.pos??'auto'}/ span ${props.fill??'1'}`};
  align-items:center;
  // justify-content: space-around;

  max-height: 20%;

  @media screen and (max-width:750px){
    grid-column:auto;
    font-size:14px;
  }

  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
`

export const Input = styled.input`

  border-radius: 20px;
  background-color: #F1F6F9;
  border: solid;
  border-color: #F1F6F9;
  padding: 10px;
  outline: none;

  color: #212A3E;
  font-size: 0.8rem;
  // :focus{
  //   box-shadow: 1px 1px 10px #9BA4B5;
  // }
`

export const RoundButton = styled.button`
  background-color: #9BA4B5;
  border-radius: 50%;
  height: 25px;
  border:solid;
  border-width:1px;
  border-color:#9BA4B5;
  aspect-ratio : 1/1;
  margin-left: 10px;

  justify-content: center;
  align-items: center;
  z-index:10;

  :hover{
    animation: overButton .3s;
    animation-fill-mode: both;
    @keyframes overButton{
      from { aspect-ratio : 1/1; }
      to {
        border-radius:20px;
        aspect-ratio : 1/0.5;
      }
    }
  }

  :not(:hover){

    animation: returnNormalButton .3s;
    animation-fill-mode: both;
    @keyframes returnNormalButton{
      from {
        border-radius:20px;
        aspect-ratio : 1/0.5;
      }
      to {
        border-radius:50%;
        aspect-ratio : 1/1;
      }
    }
  }
`

export const MessageIndicator = styled.div`

display:flex;

background-color: #E2A66F;
color:white;
font-size: 0.8rem;
border-radius: 50%;
height: 20px;
border:solid;
border-width:1px;
border-color:#E2A66F;
aspect-ratio : 1/1;

justify-content: center;
align-items: center;
z-index:10;

cursor: default;

`

export const Message = styled.div`
display: flex;
min-height: 2.25rem;
width: fit-content;
max-width: 66%;
overflow-wrap: break-word;
box-sizing: border-box;
padding: 0.5rem 1rem;
margin: 0.3rem;
align-items: center;
justify-content: center;


${props => props.fromMe?
  css`
  border: solid;
  border-color: #9BA4B5;
  background-color: #9BA4B5;
  color: #F1F6F9;
  border-radius: 1.125rem 1.125rem ${p=>p.theLast?0.375:1.125}rem 1.125rem;
  `
  :
  css`
  border: solid;
  border-color:#394867;
  background-color:#394867;
  color:#F1F6F9;
  border-radius: 1.125rem 1.125rem 1.125rem ${p=>p.theLast?0.375:1.125}rem;
  `
}

font-weight:normal;
font-size: 0.88rem;

`
