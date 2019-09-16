import React from 'react';
import './Temperature.scss';

export const Temperature = props => (
    <h2 className="temperature">{props.value}&#8451;</h2>
);