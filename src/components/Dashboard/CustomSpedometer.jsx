import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { Typography } from 'antd';
import 'tailwindcss/tailwind.css';

const { Text } = Typography;

const CustomSpeedometer = ({ value, minimum, maximum }) => {
    const metricDiff = maximum - minimum;

    const minimumMetricDiff = minimum - (metricDiff * 2);
    const maximumMetricDiff = maximum + (metricDiff * 2);
    const secondMinimumMetricDiff = minimum - metricDiff;
    const secondMaximumMetricDiff = maximum + metricDiff;


    return (
        <div className="flex flex-col w-fit mt-6">
            <ReactSpeedometer
                value={value}
                segments={8}
                segmentColors={[
                    `#f6961e`,
                    `#ecdb23`,
                    `#aee228`,
                    // `#aee228`,
                    `#ecdb23`,
                    `#f6961e`,
                ]}
                customSegmentStops={[
                    minimumMetricDiff, 
                    secondMinimumMetricDiff, 
                    minimum,
                    maximum,
                    secondMaximumMetricDiff,
                    maximumMetricDiff, 
                ]}
                needleColor="black"
                needleTransitionDuration={4000}
                needleTransition="easeElastic"
                currentValueText="Valor Actual: ${value}"
                minValue={minimumMetricDiff}
                maxValue={maximumMetricDiff}
                width={300}
                ringWidth={30}
            />
        </div>
        
    );
}
export default CustomSpeedometer;

