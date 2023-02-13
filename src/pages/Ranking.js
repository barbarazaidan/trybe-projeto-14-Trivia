import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  render() {
    const { history } = this.props;
    return (
      <div>
        <h1 data-testid="ranking-title">Ranking!</h1>
        <div>
          <button
            type="button"
            data-testid="btn-go-home"
            onClick={ () => history.push('/') }
          >
            Home
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default connect()(Ranking);
