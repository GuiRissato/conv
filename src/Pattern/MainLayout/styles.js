import styled, { css } from "styled-components";

export const Spa = styled.div`
  ${css`
    display:flex;
    position:relative;
    justify-content: center;
    padding:1rem;
    min-height:calc((100vh - 35px));
    // background-color:#F1F6F9;
    margin-top:2rem;
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
