import React, { lazy } from 'react';
import { Route, Switch, useLocation } from 'react-router-dom';

// project imports
import MainLayout from './../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const Dashbord = Loadable(lazy(() => import('../views/dashboard')));
const Purchase = Loadable(lazy(() => import('../views/purchase')));
const Underwriting = Loadable(lazy(() => import('../views/underwriting')));
const Swap = Loadable(lazy(() => import('../views/swap')));
const Governance = Loadable(lazy(() => import('../views/governance')));
// const Mining = Loadable(lazy(() => import('../views/mining')));
const Reward = Loadable(lazy(() => import('../views/reward')));
const Claim = Loadable(lazy(() => import('../views/claim')));



//-----------------------|| MAIN ROUTING ||-----------------------//

const MainRoutes = () => {

    const location = useLocation();

    return (
        <Route
            path={[
                '/home',
                '/purchase',
                '/stake',
                '/underwriting',
                '/swap',
                '/rewards',
                '/governance',
                '/claim'
            ]}
        >
            <MainLayout>
                <Switch location={location} key={location.pathname}>
                    <Route path="/home" component={Dashbord} />
                    <Route path="/purchase" component={Purchase} />
                    <Route path="/underwriting" component={Underwriting} />
                    <Route path="/swap" component={Swap} />
                    <Route path="/rewards" component={Reward} />
                    <Route path="/governance" component={Governance} />
                    <Route path="/claim" component={Claim} />
                </Switch>
            </MainLayout>
        </Route>
    );
};

export default MainRoutes;
