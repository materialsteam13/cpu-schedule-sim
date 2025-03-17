import { useState, useEffect } from "react";
import { sjfScheduler } from "../utils/sjf";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";

export default function SjfSimulation({ numProcesses }) {
    const [processes, setProcesses] = useState([]);
    const [result, setResult] = useState([]);

    // Generate processes when numProcesses changes
    useEffect(() => {
        generateProcesses();
    }, [numProcesses]); 

    const generateProcesses = () => {
        const newProcesses = Array.from({ length: numProcesses }, (_, i) => ({
            id: i + 1,
            arrivalTime: Math.floor(Math.random() * 5), // Random arrival time between 0-4
            burstTime: Math.floor(Math.random() * 10) + 1, // Random burst time between 1-10
        }));
        setProcesses(newProcesses);
    };

    // Run SJF Scheduling
    const runSjf = () => {
        if (processes.length === 0) {
            alert("No processes available! Try generating them first.");
            return;
        }

        const output = sjfScheduler(processes);
        console.log("SJF Output:", output);
        setResult([...output]);
    };

    // Generate PDF
    const downloadPDF = () => {
        if (result.length === 0) {
            alert("Run the simulation first!");
            return;
        }

        const doc = new jsPDF();
        doc.text("Shortest Job First Scheduling Results", 10, 10);
        result.forEach((entry, i) => {
            doc.text(`Time ${entry.time}: Process ${entry.processId}`, 10, 20 + i * 10);
        });
        doc.save("sjf_results.pdf");
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">SJF Scheduling Simulation</h2>
            <button onClick={generateProcesses} className="bg-blue-500 text-white px-4 py-2 mr-2">
                Generate Processes
            </button>
            <button onClick={runSjf} className="bg-green-500 text-white px-4 py-2">
                Run SJF
            </button>
            <button onClick={downloadPDF} className="bg-red-500 text-white px-4 py-2 ml-2">
                Download PDF
            </button>

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
                                    label: "Process Execution",
                                    data: result.map((r) => r.processId),
                                    backgroundColor: "rgba(54,162,235,0.6)",
                                },
                            ],
                        }}
                    />
                </div>
            )}
        </div>
    );
}