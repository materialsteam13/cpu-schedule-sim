import { useState } from "react";
import StcfSimulation from "../components/StcfSimulation";
import SjfSimulation from "../components/SjfSimulation";
import RrSimulation from "../components/RrSimulation";
import FifoSimulation from "../components/FifoSimulation";
import MlfqSimulation from "../components/MlfqSimulation";

export default function Home() 
{
    const [selectedSimulations, setSelectedSimulations] = useState([]);
    const [numProcesses, setNumProcesses] = useState(5); // default of 5

    const simulations = [
        { name: "FIFO", component: <FifoSimulation />, key: "fifo" },
        { name: "SJF", component: <SjfSimulation />, key: "sjf" },
        { name: "RR", component: <RrSimulation />, key: "rr" },
        { name: "STCF", component: <StcfSimulation />, key: "stcf" },
        { name: "MLFQ", component: <MlfqSimulation />, key: "mlfq" },

    ];

    const toggleSimulation = (key) => {
        if (selectedSimulations.includes(key)) 
        {
            setSelectedSimulations(selectedSimulations.filter((sim) => sim !== key));
        } else {
            setSelectedSimulations([...selectedSimulations, key]);
        }
    };

    const selectAll = () => {
        if (selectedSimulations.length === simulations.length) {
            setSelectedSimulations([]); // Deselect all
        } else {
            setSelectedSimulations(simulations.map((sim) => sim.key)); // Select all
        }
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
                    max="20"
                    value={numProcesses}
                    onChange={(e) => setNumProcesses(parseInt(e.target.value) || 1)}
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
                            {sim.component}
                        </div>
                    ))}
            </div>
        </div>
    );
}
