import { Route, BrowserRouter } from 'react-router-dom';

import { Home } from './Views/Home';
import { Leads } from './Views/Leads';
import { NewLead } from './Views/NewLead';

export const Routes = () => {
    return (
        <BrowserRouter>
            <Route component={Home} path='/' exact />
            <Route component={Leads} path='/leads' />
            <Route component={NewLead} path='/new-lead' />
        </BrowserRouter>
    );
}