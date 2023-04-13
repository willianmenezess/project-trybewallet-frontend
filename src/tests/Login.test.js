import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa a página de Login', () => {
  test('Verifica se ao inicializar a página inicial de login são renderizados os inputs e botão', () => {
    // a rota inicial (default) é a página de Login, ao renderizar o app
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(btnLogin).toBeInTheDocument();
  });

  test.only('Verifica o preenchimentos dos inputs e submit do botão e se o usuário é direcionado para a página de carteira ao clicar em "entrar"', async () => {
    renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByRole('textbox');
    const inputPassword = screen.getByPlaceholderText(/digite sua senha/i);
    const btnLogin = screen.getByRole('button', { name: /entrar/i });
    userEvent.type(inputEmail, 'will@teste.com');
    userEvent.type(inputPassword, '123456');
    userEvent.click(btnLogin);
    const btnAddExpense = await screen.findByRole('button', {
      name: /adicionar despesa/i,
    });
    expect(btnAddExpense).toBeInTheDocument();
  });
});
