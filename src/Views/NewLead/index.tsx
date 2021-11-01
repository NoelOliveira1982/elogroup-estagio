import styles from './styles.module.scss';
import Logo from '../../Assets/logo.jpg';
import { FormEvent, useContext, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { CheckBox } from '../../Components/CheckBox';
import { Button } from '../../Components/Button';
import { LeadConstructor } from '../../Models/Lead';

export const NewLead = () => {

    const QUANTITY_OPPORTUNITIES = 4;
    const { setLeads, user, leads } = useContext(AuthContext);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [opportunities, setOpportunities] = useState<boolean[]>(new Array(QUANTITY_OPPORTUNITIES).fill(false));
    const [isAllMarked, setIsAllMarked] = useState(false);

    const handleMarkCheckBox = (index: number) => {
        let aux = opportunities.map(item => item);
        aux[index] = !aux[index];
        setOpportunities(aux);
    };

    const handleMarkAllOpportunities = () => {
        setIsAllMarked(!isAllMarked);
        opportunities.fill(!isAllMarked);
    };

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();

        const lead = new LeadConstructor()
            .setName(name)
            .setEmail(email)
            .setOpportunities(opportunities)
            .setPhone(phone)
            .setUser(user)
            .create();
        let aux = leads;
        aux.push(lead);
        setLeads(aux);
        console.log(leads);
        localStorage.setItem('eloGroup:leads', JSON.stringify(leads));
    };

    return (
        <div className={styles.newLeadWrapper}>
            <header>
                <img src={Logo} alt='EloGroup Logo' />
                <h1>Nova Lead</h1>
            </header>

            <form className={styles.newLeadForm} onSubmit={handleOnSubmit}>
                <label>Nome</label>
                <input
                    placeholder='Digite o nome da lead'
                    required={true}
                    onChange={event => setName(event.target.value)}
                    value={name} />

                <label>Telefone</label>
                <input
                    placeholder='ex: 99999999999'
                    maxLength={15}
                    required={true}
                    type='tel'
                    onChange={event => {
                        const phoneMask = event.target.value.replace(/(\d{2})(\d{5})(\d{4})/, (_, arg1, arg2, arg3) => {
                            return `(${arg1}) ${arg2}-${arg3}`;
                        });
                        setPhone(phoneMask);
                    }}
                    value={phone} />

                <label>E-mail</label>
                <input
                    placeholder='ex: email@exemple.com'
                    required={true}
                    type='email'
                    onChange={event => setEmail(event.target.value)}
                    value={email} />

                <label>Oportunidades</label>
                <CheckBox label='Selecionar todos'
                    onChange={handleMarkAllOpportunities}
                    checked={isAllMarked} />
                <CheckBox label='RPA'
                    onChange={() => handleMarkCheckBox(0)}
                    checked={opportunities[0]} />
                <CheckBox label='Produto Digital'
                    onChange={() => handleMarkCheckBox(1)}
                    checked={opportunities[1]} />
                <CheckBox label='Analytics'
                    onChange={() => handleMarkCheckBox(2)}
                    checked={opportunities[2]} />
                <CheckBox label='BPM'
                    onChange={() => handleMarkCheckBox(3)}
                    checked={opportunities[3]} />

                <Button message='Salvar' type='submit' />
            </form>
        </div>
    );
};