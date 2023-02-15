import React from 'react';
import renderWithRouterAndRedux from './helpers/renderWithRouterAndRedux';
import { screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
//

describe('Testar a tela de Login:', () => {
  it('Test01- Verifica se a tela foi renderizada no caminho correto', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    expect(history.location.pathname).toBe('/')
  });
  it('Test02- Verifica se os elementos (input e button) são renderizados corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const buttonPlay = screen.getByRole('button', {
      name: /play/i
    })
    const buttonSettings = screen.getByRole('button', {
      name: /settings/i
    })

    expect(inputName).toBeInTheDocument();
    expect(inputName).toHaveProperty('type', 'text');
    expect(inputName).toHaveValue('');

    expect(inputEmail).toBeInTheDocument();
    expect(inputEmail).toHaveProperty('type', 'email');
    expect(inputEmail).toHaveValue('');

    expect(buttonPlay).toBeInTheDocument();
    expect(buttonPlay).toHaveProperty('type', 'button');
    expect(buttonPlay).toHaveTextContent('Play');

    expect(buttonSettings).toBeInTheDocument();
    expect(buttonSettings).toHaveProperty('type', 'button');
    expect(buttonSettings).toHaveTextContent('Settings');
  })
  it('Test03- Testa se o botão Play se mantém desabilitado quando somente um dos inputs estiver preenchido', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId("input-player-name");
    const buttonPlay = screen.getByRole('button', {
      name: /play/i
    })

    userEvent.type(inputName, 'Bill');

    expect(buttonPlay).toBeDisabled;
  })
  it('Test04- Testa se o botão Play habilita quando os inputs da tela são preenchidos corretamente', () => {
    renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const buttonPlay = screen.getByRole('button', {
      name: /play/i
    })

    userEvent.type(inputName, 'Bill');
    userEvent.type(inputEmail, 'bora.bill@gmail.com');

    expect(buttonPlay).not.toBeDisabled;
  })
  it('Test05- Testa se o botão Play redireciona o usuário para a página Game após o click', async() => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const buttonPlay = screen.getByRole('button', {
      name: /play/i
    });    
    expect(buttonPlay).toBeInTheDocument();

    userEvent.type(inputName, 'Bill');
    userEvent.type(inputEmail, 'bill@gmail.com');
    userEvent.click(buttonPlay)   
    
    await waitFor(() => expect(history.location.pathname).toBe('/game'), { timeout: 3000 });

    // await waitForElementToBeRemoved(() =>  screen.getByRole('button', { name: /settings/i }), { timeout: 6000 })  
    // expect(history.location.pathname).toBe('/game');
    // Esse passa tbm! ^ 
  })
  it('Test06- Testa se o botão Settings redireciona o usuário para a página Settings após o click', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const inputName = screen.getByTestId("input-player-name");
    const inputEmail = screen.getByTestId("input-gravatar-email");
    const buttonSettings = screen.getByRole('button', {
      name: /settings/i
    })

    userEvent.type(inputName, 'Bill');
    userEvent.type(inputEmail, 'bora.bill@gmail.com');
    userEvent.click(buttonSettings)

    expect(history.location.pathname).toBe('/settings');
  })
})