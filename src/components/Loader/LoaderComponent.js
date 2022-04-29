import React from 'react';
import './loader.css';
const LoaderComponent = () => {
    return (
        <div className="d-flex align-items-center justify-content-center h-100">
            <div className="lds-dual-ring" />
        </div>
    );
};

export default LoaderComponent;