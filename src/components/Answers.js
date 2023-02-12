import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Answers extends Component {
  state = {
    contador: 0,
    temporizador: 30,
    shuffledAnswers: [],
    correctAnswer: '',
    category: '',
    question: '',
    isClicked: false,
    isButtonDisabled: false,
    intervalId: 0,
  };

  // tempUser = () => {
  //   const maxTime = 30;
  //   return maxTime;
  // };

  // temporizador = () => {
  //   console.log('Tai?');
  //   const tempUser = this.tempUser();
  //   return tempUser;
  //   //   setInterval(tempUser(), 1000);
  // };

  componentDidMount() {
    const maxTime = 30000;
    const tempInterval = 1000;

    this.generateAnswers();

    setTimeout(this.timer, maxTime);
    const intervalIdi = setInterval(this.timerUser, tempInterval);
    this.setState({ intervalId: intervalIdi });
  }

  componentDidUpdate(prevProp, prevState) {
    const maxTime = 30000;
    const tempInterval = 1000;

    // console.log('Prevstate:', prevState);
    const { contador } = this.state;
    if (contador > prevState.contador) {
      this.generateAnswers();
      this.setState({
        isButtonDisabled: false,
        temporizador: 30,
      });
      setTimeout(this.timer, maxTime);
      const intervalIdi = setInterval(this.timerUser, tempInterval);
      this.setState({ intervalId: intervalIdi });
    }
  }

  generateAnswers = () => {
    const { contador } = this.state;
    const { questionResults } = this.props;
    const {
      incorrect_answers: incorrectAnswersAPI,
      correct_answer: correctAnswerAPI,
      category,
      question,
    } = questionResults[contador];

    const answersOptions = [...incorrectAnswersAPI, correctAnswerAPI];
    // console.log('currentAnswersOptions', answersOptions);

    const shuffledAnswersOptions = this.shuffleAnswers(answersOptions);
    // console.log(shuffledAnswers);

    this.setState({
      shuffledAnswers: shuffledAnswersOptions,
      correctAnswer: correctAnswerAPI,
      question,
      category,
    });
  };

  shuffleAnswers = (answersOptions) => {
    const limitToSort = 0.5;
    const shuffleAnswers = answersOptions.sort(() => Math.random() - limitToSort);
    // console.log(shuffleAnswers);
    return shuffleAnswers;
  };

  timer = () => {
    this.setState({
      isButtonDisabled: true,
    });
    console.log('oi');
  };

  timerUser = () => {
    const { temporizador, intervalId } = this.state;
    const newTemp = temporizador - 1;
    if (newTemp >= 0) {
      this.setState({ temporizador: newTemp });
    } else {
      clearInterval(intervalId);
    }
  };

  nextQuestion = () => {
    this.setState(({ contador }) => ({ contador: contador + 1, isClicked: false }));
  };

  validateColor = (answer, correctAnswerAPI) => {
    if (answer === correctAnswerAPI) {
      return 'btnGreen';
    } return 'btnRed';
  };

  isClickedBtn = () => {
    this.setState({ isClicked: true });
  };

  render() {
    const {
      category,
      question,
      temporizador,
      isClicked,
      isButtonDisabled,
      shuffledAnswers,
      correctAnswer,
    } = this.state;

    return (
      <div>
        <p id="temporizador">{ temporizador }</p>
        <p data-testid="question-category">{ category }</p>
        <p data-testid="question-text">{ question }</p>
        <div data-testid="answer-options">
          { shuffledAnswers.map((answer, index) => (
            <button
              type="button"
              key={ index }
              data-testid={
                answer === correctAnswer ? 'correct-answer' : `wrong-answer-${index}`
              }
              className={ isClicked ? this.validateColor(answer, correctAnswer) : '' }
              onClick={ this.isClickedBtn }
              disabled={ isButtonDisabled }
            >
              { answer }
            </button>
          ))}
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

// difficulty
// :
// "easy"
// type
// :
// "multiple"
