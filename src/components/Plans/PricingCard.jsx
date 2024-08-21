import { Button, Typography } from 'antd';
import React from 'react';

const PricingCard = ({ title, price, features, buttonText, isPopular }) => {
    return (
        <div className={`max-w-sm rounded overflow-hidden shadow-lg p-10 px-12 bg-white`}>
            <div className="text-center">
                <Typography className="text-2xl font-bold mb-4">{title}</Typography>
                <p className="text-4xl font-semibold text-gray-800 mb-4">${price}/m</p>
                <ul className="text-left mb-6">
                    {features.map((feature, index) => (
                        <li key={index} className="text-gray-600 mb-2">
                            {feature}
                        </li>
                    ))}
                </ul>
                <Button type="primary" className="font-bold p-5 px-5 rounded-full">
                    {buttonText}
                </Button>
            </div>
        </div>
    );
};

export default PricingCard;