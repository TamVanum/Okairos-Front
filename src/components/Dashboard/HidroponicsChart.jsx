import React, { useState, useMemo } from 'react';
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
import { Select } from 'antd';
import 'antd/dist/reset.css'; // Para Ant Design v5
// import "antd/dist/antd.css"; // Descomenta esta línea para Ant Design v4

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

// Función utilitaria para calcular el promedio de un array
const average = arr => (arr.length > 0 ? arr.reduce((sum, val) => sum + val, 0) / arr.length : 0);

// Función para filtrar datos según el rango de tiempo seleccionado
const filterDataByTimeRange = (data, range) => {
    const now = new Date();
    let startTime;

    switch (range) {
        case 'hour':
            startTime = new Date(now.getTime() - 60 * 60 * 1000);
            break;
        case 'day':
            startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000);
            break;
        case 'week':
            startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            break;
        case 'month':
            startTime = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            break;
        case 'all':
        default:
            return data;
    }

    return data.filter(item => new Date(item.timestamp) >= startTime);
};

// Función para agregar datos según el rango de tiempo seleccionado
const aggregateData = (data, range) => {
    const aggregated = {};

    data.forEach(item => {
        const date = new Date(item.timestamp);
        let key;

        switch (range) {
            case 'hour':
                // Formato: "HH:MM"
                key = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                break;
            case 'day':
                // Formato: "MMM DD"
                key = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
                break;
            case 'week':
                // Formato: "E, MMM DD" (ej., "Mon, Mar 12")
                key = date.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' });
                break;
            case 'month':
                // Formato: "YYYY-MM"
                key = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}`;
                break;
            case 'all':
            default:
                // Formato: "MMM DD, YYYY HH:MM"
                key = date.toLocaleDateString(undefined, {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                });
                break;
        }

        if (!aggregated[key]) {
            aggregated[key] = {
                water_temperature: [],
                ambient_temperature: [],
                ph_level: [],
                electrical_conductivity: [],
            };
        }

        aggregated[key].water_temperature.push(item.water_temperature);
        aggregated[key].ambient_temperature.push(item.ambient_temperature);
        aggregated[key].ph_level.push(item.ph_level);
        aggregated[key].electrical_conductivity.push(item.electrical_conductivity);
    });

    // Preparar etiquetas y datos promediados
    const labels = Object.keys(aggregated).sort((a, b) => new Date(a) - new Date(b));
    const averagedData = labels.map(label => ({
        label,
        water_temperature: average(aggregated[label].water_temperature),
        ambient_temperature: average(aggregated[label].ambient_temperature),
        ph_level: average(aggregated[label].ph_level),
        electrical_conductivity: average(aggregated[label].electrical_conductivity),
    }));

    return averagedData;
};

const HidroponicsChart = ({ plantHistory }) => {
    const [timeRange, setTimeRange] = useState('all');

    // Determinar el límite máximo de ticks basado en el rango de tiempo
    const maxTicksLimit = useMemo(() => {
        switch (timeRange) {
            case 'hour':
                return 12; // Ej., cada 5 minutos
            case 'day':
                return 24; // Ej., cada hora
            case 'week':
                return 7; // Ej., diario
            case 'month':
                return 12; // Ej., mensual
            case 'all':
            default:
                return 20; // Ajustar según sea necesario
        }
    }, [timeRange]);

    // Memorizar datos filtrados y agregados para optimización
    const processedData = useMemo(() => {
        const filtered = filterDataByTimeRange(plantHistory, timeRange);
        return aggregateData(filtered, timeRange);
    }, [plantHistory, timeRange]);

    const labels = processedData.map(item => item.label);

    const datasets = [
        {
            label: 'Temperatura del agua',
            data: processedData.map(item => item.water_temperature),
            borderColor: antdColorOptions[2][5],
            backgroundColor: antdColorOptions[2][4],
            yAxisID: 'y-axis-1',
            fill: false,
            tension: 0.4, // Curvas suaves
        },
        {
            label: 'Temperatura ambiente',
            data: processedData.map(item => item.ambient_temperature),
            borderColor: antdColorOptions[3][5],
            backgroundColor: antdColorOptions[3][4],
            yAxisID: 'y-axis-1',
            fill: false,
            tension: 0.4,
        },
        {
            label: 'PH del agua',
            data: processedData.map(item => item.ph_level),
            borderColor: antdColorOptions[4][5],
            backgroundColor: antdColorOptions[4][4],
            yAxisID: 'y-axis-2',
            fill: false,
            tension: 0.4,
        },
        {
            label: 'Conductividad',
            data: processedData.map(item => item.electrical_conductivity),
            borderColor: antdColorOptions[5][5],
            backgroundColor: antdColorOptions[5][4],
            yAxisID: 'y-axis-2',
            fill: false,
            tension: 0.4,
        },
    ];

    const data = {
        labels,
        datasets,
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Permite que el gráfico tome toda la altura disponible
        interaction: {
            mode: 'index',
            intersect: false,
        },
        stacked: false,
        scales: {
            'y-axis-1': {
                type: 'linear',
                display: true,
                position: 'left',
                title: {
                    display: true,
                    text: 'Temperatura (°C)',
                },
            },
            'y-axis-2': {
                type: 'linear',
                display: true,
                position: 'right',
                grid: {
                    drawOnChartArea: false, // Solo dibuja la cuadrícula para el eje izquierdo
                },
                title: {
                    display: true,
                    text: 'PH / Conductividad',
                },
            },
            x: {
                ticks: {
                    maxRotation: 45,
                    minRotation: 45,
                    autoSkip: true,
                    maxTicksLimit: maxTicksLimit,
                    callback: function(value, index, values) {
                        return this.getLabelForValue(value);
                    },
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
                font: {
                    size: 24,
                },
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: (tooltipItems) => {
                        return `Fecha: ${tooltipItems[0].label}`;
                    },
                    label: (tooltipItem) => {
                        return `${tooltipItem.dataset.label}: ${tooltipItem.formattedValue}`;
                    },
                },
            },
        },
    };

    return (
        <div className="h-full w-full flex flex-col">
            {/* Select para cambiar el rango de tiempo */}
            <div className="p-2 lg:p-4">
                <Select
                    value={timeRange}
                    onChange={value => setTimeRange(value)}
                    style={{ width: 200 }}
                    options={[
                        { label: 'Última Hora', value: 'hour' },
                        { label: 'Último Día', value: 'day' },
                        { label: 'Última Semana', value: 'week' },
                        { label: 'Último Mes', value: 'month' },
                        { label: 'Todo el Tiempo', value: 'all' },
                    ]}
                />
            </div>
            {/* Contenedor del gráfico */}
            <div className="flex-grow h-full w-full p-2 lg:p-4">
                <Line data={data} options={options} />
            </div>
        </div>
    );
};

export default HidroponicsChart;
