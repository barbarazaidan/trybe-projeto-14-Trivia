import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addScore, addAssertions } from '../redux/actions';

class Questions extends Component {
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
    difficulty: '',
    score: 0,
    numberOfAssertions: 0,
    isBtnShow: false,
  };

  componentDidMount() {
    const maxTime = 30000;
    const tempInterval = 1000;

    this.generateAnswers(); // função que atualiza o estado da cetgoria, question e das respostas

    setTimeout(this.timer, maxTime);
    const myInterval = setInterval(this.timerUser, tempInterval);
    // console.log('myInterval', myInterval);
    this.setState({ intervalId: myInterval });
  }

  componentDidUpdate(prevProp, prevState) {
    const maxTime = 30000;
    const tempInterval = 1000;

    // console.log('Prevstate:', prevState);
    const { contador } = this.state;
    const maxLoop = 5;
    if (contador > prevState.contador && contador < maxLoop) {
      this.generateAnswers();
      this.setState({
        isButtonDisabled: false,
        temporizador: 30,
        isBtnShow: false,
      });
      setTimeout(this.timer, maxTime);
      const myInterval = setInterval(this.timerUser, tempInterval);
      // console.log('myInterval', myInterval);
      this.setState({ intervalId: myInterval });
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
      difficulty,
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
      difficulty,
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
      isButtonDisabled: true, isBtnShow: true,
    });
    // console.log('oi do setTimeout');
  };

  timerUser = () => {
    // const { temporizador, intervalId } = this.state;
    const { temporizador } = this.state;
    const newTemp = temporizador - 1;
    if (newTemp >= 0) {
      this.setState({ temporizador: newTemp });
    // } else {
    //   clearInterval(intervalId); // não precisa deste clearInterval, pois já estou chamando no nextQuestion
    // }
    }
  };

  nextQuestion = () => {
    const maxQuestions = 4;
    const { history, dispatch } = this.props;
    // console.log(history);

    this.setState((prevState) => (
      { contador: prevState.contador + 1, isClicked: false }
    ), () => {
      const { contador, numberOfAssertions } = this.state;
      if (contador > maxQuestions) {
        dispatch(addAssertions(numberOfAssertions));
        history.push('/feedback');
      }
    });
    const { intervalId } = this.state;
    clearInterval(intervalId); // vai limpar o intervalo caso usuário clique antes dos 30 segundos na pergunta
  };

  validateColor = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      return 'btnGreen';
    } return 'btnRed';
  };

  isClickedBtn = (answer, correctAnswer) => {
    const { dispatch } = this.props;
    const { temporizador, difficulty } = this.state;
    console.log('temporizador:', temporizador);

    const difficultyScore = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    // console.log('dF:', difficultyScore[difficulty]);

    const numeroPadrao = 10;
    if (answer === correctAnswer) {
      const sum = numeroPadrao + (temporizador * difficultyScore[difficulty]);

      this.setState((prevState) => ({
        score: prevState.score + sum,
        isButtonDisabled: true,
        numberOfAssertions: prevState.numberOfAssertions + 1,
      }), () => {
        const { score } = this.state;
        dispatch(addScore(score));
      });
    } else {
      this.setState({
        isButtonDisabled: true,
      });
    }
    this.setState({ isClicked: true, isBtnShow: true });
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
      isBtnShow,
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
              onClick={ () => { this.isClickedBtn(answer, correctAnswer); } }
              disabled={ isButtonDisabled }
            >
              { answer }
            </button>
          ))}
        </div>
        { isBtnShow && (
          <button
            type="button"
            data-testid="btn-next"
            onClick={ this.nextQuestion }
          >
            Next
          </button>
        )}
      </div>
    );
  }
}

Questions.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  questionResults: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.string,
    difficulty: PropTypes.string,
    question: PropTypes.string,
    incorrect_answers: PropTypes.arrayOf(PropTypes.string),
    correct_answer: PropTypes.string,
  })).isRequired,
};

export default connect()(Questions);
