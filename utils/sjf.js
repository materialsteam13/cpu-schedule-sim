export function sjfScheduler(processes) {
    let time = 0;
    let completed = 0;
    let n = processes.length;
    let queue = [];
    let result = [];

    // Sort by arrival time first
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    while (completed < n) {
        // Add processes that have arrived to the queue
        for (let i = 0; i < processes.length; i++) {
            if (processes[i].arrivalTime === time) {
                queue.push({ ...processes[i] });
                queue.sort((a, b) => a.burstTime - b.burstTime); // Sort by shortest burst time
            }
        }

        if (queue.length > 0) {
            // Select shortest job
            let current = queue.shift();
            for (let i = 0; i < current.burstTime; i++) {
                result.push({ processId: current.id, time: time + i });
            }

            time += current.burstTime; // Move time forward
            completed++;
        } else {
            time++; // No process available, move time forward
        }
    }

    return result;
}