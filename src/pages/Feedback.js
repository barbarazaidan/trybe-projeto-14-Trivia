import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends React.Component {
  state = {
    numeroAcertos: 0,
  };

  componentDidMount() {
    const { assertions } = this.props;
    console.log(assertions);
    this.setState({ numeroAcertos: assertions });
  }

  render() {
    const { numeroAcertos } = this.state;
    const { score, assertions } = this.props;
    console.log(numeroAcertos);
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
      </div>
    );
  }
}

const mapStateToProps = ({ player: { assertions, score } }) => ({ assertions, score });

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
