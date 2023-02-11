import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Answers extends Component {
  state = {
    contador: 0,
  };

  // funcaoTeste = () => {
  //   for (i = 0; i <= 5; i += 1) {
  //     questionResults.filter((question) => ({ question === questionResults[i] }));
  //   }

  // };

  nextQuestion = () => {
    this.setState(({ contador }) => ({ contador: contador + 1 }));
  };

  render() {
    const { questionResults } = this.props;
    const {
      incorrect_answers: incorrectAnswers, correct_answer: correctAnswers,
    } = questionResults[0];

    console.log(incorrectAnswers);
    const allAnswers = [...incorrectAnswers, correctAnswers];

    console.log(allAnswers);
    const { contador } = this.state;
    console.log(questionResults[0]);
    return (
      <div>
        <p data-testid="question-category">{ questionResults[contador].category }</p>
        <p data-testid="question-text">{ questionResults[contador].question }</p>
        <div data-testid="answer-options">
          { allAnswers.sort((answer, index) => (
            <button key={ index } type="button">{ answer }</button>)) }
        </div>
        <button
          type="button"
          data-testid="btn-next"
          onClick={ this.nextQuestion }
        >
          Next
        </button>
      </div>
    );
  }
}

Answers.propTypes = {
  questionResults: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    question: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    correct_answer: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
};

export default Answers;

// category
// :
// "History"
// correct_answer
// :
// "Tudor"
// difficulty
// :
// "easy"
// incorrect_answers
// :
// (3) ['York', 'Stuart', 'Lancaster']
// question
// :
// "King Henry VIII was the second monarch of which European royal house?"
// type
// :
// "multiple"
