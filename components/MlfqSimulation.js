import { useState } from "react";
import { mlfqScheduler } from "../utils/mlfq";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";

export default function MlfqSimulation() 
{
    const [processes, setProcesses] = useState([]);
    const [result, setResult] = useState([]);

    // Generate random processes
    const generateProcesses = () => {
        const num = Math.floor(Math.random() * 5) + 3; // Random 3-7 processes
        const newProcesses = Array.from({ length: num }, (_, i) => ({
            id: i + 1,
            arrivalTime: Math.floor(Math.random() * 5),
            burstTime: Math.floor(Math.random() * 15) + 1,
        }));
        setProcesses(newProcesses);
    };

    // Run MLFQ Scheduling
    const runMlfq = () => {
        if (processes.length === 0) 
        {
            alert("Please generate processes first!");
            return;
        }

        const output = mlfqScheduler(processes);
        console.log("MLFQ Output:", output);
        setResult([...output]);
    };

    // Generate PDF
    const downloadPDF = () => {
        if (result.length === 0) 
        {
            alert("Run the simulation first!");
            return;
        }

        const doc = new jsPDF();
        doc.text("Multi-Level Feedback Queue Scheduling Results", 10, 10);
        result.forEach((entry, i) => {
            doc.text(`Time ${entry.time}: Process ${entry.processId} (Queue ${entry.queue})`, 10, 20 + i * 10);
        });
        doc.save("mlfq_results.pdf");
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">MLFQ Scheduling Simulation</h2>
            <button onClick={generateProcesses} className="bg-blue-500 text-white px-4 py-2 mr-2">Generate Processes</button>
            <button onClick={runMlfq} className="bg-green-500 text-white px-4 py-2">Run MLFQ</button>
            <button onClick={downloadPDF} className="bg-red-500 text-white px-4 py-2 ml-2">Download PDF</button>

            <div className="mt-4">
                <h3 className="font-semibold">Processes:</h3>
                <pre>{JSON.stringify(processes, null, 2)}</pre>
            </div>

            {result.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold">Execution Timeline:</h3>
                    <Bar
                        key={result.length} // Forces re-render
                        data={{
                            labels: result.map((r) => `T${r.time}`),
                            datasets: [
                                {
                                    label: "Queue 0 (Highest Priority)",
                                    data: result.map((r) => (r.queue === 0 ? r.processId : null)),
                                    backgroundColor: "rgba(255,99,132,0.6)",
                                },
                                {
                                    label: "Queue 1",
                                    data: result.map((r) => (r.queue === 1 ? r.processId : null)),
                                    backgroundColor: "rgba(54,162,235,0.6)",
                                },
                                {
                                    label: "Queue 2 (Lowest Priority)",
                                    data: result.map((r) => (r.queue === 2 ? r.processId : null)),
                                    backgroundColor: "rgba(75,192,192,0.6)",
                                },
                            ],
                        }}
                        options={{
                            responsive: true,
                            scales: {
                                y: {
                                    stacked: true,
                                    title: {
                                        display: true,
                                        text: "Process ID",
                                    },
                                },
                                x: {
                                    title: {
                                        display: true,
                                        text: "Time",
                                    },
                                },
                            },
                        }}
                    />
                </div>
            )}
        </div>
    );
}