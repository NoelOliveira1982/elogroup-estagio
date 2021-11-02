import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Logo from '../../Assets/logo.jpg';
import { Button } from '../../Components/Button';
import { ColumnCard } from '../../Components/ColumnCard';
import { AuthContext } from '../../Contexts/AuthContext';
import styles from './styles.module.scss';

export const Leads = () => {

    const { leads, columns, setUser, setLeads } = useContext(AuthContext);
    const history = useHistory();

    const handleDisconnect = () => {
        localStorage.removeItem('@eloGroup:user');
        localStorage.removeItem('@eloGroup:leads');
        setLeads([]);
        setUser(null);
        history.push('/');
    };

    const handleNewLead = () => {
        history.push('/new-lead');
    };

    const handleOnDragEnd = (result: DropResult) => {
        const { destination, source, draggableId } = result;

        if (!destination) { return; }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) { return; }

        const start = columns[Number(source.droppableId)];
        const finish = columns[Number(destination.droppableId)];

        if (start === finish) { return; }

        const idStart = Number(start.id);
        const idFinish = Number(finish.id);

        if (idFinish > idStart && idFinish - idStart > 1) { return; }
        if (idStart > idFinish) { return; }

        const startLeadIds = Array.from(leads.filter((lead) => lead.type === start.title));
        startLeadIds.splice(source.index, 1);
        let leadAux = leads.find(lead => lead.id === Number(draggableId));
        if (leadAux) {
            leadAux.type = finish.title;
            startLeadIds.splice(destination.index, 0, leadAux);
            localStorage.setItem('@eloGroup:leads', JSON.stringify(leads));
        }
    };

    useEffect(() => {
        const aux = localStorage.getItem('@eloGroup:leads');
        if (aux) {
            setLeads(JSON.parse(aux));
        }
    }, []);

    useEffect(() => {
        if (!localStorage.getItem('@eloGroup:user')) {
            localStorage.removeItem('@eloGroup:leads');
            history.push('/');
        }
    }, []);

    return (
        <div className={styles.leadsWrapper}>
            <header>
                <div className={styles.leadsHeader}>
                    <img src={Logo} alt='EloGroup Logo' />
                    <h1>Painel de Leads</h1>
                </div>
                <Button message='Desconectar' onClick={handleDisconnect} />
            </header>

            <main>
                <Button message='Novo Lead (+)'
                    style={{ backgroundColor: '#258bff' }}
                    onClick={handleNewLead} />
                <div className={styles.table}>
                    <DragDropContext onDragEnd={handleOnDragEnd}>
                        {columns.map(column => (
                            <ColumnCard key={column.id} column={column} leads={leads} />
                        ))}
                    </DragDropContext>
                </div>
            </main>
        </div >
    );
};