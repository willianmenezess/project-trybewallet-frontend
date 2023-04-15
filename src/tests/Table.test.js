import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testa o componente Table', () => {
  test('Verifica se ao adicionar a despesa ela aparece logo abaixo do formulário e se é possível deletá-la', async () => {
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

    const btnAddExpense = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    // adiciona despesa nos inputs e insere na tabela
    userEvent.type(valueInput, '20');
    userEvent.type(descriptionInput, 'temaki');
    userEvent.click(btnAddExpense);

    // Verifica se os valores da tabela são renderizados, assim como os botões de editar e deletar
    const descriptionTemaki = await screen.findByRole('cell', { name: /temaki/i });
    const tag = screen.getByRole('cell', {
      name: /alimentação/i,
    });
    const method = screen.getByRole('cell', {
      name: /dinheiro/i,
    });
    expect(descriptionTemaki).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(method).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', {
      name: /excluir/i,
    });
    expect(deleteBtn).toBeInTheDocument();
    // verifica se deleta o elemento da tabela
    userEvent.click(deleteBtn);
    expect(descriptionTemaki).not.toBeInTheDocument();
  });

  test('Verifica se ao adicionar a despesa é possível editá-la', async () => {
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

    const btnAddExpense = screen.getByRole('button', {
      name: /adicionar despesa/i,
    });

    // adiciona despesa nos inputs e insere na tabela
    userEvent.type(valueInput, '20');
    userEvent.type(descriptionInput, 'temaki');
    userEvent.click(btnAddExpense);

    const editBtn = await screen.findByRole('button', {
      name: /editar/i,
    });
    expect(editBtn).toBeInTheDocument();

    // verifica se a despesa fica editável no formulário e se o botão de editar despesa funciona e renderiza a atualização
    userEvent.click(editBtn);
    const editExpense = await screen.findByRole('button', { name: /editar despesa/i });
    userEvent.type(valueInput, '15');
    userEvent.click(editExpense);
  });
});
