import React from 'react';
import { Link } from 'react-router';

export default () => (
  <div className="not-found">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <div className="error-template">
            <h1>Oops!</h1>
            <h2>404 Not Found</h2>
            <div className="error-details">Sorry, an error has occured, Requested page not found!</div>
            <div className="error-actions">
              <Link className="btn btn-primary btn-lg" to="/"><span className="glyphicon glyphicon-home"></span> Take Me Home</Link>
              <Link className="btn btn-default btn-lg" to="/"><span className="glyphicon glyphicon-envelope"></span> Contact Support</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
