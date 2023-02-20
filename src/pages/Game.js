import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Questions from '../components/Questions';
import Header from '../components/Header';
import { KEY, getTriviaQuestions } from '../services/fetchToken';

class Game extends Component {
  state = {
    questionResults: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const validateQuestions = await getTriviaQuestions();
    // console.log('validateQuestions', validateQuestions);
    if (validateQuestions.results.length === 0) {
      localStorage.removeItem(KEY);
      history.push('/');
    }
    this.setState(() => ({
      questionResults: validateQuestions.results,
    }));
  }

  render() {
    const { questionResults } = this.state;
    const { history } = this.props;
    // console.log(questionResults);
    return (
      <div>
        <Header />
        { questionResults.length > 0
        && <Questions history={ history } questionResults={ questionResults } /> }
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default connect()(Game);
