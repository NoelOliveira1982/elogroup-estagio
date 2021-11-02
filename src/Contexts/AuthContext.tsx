import { createContext, ReactNode, useEffect, useState } from "react";
import { Column, columnsInitial } from "../Models/Columns";
import { Lead } from "../Models/Lead";

export interface IUser {
    username: string;
    password: string;
}

interface IAuthContextData {
    user: IUser | null;
    leads: Lead[];
    columns: Column[];
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>;
    setLeads: React.Dispatch<React.SetStateAction<Lead[]>>;
    setColumns: React.Dispatch<React.SetStateAction<Column[]>>;
}

interface IAuthProvider {
    children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider(props: IAuthProvider) {

    const [user, setUser] = useState<IUser | null>(null);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [columns, setColumns] = useState(columnsInitial);


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
        <AuthContext.Provider value={{ user, leads, columns, setUser, setLeads, setColumns }}>
            {props.children}
        </AuthContext.Provider>
    );
}