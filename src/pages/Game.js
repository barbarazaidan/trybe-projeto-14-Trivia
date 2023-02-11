import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Answers from '../components/Answers';
import Header from '../components/Header';
import { KEY, getTriviaQuestions } from '../services/fetchToken';

class Game extends Component {
  state = {
    questionResults: [],
  };

  async componentDidMount() {
    const { history } = this.props;
    const validateQuestions = await getTriviaQuestions();
    console.log(validateQuestions.results);
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
    // console.log(questionResults);
    return (
      <div>
        <Header />
        { questionResults.length > 0 && <Answers questionResults={ questionResults } /> }
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
