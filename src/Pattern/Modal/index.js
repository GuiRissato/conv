import React, { createContext, useState, useContext, useEffect } from 'react';

// Components
import {
  Modal,
  Body,
  Footer,
  ButtonContainer,
  Button,
  Header,
  Title,
  Wrapper
  } from './styles.js';
import { Container } from '../index';
//Context
export const Context = createContext()

//Provider
const ModalProvider = ({ children }) =>{

  const [ modalInfo, setModalInfo ] = useState({ visible: false});
  const openModal = () => setModalInfo({...modalInfo, visible: true});
  const closeModal = () => { setModalInfo({...modalInfo, visible: false}) };

  const addModal = ({ title = "", body = "", buttonPrimary = "", buttonSecondary = "", size="normal"}) =>{
    setModalInfo({ title, body, buttonPrimary, buttonSecondary, size, visible: true })
  }


  return (
  <Context.Provider value={{ modalInfo, openModal, closeModal, addModal }}>
    {children}
    {<MyModal/>}
  </Context.Provider>
)
}

//Hook
const useModal = () => {
    const context = useContext(Context);

    if (!context) {
        throw new Error('useModal must be used within a ModalProvider');
    }

    return context;
};

const MyModal = () =>
{

  const { modalInfo, closeModal } = useModal();
  const { title, body, buttonPrimary, buttonSecondary, visible } = modalInfo;

  useEffect(()=>{

    if(visible) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = 'scroll'

  },[visible])

  return(
    visible?
    <Modal id='chartModal'>

    <Wrapper>

    <Header size={modalInfo.size}>
      
        <img src="/logo.png" style={{ height:'5vh' }}/>
      
    </Header>

      <Body size={modalInfo.size}>
        {body}
      </Body>

      <Footer size={modalInfo.size}>
      <ButtonContainer>

        <Button color={buttonPrimary.color??'#9AA4B5'} onClick={()=>{
          if(buttonPrimary.function){
            buttonPrimary.function()
            closeModal()
          }else {
            closeModal()
          }
        }}>
          {buttonPrimary.label??'Entendi'}
        </Button>

        {buttonSecondary !== ""?
        <Button color={'#EE4245'} onClick={()=>closeModal()}>
          {buttonSecondary.label??'Fechar'}
        </Button>
        :
        <></>
        }

        </ButtonContainer>
      </Footer>
      </Wrapper>

    </Modal>
    :
    <></>

  )

}

export { ModalProvider, useModal };