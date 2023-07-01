import styled from 'styled-components';

export const ItemContainer = styled.div`
display:flex;
width:100%;
justify-content:center;
`
export const ContactsList = styled.div`
display:flex;
 overflow:auto;
 white-space:nowrap;
 flex-direction:row;
 width:80%;
 height:100%;
 background-color:#F1F6F9;
 padding:7px;
 border-radius:18px;
 justify-content:center;
 align-items:center;

 -ms-overflow-style: none;  /* Internet Explorer 10+ */
scrollbar-width: none;  /* Firefox */

`