import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor } from '@testing-library/react';
import { act } from "react-dom/test-utils";
import userEvent from '@testing-library/user-event';
import { questionsResponse, invalidTokenQuestionsResponse } from './mocks/questionsAPI';
import App from '../App';
import Game from '../pages/Game';

describe('Testa o componente Questions:', () => {
  const initialState = {
    player: {
      name: "usuario",
      assertions: 0,
      score: 0,
      gravatarEmail: "trybe@teste.com",
    },
  };

  beforeEach(() => {
 // PRECISA DESTE MOCK PARA APARECER AS QUESTÕES
    global.fetch = jest.fn(() => 
      Promise.resolve({
        json: () => Promise.resolve(questionsResponse)
    }))
    // Também posso colocar o useFakeTimers aqui no beforeEach. Quando testei aqui nem precisou do jest.useRealTimers().
    // jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllMocks();
     // A DOCUMENTAÇÃO DO RTL DIZ PARA COLOCAR OS 2 SCRIPTS ABAIXO, MAS NÃO VI UTILIDADE PRÁTICA USANDO AQUI NO AFTEREACH. 
    // Porém, faz diferença quando coloco o useFakeTimers dentro de cada it
    // https://testing-library.com/docs/using-fake-timers/
    // jest.runOnlyPendingTimers()
    // jest.useRealTimers()
  });

  it('Testa se o timer de 30 segundos está funcionando', async () => {

    // PRECISA DESTE CÓDIGO PARA TRABALHAR COM O CONTADOR
    jest.useFakeTimers();

    const { debug } = renderWithRouterAndRedux(<App />, initialState, '/game');

    // PRECISA DESTA LINHA PARA ESPERAR AS RESPOSTAS APARECEREM
    const correctAnswer = await screen
      .findByTestId('correct-answer', {}, { timeout: 4000 });

    expect(screen.queryByTestId('btn-next')).not.toBeInTheDocument();
    expect(correctAnswer).not.toBeDisabled();

    await waitFor(() => {
      expect(screen.getByTestId('btn-next')).toBeInTheDocument();
      expect(correctAnswer).toBeDisabled();
    }, {timeout: 30000});

    // PRECISA DESTE CÓDIGO PARA RESETAR O CONTADOR E NÃO DAR ERRO DE TEMPO EXCEDIDO NOS PRÓXIMOS TESTES
    jest.useRealTimers()
  });

  // -----------------------------------------------------------------------------------------------

  it('Testa se o timer aparece na tela', async () => {

    jest.useFakeTimers();

    const { debug, history } = renderWithRouterAndRedux(<App />, initialState, '/game');

    const correctAnswer = await screen
      .findByTestId('correct-answer', {}, { timeout: 4000 });

    expect(screen.getByTestId('temporizadorUser').innerHTML).toBe('30');
    
    await waitFor(() => expect(screen.getByTestId('temporizadorUser').innerHTML).toBe('20'), {timeout: 10000});
    await waitFor(() => expect(screen.getByTestId('temporizadorUser').innerHTML).toBe('10'), {timeout: 20000});
    await waitFor(() => expect(screen.getByTestId('temporizadorUser').innerHTML).toBe('0'), {timeout: 30000});

    jest.useRealTimers()
  });

  // -----------------------------------------------------------------------------------------------

  it('Testa se o número máximo de questões é 5', async () => {

    const { debug, history } = renderWithRouterAndRedux(<App />, {}, '/game');

    // SE EU QUISESSE RENDERIZAR O GAME DIRETO PODERIA USAR A FUNÇÃO ABAIXO, MEIO QUE RECRIANDO A FUNÇÃO DO PUSH. ENTRETANTO, ISSO É UMA 'GAMBIARRA'
    // history = () => {
    //   return {
    //     push: (url) => window.location.pathname = url
    //   }
    // };

    const correctAnswer = await screen
      .findByTestId('correct-answer');

    for (let index = 0; index < 5; index += 1) {
      userEvent.click(correctAnswer);
      // console.log(index);
      debug();
      userEvent.click(screen.getByTestId('btn-next'));
    }
    
    expect(screen.queryByTestId('btn-next')).not.toBeInTheDocument();
    expect(screen.getByTestId('feedback-text')).toBeInTheDocument();

    debug();

    jest.useRealTimers()
  });

  // -----------------------------------------------------------------------------------------------

  it('Testa se o número de acertos é computado ao clicar nas questões', async () => {

    const { debug, store } = renderWithRouterAndRedux(<App />, {}, '/game');


    // USANDO A CONSTANTE ANTES DO FOR: a quantidade de respostas corretas não é computada com precisão; cada vez que salvo aparece uma resposta diferente e quase nunca é 5 acertos

    // const correctAnswer = await screen
    //   .findByTestId('correct-answer', {}, { timeout: 4000 });

    // for (let index = 0; index < 5; index += 1) {
    //   userEvent.click(correctAnswer);
    //   userEvent.click(screen.getByTestId('btn-next'));
    // }

    // USANDO A CONSTANTE DENTRO DO FOR: a quantidade de respostas corretas é computada com precisão;
    for (let index = 0; index < 5; index += 1) {
      const correctAnswer = await screen
      .findByTestId('correct-answer');
      userEvent.click(correctAnswer);
      userEvent.click(screen.getByTestId('btn-next'));
    }

    console.log(store.getState().player);
    debug();

    expect(screen.queryByTestId('feedback-total-question')).toHaveTextContent(5);
  });
});
