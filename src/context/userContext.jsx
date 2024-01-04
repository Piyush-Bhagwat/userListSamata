import React, { createContext, useState } from 'react'

export const userContext = createContext(null)

const UserContextProvider = (props) => {
    const [popUp, setPopUp] = useState(0);
    const [data, setData] = useState(null);

    const val = {
        popUp,
        data,
        setData,
        setPopUp
    }

  return (
    <userContext.Provider value={val}>{props.children}</userContext.Provider>
  )
}

export default UserContextProvider