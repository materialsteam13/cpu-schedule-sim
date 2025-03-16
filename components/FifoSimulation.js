import { useState } from "react";
import { fifoScheduler } from "../utils/fifo";
import { Bar } from "react-chartjs-2";
import Chart from "chart.js/auto";
import jsPDF from "jspdf";

export default function FifoSimulation() 
{
    const [processes, setProcesses] = useState([]);
    const [result, setResult] = useState([]);

    // Generate random processes
    const generateProcesses = () => {
        const num = Math.floor(Math.random() * 5) + 3; // Random 3-7 processes
        const newProcesses = Array.from({ length: num }, (_, i) => ({
            id: i + 1,
            arrivalTime: Math.floor(Math.random() * 5),
            burstTime: Math.floor(Math.random() * 10) + 1,
        }));
        setProcesses(newProcesses);
    };

    // Run FIFO Scheduling
    const runFifo = () => {
        if (processes.length === 0) 
        {
            alert("Please generate processes first!");
            return;
        }

        const output = fifoScheduler(processes);
        console.log("FIFO Output:", output);
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
        doc.text("FIFO Scheduling Results", 10, 10);
        result.forEach((entry, i) => {
            doc.text(`Time ${entry.time}: Process ${entry.processId}`, 10, 20 + i * 10);
        });
        doc.save("fifo_results.pdf");
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">FIFO Scheduling Simulation</h2>
            <button onClick={generateProcesses} className="bg-blue-500 text-white px-4 py-2 mr-2">Generate Processes</button>
            <button onClick={runFifo} className="bg-green-500 text-white px-4 py-2">Run FIFO</button>
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
                                    label: "Process Execution",
                                    data: result.map((r) => r.processId),
                                    backgroundColor: "rgba(255,99,132,0.6)",
                                },
                            ],
                        }}
                    />
                </div>
            )}
        </div>
    );
}