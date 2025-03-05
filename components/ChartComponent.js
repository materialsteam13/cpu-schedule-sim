"use client";

import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function ChartComponent() {
    const data = {
        labels: ["Process 1", "Process 2", "Process 3"],
        datasets: [
            {
                label: "Execution Time",
                data: [10, 15, 7],
                backgroundColor: ["rgba(46, 143, 143, 0.6)"],
                borderColor: ["rgb(77, 107, 107)"],
                borderWidth: 1
            }
        ]
    };

    return <Bar data={data} />;
}
