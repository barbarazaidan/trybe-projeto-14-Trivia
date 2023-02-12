import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { connect } from 'react-redux';

class Answers extends Component {
  state = {
    contador: 0,
    temporizador: 30,
    // shuffled: [],
    // currentQuestionResults: {},
    // color: '',
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

    setTimeout(this.timer, maxTime);
    const intervalIdi = setInterval(this.timerUser, tempInterval);
    this.setState({ intervalId: intervalIdi });
  }

  componentDidUpdate(prevProp, prevState) {
    const maxTime = 30000;
    const tempInterval = 1000;

    console.log('Prevstate:', prevState);
    const { contador } = this.state;
    if (contador > prevState.contador) {
      this.setState({
        isButtonDisabled: false,
        temporizador: 30,
      });
      setTimeout(this.timer, maxTime);
      const intervalIdi = setInterval(this.timerUser, tempInterval);
      this.setState({ intervalId: intervalIdi });
    }
  }

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

  validateColor = (answer, correctAnswerAPI) => {
    if (answer === correctAnswerAPI) {
      return 'btnGreen';
    } return 'btnRed';
  };

  isClickedBtn = () => {
    this.setState({ isClicked: true });
  };

  timer = () => {
    this.setState({
      isButtonDisabled: true,
    });
    console.log('oi');
  };

  answersOptions = (currentQuestionResults) => {
    console.log('currentQuestionResults', currentQuestionResults);
    const {
      incorrect_answers: incorrectAnswersAPI, correct_answer: correctAnswerAPI,
    } = currentQuestionResults;

    const currentAnswersOptions = [...incorrectAnswersAPI, correctAnswerAPI];
    console.log('currentAnswersOptions', currentAnswersOptions);

    const shuffledAnswers = this.shuffleAnswers(currentAnswersOptions);
    console.log(shuffledAnswers);

    const { isClicked, isButtonDisabled } = this.state;

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
            className={ isClicked ? this.validateColor(answer, correctAnswerAPI) : '' }
            // onClick={ () => this.validateColor(answer, correctAnswerAPI) }
            onClick={ this.isClickedBtn }
            disabled={ isButtonDisabled }
            // disabled={ setTimeout(this.timer, 5000) }
          >
            { answer }
          </button>
        ))}
        {/* { setTimeout(this.timer, 5000) } */}
      </div>
    );
  };

  render() {
    const { questionResults } = this.props;
    const { contador, temporizador } = this.state;
    // const { contador, shuffled, currentQuestionResults } = this.state;
    // const {
    //   incorrect_answers: incorrectAnswersAPI, correct_answer: correctAnswerAPI,
    // } = currentQuestionResults;

    return (
      <div>
        <p id="temporizador">{ temporizador }</p>
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
