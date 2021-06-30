import {Alert} from "react-bootstrap";
import React, {useEffect} from "react";
import PropTypes from "prop-types";

export function Notification({variant, show, onClose, message}) {
    useEffect(() => {
        if(show) {
            const timer = setTimeout(() => onClose(), 1000);
            return () => clearTimeout(timer);
        }
    }, [show]);

    if(show) {
        return (
            <Alert variant={variant} onClose={onClose} dismissible>
                {message}
            </Alert>
        );
    } else {
        return null
    }
}

Notification.propTypes = {
    variant: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
}
