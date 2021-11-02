import { TypeLead } from "./Lead";

export class Column {
    id: string;
    title: TypeLead;

    constructor(id: string, title: TypeLead) {
        this.id = id;
        this.title = title;
    }
}

export const columnsInitial: Column[] = [
    new Column('0', 'Cliente em Potencial'),
    new Column('1', 'Dados Confirmados'),
    new Column('2', 'Reunião Agendada'),
];