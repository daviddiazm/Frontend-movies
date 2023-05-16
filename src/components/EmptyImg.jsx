import React from 'react';

const EmptyImg = ({ src }) => {
    return (
        <div className="empty-image border-info text-info">
            <img src={src} alt="" className="fluid" />
            <i className="fa-solid fa-image"></i>
        </div>
    );
};

export default EmptyImg;