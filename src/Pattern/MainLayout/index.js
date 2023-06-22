import React, { useEffect, useState } from 'react';

import { useLocation } from 'react-router-dom';

// COMPONENTS
import { Container, Header, Spa } from './styles.js';

function MainLayout({ children }){


  return(
    <div style={{ width:'100%', height:'100%' }}>
      <Spa>{children}</Spa>
    </div>
  )

}

export default MainLayout;
