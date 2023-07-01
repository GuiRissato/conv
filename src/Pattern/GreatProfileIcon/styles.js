import styled from "styled-components";

export const GreatProfileContainer = styled.div`

display:flex;
 flex-direction:column;
 width:100%;
 justify-content: center;
 align-items: center;
 background-color:#F1F6F9;
 padding:10px;
 border-radius:2rem;

`

export const Status = styled.div`
  display: flex;

  aspect-ratio : 1 / 1;
  height:8vh;

  justify-content:center;
  align-items:center;

  background-color: #ffffff50;
  border-width: 5px;
  border: solid;
  border-radius: 50%;
  border-color: ${props => props.color};
  padding:2px;

  cursor: pointer;
  font-size: 1.5rem;

  img{
    height:100%;
    width:100%;
    object-fit: contain;
  }
`;

export const Thought = styled.div`

  display: flex;
  padding:10px;
  border-radius: 21px;
  border: solid;
  border-color: ${p=>p.name?"transparent":"#F1F6F9"};
  background-color: ${p=>p.name?"transparent":"#F1F6F9"};
  color: #212A3E;
  font-size: 0.8rem;
  margin-top: 20px;
  width: fit-content;

  display:inline;

`

export const Initials = styled.div`

display:flex;
 height:100%;
 aspect-ratio:1/1;
 justify-content:center;
 align-items:center;
 background-color:${p=>p.color};
 color:white;
 border-radius:50%;
`
