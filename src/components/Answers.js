import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from './Header';
import { KEY, getTriviaQuestions } from '../services/fetchToken';

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
    const { incorrect_answers, correct_answer } = questionResults[0];
    console.log(incorrect_answers);
    const allAnswers = [...incorrect_answers, correct_answer];

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
