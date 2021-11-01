import { ChangeEventHandler } from "react";
import { StyleSheet } from "../../Models/StyleSheet";

interface IProps {
    label: string;
    checked: boolean;
    onChange: ChangeEventHandler<HTMLInputElement>;
}

export const CheckBox = (props: IProps) => {
    return (
        <label style={styles.label}>
            <input
                style={{ marginRight: 15 }}
                type='checkbox'
                checked={props.checked}
                onChange={props.onChange} />
            {props.label}
        </label>
    );
};

const styles = StyleSheet.create(
    {
        label: {
            fontWeight: 'normal',
            fontSize: 16,
            color: '#8d8d99'
        }
    }
);