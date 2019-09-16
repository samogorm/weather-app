import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Button.scss';

export const Button = props => {
    return (
        <button type={props.type} className={`button button--${props.colour}`}>
            <FontAwesomeIcon icon={props.icon} />
            <span>{props.label}</span>
        </button>
    );
}