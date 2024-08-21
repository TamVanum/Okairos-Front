import React from 'react';
import PricingCard from '../../components/Plans/PricingCard';

const Plans = () => {
    const plans = [
        {
            title: 'Basico',
            price: 19,
            features: ['1 User', '5GB Storage', 'Basic Support'],
            buttonText: 'Choose Basic',
        },
        {
            title: 'Pro',
            price: 49,
            features: ['5 Users', '50GB Storage', 'Priority Support'],
            buttonText: 'Choose Pro',
        },
        {
            title: 'Enterprise',
            price: 99,
            features: ['Unlimited Users', '150GB Storage', '24/7 Support'],
            buttonText: 'Choose Enterprise',
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center w-full py-12 px-4 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">Our Pricing</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map((plan, index) => (
                    <PricingCard
                        key={index}
                        title={plan.title}
                        price={plan.price}
                        features={plan.features}
                        buttonText={plan.buttonText}
                        isPopular={plan.isPopular}
                    />
                ))}
            </div>
        </div>
    );
};

export default Plans;