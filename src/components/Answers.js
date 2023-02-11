import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Answers extends Component {
  state = {
    contador: 0,
    // shuffled: [],
    // currentQuestionResults: {},
  };

  nextQuestion = () => {
    this.setState(({ contador }) => ({ contador: contador + 1 }));
  };

  shuffleAnswers = (currentAnswersOptions) => {
    const limitToSort = 0.5;
    const shuffleAnswers = currentAnswersOptions.sort(() => Math.random() - limitToSort);
    // console.log(shuffleAnswers);
    return shuffleAnswers;
  };

  // validateColor = (answer, correctAnswerAPI) => {
  //   this.setState({ isOnClick: true });
  // };

  // validateColor = (answer, correctAnswerAPI) => {
  //   if (answer === correctAnswerAPI) {
  //     this.setState({ color: 'btnGreen' });
  //   } else {
  //     this.setState({ color: 'btnRed' });
  //   }
  // };

  answersOptions = (currentQuestionResults) => {
    console.log('currentQuestionResults', currentQuestionResults);
    const {
      incorrect_answers: incorrectAnswersAPI, correct_answer: correctAnswerAPI,
    } = currentQuestionResults;

    const currentAnswersOptions = [...incorrectAnswersAPI, correctAnswerAPI];
    console.log('currentAnswersOptions', currentAnswersOptions);

    const shuffledAnswers = this.shuffleAnswers(currentAnswersOptions);
    console.log(shuffledAnswers);

    // this.setState({ shuffled: shuffledAnswers, currentQuestionResults });

    return (
      <div data-testid="answer-options">
        { shuffledAnswers.map((answer, index) => (
          <button
            type="button"
            key={ index }
            data-testid={
              answer === correctAnswerAPI ? 'correct-answer' : `wrong-answer-${index}`
            }
            // className={ isOnClick && answer === correctAnswerAPI ? 'bntGreen' : 'bntRed' }
            onClick={ this.validateColor }
          >
            { answer }
          </button>
        ))}
      </div>
    );
  };

  render() {
    const { questionResults } = this.props;
    const { contador } = this.state;
    // const { contador, shuffled, currentQuestionResults } = this.state;
    // const {
    //   incorrect_answers: incorrectAnswersAPI, correct_answer: correctAnswerAPI,
    // } = currentQuestionResults;

    return (
      <div>
        <p data-testid="question-category">{ questionResults[contador].category }</p>
        <p data-testid="question-text">{ questionResults[contador].question }</p>
        { this.answersOptions(questionResults[contador]) }
        {/* <div data-testid="answer-options">
          { shuffled.map((answer, index) => (
            <button
              type="button"
              key={ index }
              data-testid={
                answer === correctAnswerAPI ? 'correct-answer' : `wrong-answer-${index}`
              }
              // className={ isOnClick && answer === correctAnswerAPI ? 'bntGreen' : 'bntRed' }
              onClick={ this.validateColor }
            >
              { answer }
            </button>
          ))}
        </div> */}
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

// difficulty
// :
// "easy"
// type
// :
// "multiple"
