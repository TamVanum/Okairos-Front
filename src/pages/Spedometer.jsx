import React from 'react';
import ReactSpeedometer from "react-d3-speedometer";
import { Typography } from 'antd';
import 'tailwindcss/tailwind.css';

const { Text } = Typography;

const Spedometer = ({ title, value, minimum, maximum }) => {
    const metricDiff = maximum - minimum;

    // Calcular el nuevo mínimo y máximo en función del rango
    const minimummetricdif = minimum - (metricDiff * 2);
    const maximummetricdif = maximum + (metricDiff * 2);

    const secondMinimum = minimum - metricDiff;
    const secondMaximum = maximum + metricDiff;

    console.log('minimummetricdif:', minimummetricdif);
    console.log('maximummetricdif:', maximummetricdif);
    console.log('metricDiff:', metricDiff);

    

    return (
        <div className="flex flex-col items-center justify-center mt-56">
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
                // Calculamos los stops de los segmentos basados en el nuevo mínimo y máximo
                customSegmentStops={[
                    minimummetricdif, 
                    secondMinimum, 
                    minimum,
                    maximum,
                    secondMaximum, 
                    maximummetricdif
                ]}
                needleColor="black"
                needleTransitionDuration={4000}
                needleTransition="easeElastic"
                currentValueText="Valor Actual: ${value}"
                minValue={minimummetricdif}
                maxValue={maximummetricdif}
                width={300}
                ringWidth={30}
            />
            <Text className="mt-4 text-lg font-medium">{title}</Text>
        </div>
    );
}
export default Spedometer;
// `#ff471a`,
