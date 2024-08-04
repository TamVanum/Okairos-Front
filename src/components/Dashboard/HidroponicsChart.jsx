import React from 'react';
import { Line } from 'react-chartjs-2';
import { antdColorOptions } from '../../utils/colorOptions';

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const datasets = [
    // {
    //     label: 'Flujo del agua',
    //     data: [65, 59, 80, 81, 56, 55, 40, 40, 45, 65, 40, 56],
    //     borderColor: antdColorOptions[1][5],
    //     backgroundColor: antdColorOptions[1][4],
    //     yAxisID: 'y-axis-1',
    // },
    {
        label: 'Temperatura del agua',
        data: [28, 48, 40, 19, 86, 27, 90, 50, 60, 34, 85, 92],
        borderColor: antdColorOptions[2][5],
        backgroundColor: antdColorOptions[2][4],
        yAxisID: 'y-axis-1',
    },
    {
        label: 'Temperatura ambiente',
        data: [18, 38, 50, 29, 76, 17, 80, 40, 50, 24, 75, 82],
        borderColor: antdColorOptions[3][5],
        backgroundColor: antdColorOptions[3][4],
        yAxisID: 'y-axis-1',
    },
    {
        label: 'PH del agua',
        data: [6.5, 6.8, 6.2, 6.4, 6.7, 6.3, 6.6, 6.9, 6.1, 6.7, 6.5, 6.3],
        borderColor: antdColorOptions[4][5],
        backgroundColor: antdColorOptions[4][4],
        yAxisID: 'y-axis-4',
    },
    {
        label: 'Conductividad',
        data: [700, 800, 750, 780, 820, 790, 810, 830, 760, 800, 780, 790],
        borderColor: antdColorOptions[5][5],
        backgroundColor: antdColorOptions[5][4],
        yAxisID: 'y-axis-5',
    },
];

const HidroponicsChart = () => {
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
        datasets: datasets
    };

    const options = {
        responsive: true,
        scales: {
            'y-axis-1': {
                type: 'linear',
                display: true,
                position: 'left',
            },
            'y-axis-2': {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false, // solo dibuja la grilla en un eje
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Estado de Hidroponico',
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default HidroponicsChart;