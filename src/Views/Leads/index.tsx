import { useContext } from 'react';
import { useHistory } from 'react-router';
import Logo from '../../Assets/logo.jpg';
import { Button } from '../../Components/Button';
import { AuthContext } from '../../Contexts/AuthContext';
import styles from './styles.module.scss';

export const Leads = () => {

    const { setUser, leads } = useContext(AuthContext);
    const history = useHistory();

    const handleDisconnect = () => {
        localStorage.removeItem('@eloGroup:user');
        setUser(null);
        history.push('/');
    };

    const handleNewLead = () => {
        history.push('/new-lead');
    };

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
                <table>
                    <thead>
                        <tr>
                            <th>Clientes em Potencial</th>
                            <th>Dados Confirmados</th>
                            <th>Reunião Agendada</th>
                        </tr>
                    </thead>
                    <tbody>
                        {leads?.map(lead => {
                            <tr>
                                <th>{lead.name}</th>
                            </tr>
                        })}
                    </tbody>
                </table>
            </main>
        </div>
    );
};