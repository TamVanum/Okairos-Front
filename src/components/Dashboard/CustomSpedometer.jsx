import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { Typography } from 'antd';
import 'tailwindcss/tailwind.css';

const { Text } = Typography;

const CustomSpeedometer = ({ title, value }) => {
    return (
        <div className="flex flex-col items-center justify-center">
            <ReactSpeedometer
                value={value}
                segments={7}
                segmentColors={[
                    `#ff471a`,
                    `#f6961e`,
                    `#ecdb23`,
                    `#aee228`,
                    `#ecdb23`,
                    `#f6961e`,
                    `#ff471a`,
                ]}
                needleColor="black"
                needleTransitionDuration={4000}
                needleTransition="easeElastic"
                currentValueText="Valor Actual: ${value}"
                minValue={0}
                maxValue={100}
                width={200}
                ringWidth={30}
            />
            <Text className="mt-4 text-lg font-medium">{title}</Text>
        </div>
    );
}

export default CustomSpeedometer;
