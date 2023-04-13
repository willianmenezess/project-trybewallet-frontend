import React, { Component } from 'react';

class Table extends Component {
  render() {
    return (
      <section>
        <table>
          <tr className="flex gap-7">
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
          <tr className="flex gap-7">
            <td>segunda linha</td>
          </tr>
        </table>

      </section>
    );
  }
}

export default Table;
