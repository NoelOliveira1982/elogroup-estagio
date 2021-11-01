import { createContext, ReactNode, useEffect, useState } from "react";
import { Lead } from "../Models/Lead";

export interface IUser {
    username: string;
    password: string;
}

interface IAuthContextData {
    user: IUser | null;
    leads: Lead[];
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
    setLeads: React.Dispatch<React.SetStateAction<Lead[]>>
}

interface IAuthProvider {
    children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider(props: IAuthProvider) {

    const [user, setUser] = useState<IUser | null>(null);
    const [leads, setLeads] = useState<Lead[]>([]);

    useEffect(() => {
        getProfile();

        function getProfile() {
            const user = localStorage.getItem('@eloGroup:user');
            const leads = localStorage.getItem('eloGroup:leads');
            if (user) {
                if (leads) {
                    setLeads(JSON.parse(leads));
                }
                setUser(JSON.parse(user));
            }
        }
    }, []);

    return (
        <AuthContext.Provider value={{ user, leads, setUser, setLeads }}>
            {props.children}
        </AuthContext.Provider>
    );
}