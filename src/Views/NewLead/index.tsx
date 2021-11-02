import styles from './styles.module.scss';
import Logo from '../../Assets/logo.jpg';
import { FormEvent, useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Contexts/AuthContext';
import { CheckBox } from '../../Components/CheckBox';
import { Button } from '../../Components/Button';
import { LeadConstructor } from '../../Models/Lead';
import { useHistory } from 'react-router';

export const NewLead = () => {

    const QUANTITY_OPPORTUNITIES = 4;
    const history = useHistory();
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
        if (!opportunities.includes(false)) {
            setIsAllMarked(false);
        }
    };

    const handleMarkAllOpportunities = () => {
        setIsAllMarked(!isAllMarked);
        setOpportunities(opportunities.fill(!isAllMarked));
    };

    const handleOnSubmit = (event: FormEvent) => {
        event.preventDefault();

        if ((!opportunities.includes(true)) || (new RegExp(/[a-zA-z]/).test(phone))) {
            return;
        }
        const lead = new LeadConstructor()
            .setId(leads.length + 1)
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
        localStorage.setItem('@eloGroup:leads', JSON.stringify(leads));
        alert('Lead salva com sucesso!');
        history.push('/leads');
    };

    useEffect(() => {
        if (!localStorage.getItem('@eloGroup:user')) {
            localStorage.removeItem('@eloGroup:leads');
            history.push('/');
        }
    }, []);

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
                    enterKeyHint='next'
                    value={name} />

                <label>Telefone</label>
                <input
                    placeholder='ex: 99999999999'
                    minLength={11}
                    maxLength={15}
                    required={true}
                    type='tel'
                    enterKeyHint='next'
                    onChange={event => {
                        const phoneMask = event.target.value.replace(/(\d{2})(\d{5})(\d{4})/, (_, arg1, arg2, arg3) => {
                            return `(${arg1}) ${arg2}-${arg3}`;
                        });
                        setPhone(phoneMask);
                    }}
                    value={phone} />
                {new RegExp(/[a-zA-z]/).test(phone) && <label className={styles.errorLabel}>Coloque um telefone válido</label>}

                <label>E-mail</label>
                <input
                    placeholder='ex: email@exemple.com'
                    required={true}
                    type='email'
                    onChange={event => setEmail(event.target.value)}
                    enterKeyHint='next'
                    value={email} />

                <label>Oportunidades</label>
                <CheckBox label='Selecionar todos'
                    onChange={handleMarkAllOpportunities}
                    checked={!opportunities.includes(false)} />
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
                {!opportunities.includes(true) && <label className={styles.errorLabel}>Selecione pelo menos uma opção</label>}

                <Button message='Salvar' type='submit' />
            </form>
        </div>
    );
};