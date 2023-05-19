import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <main>
      <Switch>
        <Route exact path="/project_trybewallet" component={ Login } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    </main>
  );
}

export default App;
// primeiro commit;
