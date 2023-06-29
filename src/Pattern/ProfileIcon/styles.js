import styled from "styled-components";

export const Status = styled.div`
  display: inline-block;

  aspect-ratio : 1 / 1;
  height:30px;

  background-color: #ffffff;
  border-width: 5px;
  border: solid;
  border-radius: 50%;
  border-color: ${props => props.color};
  padding:2px;

  cursor: pointer;

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
