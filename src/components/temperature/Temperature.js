import React from 'react';
import './Temperature.scss';

export const Temperature = (props) => (
    <h2 className="temperature">{props.temperature}&#8451;</h2>
);