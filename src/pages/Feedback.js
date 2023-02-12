import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
    // const { assertions } = this.props;
    // console.log(assertions);
    const { numeroAcertos } = this.state;
    console.log(numeroAcertos);
    const numeroMinimoAcertos = 3;

    return (
      <div>
        { numeroAcertos < numeroMinimoAcertos ? (
          <p data-testid="feedback-text">Could be better...</p>
        ) : <p data-testid="feedback-text">Well Done!</p> }
      </div>
    );
  }
}

const mapStateToProps = ({ player: { assertions } }) => ({ assertions });

Feedback.propTypes = {
  assertions: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Feedback);
