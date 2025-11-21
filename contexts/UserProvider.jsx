import React, { createContext, useEffect, useState } from 'react'
import { account } from '../lib/appwrite';

export const UserContext = createContext();

const UserProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true)
    
    useEffect(() => {
      async function fetchUser() {
        try {
          const updatedUser = await account.get()
          setUser(updatedUser)
        } catch (e) {
          console.log(e)
        } finally {
          setUserLoading(false)
        }
      }
      fetchUser()
    }, [])

  return (
    <UserContext.Provider value={{user, userLoading, setUser, setUserLoading}}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider