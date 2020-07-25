import React from 'react';

import './styles.css';

function Output({ project }) {
  const { title, owner } = project;
  return(
    <div className="form-style-8">
        <li className="dev-item">
        <header>
            <div className="user-info">
            <strong>{title}</strong>
            <span>{owner}</span>
            </div>
        </header>
        </li>
    </div>
  )
}

export default Output;
