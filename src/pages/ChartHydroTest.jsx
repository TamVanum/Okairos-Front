import React, { useState } from "react";
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";

import { plantHistory } from "./hydrochartdata";
import { antdColorOptions } from "../utils/colorOptions";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const groupByTimeFrame = (data, timeframe) => {
    const grouped = {};
    data.forEach((entry) => {
        let key;
        const date = new Date(entry.timestamp);

        if (timeframe === "hours") {
            key = date.toLocaleDateString("es-ES", { hour: "2-digit", minute: "2-digit" });
        } else if (timeframe === "days") {
            key = date.toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "short" });
        } else if (timeframe === "weeks") {
            const week = `${date.getFullYear()}-W${Math.ceil(date.getDate() / 7)}`;
            key = week;
        } else if (timeframe === "months") {
            key = date.toLocaleDateString("es-ES", { month: "long", year: "numeric" });
        }

        if (!grouped[key]) {
            grouped[key] = {
                water_temperature: [],
                ambient_temperature: [],
                ph_level: [],
                electrical_conductivity: [],
            };
        }

        grouped[key].water_temperature.push(entry.water_temperature);
        grouped[key].ambient_temperature.push(entry.ambient_temperature);
        grouped[key].ph_level.push(entry.ph_level);
        grouped[key].electrical_conductivity.push(entry.electrical_conductivity);
    });

    return Object.keys(grouped).map((label) => ({
        label,
        water_temperature: grouped[label].water_temperature.reduce((a, b) => a + b, 0) / grouped[label].water_temperature.length,
        ambient_temperature: grouped[label].ambient_temperature.reduce((a, b) => a + b, 0) / grouped[label].ambient_temperature.length,
        ph_level: grouped[label].ph_level.reduce((a, b) => a + b, 0) / grouped[label].ph_level.length,
        electrical_conductivity: grouped[label].electrical_conductivity.reduce((a, b) => a + b, 0) / grouped[label].electrical_conductivity.length,
    }));
};

const ChartHydroTest = () => {
    const [timeframe, setTimeframe] = useState("hours");

    // Dynamically group data
    const groupedData = groupByTimeFrame(plantHistory, timeframe);

    // Extract labels and datasets
    const labels = groupedData.map((item) => item.label);
    const waterTemperature = groupedData.map((item) => item.water_temperature);
    const ambientTemperature = groupedData.map((item) => item.ambient_temperature);
    const phLevel = groupedData.map((item) => item.ph_level);
    const electricalConductivity = groupedData.map((item) => item.electrical_conductivity);

    const datasets = [
        {
            label: "Temperatura del agua (°C)",
            data: waterTemperature,
            borderColor: antdColorOptions[2][5],
            backgroundColor: antdColorOptions[2][4],
            yAxisID: "y-axis-1",
        },
        {
            label: "Temperatura ambiente (°C)",
            data: ambientTemperature,
            borderColor: antdColorOptions[3][5],
            backgroundColor: antdColorOptions[3][4],
            yAxisID: "y-axis-1",
        },
        {
            label: "PH del agua",
            data: phLevel,
            borderColor: antdColorOptions[4][5],
            backgroundColor: antdColorOptions[4][4],
            yAxisID: "y-axis-2",
        },
        {
            label: "Conductividad eléctrica (µS/cm)",
            data: electricalConductivity,
            borderColor: antdColorOptions[5][5],
            backgroundColor: antdColorOptions[5][4],
            yAxisID: "y-axis-3",
        },
    ];

    const data = {
        labels,
        datasets,
    };

    const options = {
        responsive: true,
        scales: {
            "y-axis-1": {
                type: "linear",
                display: true,
                position: "left",
                title: {
                    display: true,
                    text: "Temperatura (°C)",
                },
            },
            "y-axis-2": {
                type: "linear",
                display: true,
                position: "right",
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: "pH",
                },
            },
            "y-axis-3": {
                type: "linear",
                display: true,
                position: "right",
                grid: {
                    drawOnChartArea: false,
                },
                title: {
                    display: true,
                    text: "Conductividad eléctrica (µS/cm)",
                },
            },
        },
        plugins: {
            legend: {
                position: "top",
            },
            title: {
                display: true,
                text: "Estado de Hidroponía",
            },
        },
    };

    return (
        <div>
            <div style={{ marginBottom: "1rem" }}>
                <label htmlFor="timeframe">Selecciona un marco de tiempo:</label>
                <select
                    id="timeframe"
                    value={timeframe}
                    onChange={(e) => setTimeframe(e.target.value)}
                    style={{ marginLeft: "0.5rem" }}
                >
                    <option value="hours">Horas</option>
                    <option value="days">Días</option>
                    <option value="weeks">Semanas</option>
                    <option value="months">Meses</option>
                </select>
            </div>
            <Line data={data} options={options} />
        </div>
    );
};

export default ChartHydroTest;
