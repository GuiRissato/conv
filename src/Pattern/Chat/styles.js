import styled from 'styled-components';

export const Messages = styled.div`

display:flex;
flex-direction:column-reverse;
height:100%;
width:100%;
overflow-y:auto;
padding:10px;

`

export const MessageLine = styled.div`
display:flex;
flex-direction: ${p => p.fromMe?"row-reverse":"row"};
padding: 0px ${p=> p.fromMe?10:0}px 0px 10px;
`;