import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';

describe('Testa a tela de feedback.', () => {

  test('Verifica tem as informações do usuario.', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/feedback') }) 

    const imgGravatar = screen.getByTestId('header-profile-picture');
    expect(imgGravatar).toBeInTheDocument();

    const namePlayer = screen.getByTestId('header-player-name');
    expect(namePlayer).toBeInTheDocument();

    const scorePlayer = screen.getByTestId('header-score');
    expect(scorePlayer).toBeInTheDocument();

    const msgText = screen.getByText('Could be better...')
    expect(msgText).toBeInTheDocument()
  
  });

  test('Verifica se é redirecionado a pagina de login.', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => { history.push('/feedback'); }) 

    const btnPlayAgain = screen.getByTestId('btn-play-again');
    expect(btnPlayAgain).toBeInTheDocument()

    userEvent.click(btnPlayAgain);
    expect(history.location.pathname).toBe('/');


  });

  test('Verifica o botão que redireciona para a pagina de ranking.', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => { history.push('/feedback'); });

    const btnRanking = screen.getByTestId('btn-ranking');
    expect(btnRanking).toBeInTheDocument();

    act(() => { userEvent.click(btnRanking); });
    expect(history.location.pathname).toBe('/ranking');
  });

  test('Verifica a validação Well Done do feedback.', () => {

    const initialState = {
      player: {
        name: "usuario",
        assertions: 4,
        score: 350,
        gravatarEmail: "trybe@teste.com",
      },
    };

    const { debug } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const msgFeedback = screen.getByTestId('feedback-text');
    debug();
    expect(msgFeedback).toHaveTextContent('Well Done!');
  });

  test('Verifica a validação Could be better... do feedback.', () => {

    const initialState = {
      player: {
        name: "usuario",
        assertions: 2,
        score: 40,
        gravatarEmail: "trybe@teste.com",
      },
    };

    const { debug } = renderWithRouterAndRedux(<App />, initialState, '/feedback');

    const msgFeedback = screen.getByTestId('feedback-text');
    debug();
    expect(msgFeedback).toHaveTextContent('Could be better...');
  });
})
