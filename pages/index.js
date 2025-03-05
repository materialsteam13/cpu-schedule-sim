import { useState } from 'react';
import { fifoScheduler } from '../utils/fifo';
import { sjfScheduler } from '../utils/sjf';
import { rrScheduler } from '../utils/rr';
import ChartComponent from '../components/ChartComponent';

export default function Home() {
    const [results, setResults] = useState([]);

    const runScheduling = (algorithm) => {
        const processes = [
            { arrivalTime: 0, burstTime: 8 },
            { arrivalTime: 1, burstTime: 4 }
        ];
        let output = [];

        if (algorithm === 'FIFO') output = fifoScheduler(processes);
        else if (algorithm === 'SJF') output = sjfScheduler(processes);
        else if (algorithm === 'RR') output = rrScheduler(processes, 2);

        setResults(output);
    };

    return (
        <div>
            <h1>CPU Scheduling Simulator</h1>
            <button onClick={() => runScheduling('FIFO')}>Run FIFO</button>
            <button onClick={() => runScheduling('SJF')}>Run SJF</button>
            <button onClick={() => runScheduling('RR')}>Run RR</button>
            <ChartComponent results={results} />
        </div>
    );
}
