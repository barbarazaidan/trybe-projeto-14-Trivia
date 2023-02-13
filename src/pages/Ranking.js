import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import md5 from 'crypto-js/md5';

class Ranking extends Component {
  state = {
    savedOrderedPlayers: [],
  };

  componentDidMount() {
    const localStoragePlayers = JSON.parse(localStorage.getItem('Players'));
    console.log('localStoragePlayers', localStoragePlayers);
    this.orderedPlayers(localStoragePlayers);
  }

  orderedPlayers = (localStoragePlayers) => {
    const infoPlayers = Object.values(localStoragePlayers); // retorna um array de objetos com os usuários salvos no localStorage
    console.log(infoPlayers);
    const playerScore = infoPlayers.sort((b, a) => a.score - b.score);
    console.log(playerScore);
    this.setState({ savedOrderedPlayers: playerScore });
  };

  gravatarImg = (email) => {
    const getHash = md5(email).toString();
    return (
      <img
        data-testid="header-profile-picture"
        src={ `https://www.gravatar.com/avatar/${getHash}` }
        alt="imgPlayer"
      />
    );
  };

  render() {
    const { history } = this.props;
    const { savedOrderedPlayers } = this.state;

    return (
      <div>
        <h1 data-testid="ranking-title">Ranking!</h1>
        <div>
          <ul>
            { savedOrderedPlayers.map((player, index) => (
              <li key={ index } className="listRanking">
                { this.gravatarImg(player.gravatarEmail) }
                <p data-testid={ `player-name-${index}` }>{player.name}</p>
                <p data-testid={ `player-score-${index}` }>{player.score}</p>
              </li>
            )) }
          </ul>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect()(Ranking);
