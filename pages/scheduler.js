import { useState } from 'react';
import { fifoScheduler } from '../utils/fifo';

export default function Scheduler() {
    const [results, setResults] = useState([]);

    const runFIFO = () => {
        const processes = [
            { id: 1, arrivalTime: 3, burstTime: 7 },
            { id: 2, arrivalTime: 1, burstTime: 5 },
            { id: 3, arrivalTime: 2, burstTime: 2 }
        ];
        setResults(fifoScheduler(processes));
    };

    return (
        <div>
            <h1>CPU Scheduling Simulator</h1>
            <button onClick={runFIFO}>Run FIFO</button>
            <ul>
                {results.map((process, index) => (
                    <li key={index}>
                        Process {process.id}: Arrival Time {process.arrivalTime}, Burst Time {process.burstTime}
                    </li>
                ))}
            </ul>
        </div>
    );
}
