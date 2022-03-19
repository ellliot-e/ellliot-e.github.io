import React, { useState, useMemo } from "react";

export const ThemeContext = React.createContext({
  background: "",
  setBackground: () => {},
  mono: "",
  setMono: () => {}
});


const ThemeProvider = ({children}) => {
  const [background, setBackground] = useState("#FFFFFF");
  const [mono, setMono] = useState("#000000");
  const value = useMemo(
    () => ({ background, setBackground, mono, setMono }),
    [background, mono]
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ({ element }) => (
  <ThemeProvider>
    {element}
  </ThemeProvider>
);