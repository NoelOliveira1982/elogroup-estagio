import { Lead } from '../../Models/Lead';
import { StyleSheet } from '../../Models/StyleSheet';
import { Draggable } from 'react-beautiful-dnd';
import styles from './styles.module.scss';

interface IProps {
    lead: Lead;
    index: number;
}

export const LeadCard = (props: IProps) => {
    return (
        <Draggable key={props.lead.id} draggableId={JSON.stringify(props.lead.id)} index={props.index}>
            {(provided) => (
                <div
                    className={styles.leadCardWrapper}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <label style={stylesRender.text} >{props.lead.name}</label>
                </div>
            )}
        </Draggable>
    );
};

const stylesRender = StyleSheet.create({
    text: {
        fontSize: 16,
        fontWeight: 'normal',
    }
});