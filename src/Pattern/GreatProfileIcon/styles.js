import styled from "styled-components";

export const Status = styled.div`
  display: inline-block;

  aspect-ratio : 1 / 1;
  height:8vh;

  background-color: #ffffff50;
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
