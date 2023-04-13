import { screen } from '@testing-library/react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente Header', () => {
  test('Verifica se ao inicializar a página Wallet o Header apresenta o email, sigla BRL e valor 0', () => {
    const initialState = {
      user: {
        email: 'will@teste.com',
      },
    };

    const initialEntries = ['/carteira'];

    const { store } = renderWithRouterAndRedux(
      <App />,
      { initialState, initialEntries },
    );
    const userEmail = screen.getByText(/will@teste\.com/i);
    expect(userEmail).toBeInTheDocument();
    const BRL = screen.getByText(/brl/i);
    expect(BRL).toBeInTheDocument();
    const initialValue = screen.getByText(/0\.00/i);
    expect(initialValue).toBeInTheDocument();
    expect(userEmail.innerHTML).toBe(store.getState().user.email);
  });
});
