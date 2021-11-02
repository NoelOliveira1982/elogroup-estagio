import { Lead, TypeLead } from "./Lead";

export class Column {
    id: string;
    title: TypeLead;
    leads: Lead[];

    constructor(id: string, title: TypeLead, leads: Lead[]) {
        this.id = id;
        this.title = title;
        this.leads = leads;
    }
}

export const columnsInitial: Column[] = [
    new Column('0', 'Cliente em Potencial', []),
    new Column('1', 'Dados Confirmados', []),
    new Column('2', 'Reunião Agendada', []),
];