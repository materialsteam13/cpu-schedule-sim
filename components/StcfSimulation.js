import { useState } from "react";
import { stcfScheduler } from "../utils/stcf";
import { Bar } from "react-chartjs-2";
//import Chart from "chart.js/auto";
import jsPDF from "jspdf";

export default function StcfSimulation() 
{
    const [processes, setProcesses] = useState([]);
    const [result, setResult] = useState([]);

    // Generate random processes
    const generateProcesses = () => 
    {
        const num = Math.floor(Math.random() * 5) + 3; // Random 3-7 processes
        const newProcesses = Array.from({ length: num }, (_, i) => ({
            id: i + 1,
            arrivalTime: Math.floor(Math.random() * 5),
            burstTime: Math.floor(Math.random() * 10) + 1,
        }));
        setProcesses(newProcesses);
    };

    // Run STCF Scheduling
    const runStcf = () => 
    {
        const output = stcfScheduler(processes);
        setResult(output);
    };

    // Generate PDF
    const downloadPDF = () => 
    {
        const doc = new jsPDF();
        doc.text("STCF Scheduling Results", 10, 10);
        result.forEach((entry, i) => {
            doc.text(`Time ${entry.time}: Process ${entry.processId}`, 10, 20 + i * 10);
        });
        doc.save("stcf_results.pdf");
    };

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">STCF Scheduling Simulation</h2>
            <button onClick={generateProcesses} className="bg-blue-500 text-white px-4 py-2 mr-2">Generate Processes</button>
            <button onClick={runStcf} className="bg-green-500 text-white px-4 py-2">Run STCF</button>
            <button onClick={downloadPDF} className="bg-red-500 text-white px-4 py-2 ml-2">Download PDF</button>

            <div className="mt-4">
                <h3 className="font-semibold">Processes:</h3>
                <pre>{JSON.stringify(processes, null, 2)}</pre>
            </div>

            {result.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold">Execution Timeline:</h3>
                    <Bar
                        data={{
                            labels: result.map((r) => `T${r.time}`),
                            datasets: [
                                {
                                    label: "Process Execution",
                                    data: result.map((r) => r.processId),
                                    backgroundColor: "rgba(75,192,192,0.6)",
                                },
                            ],
                        }}
                    />
                </div>
            )}
        </div>
    );
}
