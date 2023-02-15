import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { questionsResponse, invalidTokenQuestionsResponse } from './mocks/questionsAPI';
import { tokenResponse, invalidTokenResponse } from './mocks/token';
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

    debug();

    console.log(scoreTest);

    expect(usuarioTest).toBeInTheDocument();
    expect(scoreTest).toBeInTheDocument();
    expect(scoreTest).toHaveTextContent(0);
    expect(imgTest).toBeInTheDocument();
  });

  it('Verifica se o token é inválido', () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue(invalidTokenQuestionsResponse);

    const { history, debug } = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', { name: 'Play' });

    userEvent.type(nameInput, 'usuario');
    userEvent.type(emailInput, 'usuario@trybe.com');
    userEvent.click(btnPlay);

    expect(localStorage.getItem('token')).toBeNull();
    jest.clearAllMocks();
  });

  it('Verifica se o token é válido', async () => {
    const { history, debug } = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', { name: 'Play' });

    userEvent.type(nameInput, 'usuario');
    userEvent.type(emailInput, 'usuario@trybe.com');
    userEvent.click(btnPlay);
    await screen.findByTestId('correct-answer', {}, { timeout: 4000 });

    console.log(localStorage);
    debug();

    const tokenLocal = window.localStorage.getItem('token');
    console.log(tokenLocal);

    expect(tokenLocal.length).toBe(64);
  });

  it('Verifica se o botão de next aparece na tela', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(questionsResponse),
    });

    const { history, debug } = renderWithRouterAndRedux(<App />);
    const nameInput = screen.getByTestId('input-player-name');
    const emailInput = screen.getByTestId('input-gravatar-email');
    const btnPlay = screen.getByRole('button', { name: 'Play' });

    userEvent.type(nameInput, 'usuario');
    userEvent.type(emailInput, 'usuario@trybe.com');
    userEvent.click(btnPlay);
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
});
