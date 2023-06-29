import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  max-height: 3rem;
  width: 100%;
  align-items: center;
  justify-content:space-between;
  padding: 1rem;
  position:fixed;
  top:0;
  backdrop-filter: blur(12px);
  background-color: rgba(255,255,255,0.6);
  -webkit-background-color: rgba(255,255,255,0.4);
  -moz-background-color: rgba(255,255,255,0.6);
  z-index:10;

  @media screen and (max-width:414px){
    // justify-content: center;
  }


`;

export const Header = styled.div`

  display: flex;
  flex-direction: row;
  width: 49%;
  height: 3rem;

  justify-content: flex-start;
  align-items: center;
  background-color: #003457;
  border-radius: 3rem;
  padding: 3px 3px 3px 7px;
  color: white !important;
  font-size: 1.3rem;
  font-weight: 500;

  @media screen and (max-width:750px) and (min-width:414px){
    width:49%;
    font-size:1rem;
  }

  @media screen and (max-width:414px){
    ${(props)=>props.location === '/questions'?
    css`
    width:3rem;
    height:3rem;

    // img{
    //   width:3.5rem;
    //   height: 3rem;
    // }

    animation: shortLogo .7s 1s;
    animation-fill-mode: both;

    @keyframes shortLogo{
      from {
        z-index:10;
        position:fixed;
        width:90%;
      }
      to {
        // width:3rem;
        // position:relative;
        font-size:0rem;
        justify-content:center;
        align-items:center;
        img{
          display:none;
        }
       }
    }

    `
    :
    css`
    margin:0px;
    width:90%;
    justify-content: flex-start;
    align-self:flex-start;
    `
    }
  }

`;

export const Spa = styled.div`
  ${css`
    display:flex;
    position:relative;
    justify-content: center;
    padding:1rem;
    min-height:calc((100vh - 35px));
    // background-color:#F1F6F9;
    margin-top:40px;
    `}

`

export const Check = styled.div`

  width: 5px;
  height:8.7px;
  border: 3px solid #3F823E;
  border-left:0;
  border-top:0;
  transform: rotate(45deg);
  margin-left:.5rem;
  margin-bottom: .3rem;

`

export const StatusContainer = styled.div`
  display:flex;
  padding: 1rem 2rem 1rem 0rem;
  height:auto;
  width:100%;
  justify-content:end;
  align-items: center;

  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
`

export const Status = styled.div`

display:flex;
justify-content:center;
align-items: center;
width:auto;
background-color:rgba(206, 212, 208, 0.5);
padding:7px 14px 7px 14px;
backdrop-filter: blur(20px);
border-radius:1rem;
font-size:13px !important;
font-family: Helvetica;
margin:0px 4px 0px 0px;
color: #7a7a7a;

@media screen and (max-width:1200px){
  font-size:11px !important;
}

-webkit-touch-callout: none;
-webkit-user-select: none;
-khtml-user-select: none;
-moz-user-select: none;
-ms-user-select: none;
user-select: none;

cursor: default;
`
