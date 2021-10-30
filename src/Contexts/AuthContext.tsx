import { createContext, ReactNode, useEffect, useState } from "react";

export interface IUser {
    username: string;
    password: string;
}

export interface ILead {
    name: string;
    type: 'Cliente em Potencial' | 'Dados Confirmados' | 'Reunião Agendada';
    phone: string;
    email: string;
    opportunities: string[];
}

interface IAuthContextData {
    user: IUser | null;
    leads: ILead[] | null;
    setUser: React.Dispatch<React.SetStateAction<IUser | null>>
    setLeads: React.Dispatch<React.SetStateAction<ILead[]>>
}

interface IAuthProvider {
    children: ReactNode;
}

export const AuthContext = createContext({} as IAuthContextData);

export function AuthProvider(props: IAuthProvider) {

    const [user, setUser] = useState<IUser | null>(null);
    const [leads, setLeads] = useState<ILead[]>([]);

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