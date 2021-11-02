import { IUser } from "../Contexts/AuthContext";

export type TypeLead = 'Cliente em Potencial' | 'Dados Confirmados' | 'Reunião Agendada';

export class Lead {
    id: number;
    user: IUser | null;
    name: string;
    type: TypeLead;
    phone: string;
    email: string;
    opportunities: boolean[];

    constructor(id: number, user: IUser | null, name: string, type: TypeLead, phone: string, email: string, opportunities: boolean[]) {
        this.id = id;
        this.user = user;
        this.name = name;
        this.type = type;
        this.phone = phone;
        this.email = email;
        this.opportunities = opportunities;
    }
}

export class LeadConstructor {
    id: number;
    user: IUser | null;
    name: string;
    type: TypeLead;
    phone: string;
    email: string;
    opportunities: boolean[];

    constructor() {
        this.id = 0;
        this.user = null;
        this.name = '';
        this.type = 'Cliente em Potencial';
        this.phone = '';
        this.email = '';
        this.opportunities = [];
    }

    create(): Lead {
        return new Lead(this.id, this.user, this.name, this.type, this.phone, this.email, this.opportunities);
    }

    setId(id: number): LeadConstructor {
        this.id = id;
        return this;
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