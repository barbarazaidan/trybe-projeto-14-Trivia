import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import App from '../App';
// import player from '../redux/reducers/player';

describe('Testar a tela de Ranking:', () => {
  it('Test01- Verifica se a tela foi renderizada no caminho correto', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const players = {
      jkkk: { score: 68, name: 'jkkk', gravatarEmail: 'sfbgsbsv@fbsbvsdv.com' },
      Nate: { score: 97, name: 'Nate', gravatarEmail: 'hdbv@gmail.com' },
    };
    localStorage.setItem('Players', JSON.stringify(players));
    history.push('/ranking');
    expect(history.location.pathname).toBe('/ranking');
    const title = await screen.findByRole('heading', { name: /ranking!/i });
    expect(title).toBeInTheDocument();
  });

  it('Test02- Verifica se o documento contem o nome do jogador', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const players = {
      jkkk: { score: 68, name: 'jkkk', gravatarEmail: 'sfbgsbsv@fbsbvsdv.com' },
      Nate: { score: 97, name: 'Nate', gravatarEmail: 'hdbv@gmail.com' },
    };
    localStorage.setItem('Players', JSON.stringify(players));
    history.push('/ranking');
    expect(history.location.pathname).toBe('/ranking');
    const player1 = await screen.findByText(/nate/i);
    expect(player1).toBeInTheDocument();
    const player2 = await screen.findByText(/jkkk/i);
    expect(player2).toBeInTheDocument();
  });
  it('Test03- Verifica se o documento contem o score do jogador', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const players = {
      jkkk: { score: 68, name: 'jkkk', gravatarEmail: 'sfbgsbsv@fbsbvsdv.com' },
      Nate: { score: 97, name: 'Nate', gravatarEmail: 'hdbv@gmail.com' },
    };
    localStorage.setItem('Players', JSON.stringify(players));
    history.push('/ranking');
    expect(history.location.pathname).toBe('/ranking');
    const score1 = await screen.findByText(/97/i);
    expect(score1).toBeInTheDocument();
    const score2 = await screen.findByText(/68/i);
    expect(score2).toBeInTheDocument();
  });
  it('Test04- Verifica se o documento contem a imagem do jogador', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const players = {
      jkkk: { score: 68, name: 'jkkk', gravatarEmail: 'sfbgsbsv@fbsbvsdv.com' },
      Nate: { score: 97, name: 'Nate', gravatarEmail: 'hdbv@gmail.com' },
    };
    localStorage.setItem('Players', JSON.stringify(players));
    history.push('/ranking');
    const playerImg = await screen.findAllByTestId('header-profile-picture');
    console.log('xablau', playerImg.length);
    expect(playerImg.length).toBe(2);
  });
  it('Test05- Verifica se o documento contem o botão home', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const players = {
      jkkk: { score: 68, name: 'jkkk', gravatarEmail: 'sfbgsbsv@fbsbvsdv.com' },
      Nate: { score: 97, name: 'Nate', gravatarEmail: 'hdbv@gmail.com' },
    };
    localStorage.setItem('Players', JSON.stringify(players));
    history.push('/ranking');
    const homeBtn = await screen.findByRole('button', { name: /home/i });
    expect(homeBtn).toBeInTheDocument();
  });
  it('Test05- Verifica se o documento contem o botão home', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const players = {
      jkkk: { score: 68, name: 'jkkk', gravatarEmail: 'sfbgsbsv@fbsbvsdv.com' },
      Nate: { score: 97, name: 'Nate', gravatarEmail: 'hdbv@gmail.com' },
    };
    localStorage.setItem('Players', JSON.stringify(players));
    history.push('/ranking');
    expect(history.location.pathname).toBe('/ranking');
    const homeBtn = await screen.findByRole('button', { name: /home/i });
    userEvent.click(homeBtn);

    expect(history.location.pathname).toBe('/');
  });
  // :)
});
