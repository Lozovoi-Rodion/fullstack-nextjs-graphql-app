import { createContext, useContext, useState } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  function toggleCart() {
    setCartOpen(!cartOpen);
  }

  return (
    <LocalStateProvider value={{ cartOpen, toggleCart }}>
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  return useContext(LocalStateContext);
}

export { CartStateProvider, useCart };
