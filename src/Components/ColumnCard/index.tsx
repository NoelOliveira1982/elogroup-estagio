import { Column } from '../../Models/Columns';
import { Lead } from '../../Models/Lead';
import { LeadCard } from '../LeadCard';
import { Droppable } from 'react-beautiful-dnd';
import styles from './styles.module.scss';

interface IProps {
    column: Column;
    leads: Lead[];
}

export const ColumnCard = (props: IProps) => {
    return (
        <div className={styles.columnCardWrapper}>
            <label>{props.column.title}</label>
            <Droppable droppableId={props.column.id}>
                {(provided) => (
                    <div
                        style={{ flex: 1 }}
                        {...provided.droppableProps}
                        ref={provided.innerRef} >
                        {props.leads.map((lead, index) => (
                            <>
                                {lead.type == props.column.title && <LeadCard index={index} key={lead.id} lead={lead} />}
                            </>
                        ))
                        }
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    );
};