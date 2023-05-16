import React from 'react';
import { Button } from 'react-bootstrap';

const ButtonsEditDelete = ({ onDelete, onUpdate, size='sm', rounded=false }) => {
    return (
        <div className="d-flex justify-content-end">
            <Button
                variant='danger'
                size={size}
                className="me-1"
                onClick={onDelete}
                style={{borderRadius: rounded ? "50%" : ""}}
            >
                <i className="fa-solid fa-trash-can"></i>
            </Button>
            <Button 
                variant='warning' 
                size={size} 
                onClick={onUpdate}
                style={{borderRadius: rounded ? "50%" : ""}}
            >
                <i className="fa-solid fa-pen-to-square"></i>
            </Button>
        </div>
    );
};

export default ButtonsEditDelete;