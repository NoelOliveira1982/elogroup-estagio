import { useContext } from 'react';
import Logo from '../../Assets/logo.jpg';
import { Button } from '../../Components/Button';
import { AuthContext } from '../../Contexts/AuthContext';
import styles from './styles.module.scss';

export const Leads = () => {

    const { setUser, setLeads, leads, user } = useContext(AuthContext);

    const handleDisconnect = () => {
        localStorage.removeItem('@eloGroup:user');
        setUser(null);
    };

    const handleNewLead = () => { };

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