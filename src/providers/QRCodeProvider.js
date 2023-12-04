import React, { createContext, useContext, useReducer } from 'react';
import PanelQRCodeActions from '../actions/PanelQRCodeActions';


const initialState = {
  text: 'QRCode',
  size: 300,
  color: 'black'
};
const ContextPanelQRCode = createContext(initialState);

function QRCodeProvider({ children }) {
  const panelQRCodeReducer = useReducer(PanelQRCodeActions, initialState);

  return (
    <ContextPanelQRCode.Provider value={panelQRCodeReducer}>
      {children}
    </ContextPanelQRCode.Provider>
  );
}

function useContextPanelQRCode() {
  const context = useContext(ContextPanelQRCode);
  return context;
}

export { QRCodeProvider, useContextPanelQRCode };
