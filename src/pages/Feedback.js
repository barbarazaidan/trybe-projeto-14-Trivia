import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  state = {
    numeroAcertos: 0,
  };

  componentDidMount() {
    const { assertions, score, name, gravatarEmail } = this.props;
    // console.log(assertions);
    const player = {
      [name]: { score, name, gravatarEmail },
    };

    const savedPlayers = JSON.parse(localStorage.getItem('Players'));
    // console.log(savedPlayers);

    if (savedPlayers === null) {
      localStorage.setItem('Players', JSON.stringify(player));
    } else {
      const allPlayers = {
        ...savedPlayers,
        ...player,
      };
      localStorage.setItem('Players', JSON.stringify(allPlayers));
    }

    this.setState({ numeroAcertos: assertions });
  }

  render() {
    const { numeroAcertos } = this.state;
    const { score, assertions, history } = this.props;
    // console.log(numeroAcertos);
    const numeroMinimoAcertos = 3;

    return (
      <div>
        <Header />
        <p data-testid="feedback-total-score">
          { score }
        </p>
        <p data-testid="feedback-total-question">
          { assertions }
        </p>
        { numeroAcertos < numeroMinimoAcertos ? (
          <p data-testid="feedback-text">Could be better...</p>
        ) : <p data-testid="feedback-text">Well Done!</p> }
        <button
          type="button"
          data-testid="btn-play-again"
          onClick={ () => { history.push('/'); } }
        >
          Play Again
        </button>
        <button
          type="button"
          data-testid="btn-ranking"
          onClick={ () => { history.push('/ranking'); } }
        >
          Ranking
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ player: { assertions, score, name, gravatarEmail } }) => ({
  assertions,
  score,
  name,
  gravatarEmail,
});

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  gravatarEmail: PropTypes.string.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect(mapStateToProps)(Feedback);
