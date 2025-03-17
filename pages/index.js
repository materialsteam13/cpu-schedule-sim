import { useState } from "react";
import StcfSimulation from "../components/StcfSimulation";
import SjfSimulation from "../components/SjfSimulation";
import RrSimulation from "../components/RrSimulation";
import FifoSimulation from "../components/FifoSimulation";
import MlfqSimulation from "../components/MlfqSimulation";

export default function Home() {
    const [selectedSimulations, setSelectedSimulations] = useState([]);
    const [numProcesses, setNumProcesses] = useState(5); // Default to 5 processes

    const simulations = [
        { name: "FIFO", component: (num) => <FifoSimulation numProcesses={num} />, key: "fifo" },
        { name: "SJF", component: (num) => <SjfSimulation numProcesses={num} />, key: "sjf" },
        { name: "RR", component: (num) => <RrSimulation numProcesses={num} />, key: "rr" },
        { name: "STCF", component: (num) => <StcfSimulation numProcesses={num} />, key: "stcf" },
        { name: "MLFQ", component: (num) => <MlfqSimulation numProcesses={num} />, key: "mlfq" },
    ];

    const toggleSimulation = (key) => {
        setSelectedSimulations((prev) =>
            prev.includes(key) ? prev.filter((sim) => sim !== key) : [...prev, key]
        );
    };

    const selectAll = () => {
        setSelectedSimulations((prev) =>
            prev.length === simulations.length ? [] : simulations.map((sim) => sim.key)
        );
    };

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4 text-center">CPU Scheduling Simulator</h1>

            {/* User Input for Number of Processes */}
            <div className="mb-4 text-center">
                <label className="mr-2 font-semibold">Number of Processes:</label>
                <input
                    type="number"
                    min="1"
                    max="32"
                    value={numProcesses}
                    onChange={(e) => setNumProcesses(Math.max(1, Math.min(32, parseInt(e.target.value) || 1)))}
                    className="border px-2 py-1 rounded"
                />
            </div>

            {/* Buttons to Select Algorithm */}
            <div className="flex flex-wrap justify-center gap-4 mb-6">
                {simulations.map((sim) => (
                    <button
                        key={sim.key}
                        onClick={() => toggleSimulation(sim.key)}
                        className={`px-4 py-2 rounded-lg shadow-md ${
                            selectedSimulations.includes(sim.key) ? "bg-green-500 text-white" : "bg-gray-300 text-black"
                        }`}
                    >
                        {sim.name}
                    </button>
                ))}
                <button
                    onClick={selectAll}
                    className={`px-4 py-2 rounded-lg shadow-md ${
                        selectedSimulations.length === simulations.length ? "bg-red-500 text-white" : "bg-blue-500 text-white"
                    }`}
                >
                    {selectedSimulations.length === simulations.length ? "Deselect All" : "Run All"}
                </button>
            </div>

            {/* Display Selected Simulations */}
            <div className={`grid ${selectedSimulations.length > 1 ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"} gap-6`}>
                {simulations
                    .filter((sim) => selectedSimulations.includes(sim.key))
                    .map((sim) => (
                        <div key={sim.key} className="p-4 border rounded-lg shadow">
                            <h2 className="text-xl font-semibold">{sim.name} Scheduling</h2>
                            {sim.component(numProcesses)}
                        </div>
                    ))}
            </div>
        </div>
    );
}
