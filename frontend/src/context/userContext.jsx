import React, { useState, createContext } from 'react'

export const UserDataContext = createContext()

const UserDataProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullName: {
      firstName: '',
      lastName: ''
    }
  })

  return (
    <UserDataContext.Provider value={{ user, setUser }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserDataProvider