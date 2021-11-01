import { IUser } from "../Contexts/AuthContext";

type Type = 'Cliente em Potencial' | 'Dados Confirmados' | 'Reunião Agendada';

class Lead {
    user: IUser | null;
    name: string;
    type: Type;
    phone: string;
    email: string;
    opportunities: boolean[];

    constructor(user: IUser | null, name: string, type: Type, phone: string, email: string, opportunities: boolean[]) {
        this.user = user;
        this.name = name;
        this.type = type;
        this.phone = phone;
        this.email = email;
        this.opportunities = opportunities;
    }
}

export class LeadConstructor {
    user: IUser | null;
    name: string;
    type: Type;
    phone: string;
    email: string;
    opportunities: boolean[];

    constructor() {
        this.user = null;
        this.name = '';
        this.type = 'Cliente em Potencial';
        this.phone = '';
        this.email = '';
        this.opportunities = [];
    }

    create(): Lead {
        return new Lead(this.user, this.name, this.type, this.phone, this.email, this.opportunities);
    }

    setUser(user: IUser | null): LeadConstructor {
        this.user = user;
        return this;
    }
    setName(name: string): LeadConstructor {
        this.name = name;
        return this;
    }
    setPhone(phone: string): LeadConstructor {
        this.phone = phone;
        return this;
    }
    setEmail(email: string): LeadConstructor {
        this.email = email;
        return this;
    }
    setOpportunities(opportunities: boolean[]): LeadConstructor {
        this.opportunities = opportunities;
        return this;
    }
}