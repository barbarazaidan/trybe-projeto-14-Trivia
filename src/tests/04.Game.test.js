import React from 'react';
import { getByTestId, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { questionsResponse, invalidTokenQuestionsResponse } from './mocks/questionsAPI';
import { tokenResponse } from './mocks/token';
import App from '../App';

const mockPlayer = {
  player: {
    name: 'usuario',
    gravatarEmail: 'usuario@trybe.com',
    score: 0,
    assertions: 0,
  },
};

describe('Testa a tela de Game', () => {
  it('Verifica se o componente Header está presente na tela', () => {
    const { history, debug } = renderWithRouterAndRedux(<App />, mockPlayer, '/game');

    const usuarioTest = screen.getByText('usuario');
    const scoreTest = screen.getByTestId('header-score');
    const imgTest = screen.getByTestId('header-profile-picture');

    // debug();

    // console.log(scoreTest);

    expect(usuarioTest).toBeInTheDocument();
    expect(scoreTest).toBeInTheDocument();
    expect(scoreTest).toHaveTextContent(0);
    expect(imgTest).toBeInTheDocument();
  });

  it('Verifica se o token é inválido', async () => {
    global.fetch = jest.fn(() => 
    Promise.resolve({
      json: () => Promise.resolve(invalidTokenQuestionsResponse)
    }))

    const { history, debug } = renderWithRouterAndRedux(<App />, mockPlayer, '/game');

    const tokenLocal = localStorage.getItem('token');
    //console.log(tokenLocal);

    expect(fetch).toHaveBeenCalled();
    expect(tokenLocal).toBeNull();

    // SE COLOCAR '/feedback' OU OUTRA URL, O ERRO É GERADO, MAS COM O '/game', O ERRO NÃO PEGA
    // ISSO PODE OCORRER POR CONTA DE UM ATRASO NO HYSTORY POR CONTA DA DESESTRUTURAÇÃO FEITA NA LINHA 44
    // await waitFor(() => expect(history.location.pathname).toBe('/game'))
    
    console.log(window.location.pathname)
    await waitFor(() => expect(window.location.pathname).toBe('/')) // com o window não há o problema do atraso e o teste pega o caminho da hora do navegador

    jest.clearAllMocks();
  });

  it('Verifica se o token é válido', async () => {
    global.fetch = jest.fn(() => 
    Promise.resolve({
      json: () => Promise.resolve(questionsResponse)
    }))

    // EU PRECISO SETAR O LOCAL STORAGE, POIS A FUNÇÃO QUE LIDA COM ELE ESTÁ NA PÁGINA DE LOGIN DO MEU CÓDIGO E EU JÁ ENTRO NA ROTA DE GAME
    localStorage.setItem('token', tokenResponse.token);

    const { history, debug } = renderWithRouterAndRedux(<App />, mockPlayer, '/game');

    await waitFor(() => expect(screen.getByTestId('correct-answer')).toBeInTheDocument())

    const tokenLocal = localStorage.getItem('token');
    console.log(tokenLocal);
    
    debug()
    
    expect(tokenLocal.length).toBe(64);
    expect(tokenLocal).toBe(tokenResponse.token);
    });

  it('Verifica se o botão de next aparece na tela', async () => {
    global.fetch = jest.fn(() => 
    Promise.resolve({
      json: () => Promise.resolve(questionsResponse)
    }))

    const { history, debug } = renderWithRouterAndRedux(<App />, mockPlayer, '/game');

    const correctAnswer = await screen
      .findByTestId('correct-answer', {}, { timeout: 4000 });

    const btnNext = screen.queryByTestId('btn-next');
    // console.log(btnNext);

    expect(btnNext).not.toBeInTheDocument();

    userEvent.click(correctAnswer);
    const btnNext2 = screen.queryByTestId('btn-next');
    // console.log(btnNext);

    await waitFor(() => expect(btnNext2).toBeInTheDocument());
    debug();
  });

  // it('Verifica se o botão de next aparece na tela', async () => {
  //   jest.spyOn(global, 'fetch');
  //   global.fetch.mockResolvedValue({
  //     json: jest.fn().mockResolvedValue(questionsResponse),
  //   });

  //   const { history, debug } = renderWithRouterAndRedux(<App />);
  //   const nameInput = screen.getByTestId('input-player-name');
  //   const emailInput = screen.getByTestId('input-gravatar-email');
  //   const btnPlay = screen.getByRole('button', { name: 'Play' });

  //   userEvent.type(nameInput, 'usuario');
  //   userEvent.type(emailInput, 'usuario@trybe.com');
  //   userEvent.click(btnPlay);
  //   const correctAnswer = await screen
  //     .findByTestId('correct-answer', {}, { timeout: 4000 });

  //   const btnNext = screen.queryByTestId('btn-next');
  //   // console.log(btnNext);

  //   expect(btnNext).not.toBeInTheDocument();

  //   userEvent.click(correctAnswer);
  //   const btnNext2 = screen.queryByTestId('btn-next');
  //   // console.log(btnNext);

  //   await waitFor(() => expect(btnNext2).toBeInTheDocument());
  //   debug();
  // });
});
