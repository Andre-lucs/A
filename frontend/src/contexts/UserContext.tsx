import { ReactNode, createContext } from "react";


interface IUserProvider {
    children: ReactNode
}

interface IUserContext {
   
}

export const UserContext = createContext<IUserContext>({})

export function UserProvider ({children}: IUserProvider) {

    const login = async (email: string, password: string) => {
        try {
            const user = await fetch('/login', {
                body: {email, password}
            })
        } catch (err) {
            console.log(err);
        }
    }
    

    <UserContext.Provider value={{}}>{children}</UserContext.Provider>
}