import { CSSProperties, MouseEventHandler } from 'react';
import styles from './styles.module.scss';

interface IButtonProps {
    type?: 'button' | 'submit' | 'reset';
    message: string;
    onClick?: MouseEventHandler<HTMLButtonElement>;
    style?: CSSProperties;
}

export const Button = (props: IButtonProps) => {
    return (
        <button type={props.type}
            className={styles.button}
            onClick={props.onClick}
            style={props.style}>{props.message}</button>
    );
}