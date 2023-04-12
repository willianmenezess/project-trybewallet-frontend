import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import thunk from 'redux-thunk';
import rootReducer from './reducers';

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// Para que os testes consigam acessar a store do redux e realizar os testes, é necessário adicionar o seguinte bloco de código ao arquivo da store:
if (window.Cypress) {
  window.store = store;
}

export default store;
