import styled from "styled-components";

export const ProfileIconContainer = styled.div`

display:flex;
flex-direction:row;
justify-content:center;
align-items:center;

`

export const Status = styled.div`
  display: inline-block;

  aspect-ratio : 1 / 1;
  height:30px;

  background-color: #ffffff;
  border-width: 5px;
  border: solid;
  border-radius: 50%;
  border-color: ${props => props.color};
  padding:1px;

  cursor: default;

  img{
    height:100%;
    width:100%;
    object-fit: contain;
  }
`;

export const Thought = styled.div`

  padding:10px;
  border-radius: 21px;
  border: solid;
  border-color: ${p=>p.name?"transparent":"#F1F6F9"};
  background-color: ${p=>p.name?"transparent":"#F1F6F9"};
  color: #212A3E;
  font-size: 0.8rem;
  margin-left: 10px;

  display: inline;

  @media screen and (max-width:800px){
    display: ${p=> p.header?"none":"inline"};
  }

`

export const Input = styled.input`

  border-radius: 20px;
  background-color: #F1F6F9;
  border: solid;
  border-color: #F1F6F9;
  padding: 10px;
  outline: none;

  width:auto;

  color: #212A3E;
  font-size: 0.8rem;

  @media screen and (max-width:800px){
    display: hidden;
  }

  }
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
