import { FormEvent, useContext, useState } from 'react';
import styles from './styles.module.scss';
import Logo from '../../Assets/logo.jpg';
import { AuthContext, IUser } from '../../Contexts/AuthContext';
import { StyleSheet } from '../../Models/StyleSheet';
import { Button } from '../../Components/Button';
import { useHistory } from 'react-router';

export const Home = () => {

    const { setUser } = useContext(AuthContext);
    const history = useHistory();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const wrongPassword = password != confirmPassword;

    const validate = (): boolean => {
        if (password.length < 8) {
            setPasswordError('Sua senha deve ter pelo menos 8 caracteres');
            return false;
        }
        let regex = /[0-9]/;
        if (!regex.test(password)) {
            setPasswordError('Sua senha deve conter pelo menos um número');
            return false;
        }
        regex = /\W/;
        if (!regex.test(password)) {
            setPasswordError('Sua senha deve conter pelo menos um caractere especial');
            return false;
        }
        regex = /[a-zA-Z]/;
        if (!regex.test(password)) {
            setPasswordError('Sua senha deve conter pelo menos uma letra');
            return false;
        }
        if (wrongPassword) {
            setPasswordError('');
            setConfirmPasswordError('As senhas não estão iguais');
            return false;
        }
        setConfirmPasswordError('');
        setPasswordError('');
        return true;
    }

    const handleSignIn = (event: FormEvent) => {
        event.preventDefault();

        if (validate()) {
            const user: IUser = {
                username: username,
                password: password,
            }
            localStorage.setItem('@eloGroup:user', JSON.stringify(user));
            setUser(user);
            history.push('/leads');
        }
    };

    return (
        <div className={styles.sendMessageFormWrapper} >
            <header>
                <img src={Logo} alt='EloGroup logo' />
            </header>

            <form className={styles.sendMessageForm} onSubmit={handleSignIn}>
                <label htmlFor='user'>Usuário</label>
                <input name='username' id='username'
                    placeholder='Digite o usuário'
                    required={true}
                    onChange={event => setUsername(event.target.value)}
                    value={username}
                    enterKeyHint='next'
                    type='text' />

                <label htmlFor='password'>Senha</label>
                <input name='password' id='password'
                    placeholder='Digite a senha'
                    required={true}
                    onChange={event => setPassword(event.target.value)}
                    value={password}
                    enterKeyHint='next'
                    type='password' />
                {passwordError && <label className={styles.wrongPasswordLabel}>{passwordError}</label>}

                <label htmlFor='confirmPassword'
                    style={wrongPassword ? { color: '#ff00006e' } : {}}>Confirmar Senha</label>
                <input name='confirmPassword' id='confirmPassword'
                    placeholder='Digite a senha novamente'
                    required={true}
                    onChange={event => setConfirmPassword(event.target.value)}
                    value={confirmPassword}
                    style={wrongPassword ? stylesRender.errorInput : {}}
                    enterKeyHint='send'
                    type='password'
                />
                {confirmPasswordError && <label className={styles.wrongPasswordLabel}>{confirmPasswordError}</label>}

                <Button message='Registrar' />
            </form>
        </div>
    );
};

const stylesRender = StyleSheet.create({
    errorInput: {
        color: '#ff00006e',
        borderColor: '#ff00006e',
        border: 'solid',
    },
});