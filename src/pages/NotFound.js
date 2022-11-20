import React from 'react';
import '../css/NotFound.css';

class NotFound extends React.Component {
  render() {
    return (
      <div data-testid="page-not-found" className="not-found">
        <p>Página Inválida!</p>
      </div>
    );
  }
}

export default NotFound;
