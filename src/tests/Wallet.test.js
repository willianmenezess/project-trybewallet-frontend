import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente Wallet', () => {
  test('Verifica se ao inicializar a página Wallet apresenta os inputs do formulário para adicionar a despesa', () => {
    const initialState = {
      user: {
        email: 'will@teste.com',
      },
    };

    const initialEntries = ['/carteira'];

    renderWithRouterAndRedux(
      <App />,
      { initialState, initialEntries },
    );
    const valueInput = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    const descriptionInput = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const currencyInput = screen.getByRole('combobox', {
      name: /moeda:/i,
    });
    const methodInput = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    const tagInput = screen.getByRole('combobox', {
      name: /tag:/i,
    });
    const btnAddExpense = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(btnAddExpense).toBeInTheDocument();

    userEvent.type(valueInput, '10');
  });
});
