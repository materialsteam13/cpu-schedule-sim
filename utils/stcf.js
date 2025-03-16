export function stcfScheduler(processes) 
{
    let time = 0;
    let completed = 0;
    let n = processes.length;
    let queue = [];
    let result = [];
    
    // Sort processes by arrival time
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    while (completed < n) 
        {
        // Add processes that have arrived to the queue
        for (let i = 0; i < processes.length; i++) 
        {
            if (processes[i].arrivalTime === time) 
            {
                queue.push({ ...processes[i] });
                queue.sort((a, b) => a.burstTime - b.burstTime);
            }
        }

        if (queue.length > 0) 
        {
            // Pick the shortest remaining process
            let current = queue[0];
            current.burstTime -= 1; // Process 1 time unit

            result.push({ processId: current.id, time });

            if (current.burstTime === 0) 
            {
                completed++;
                current.completionTime = time + 1;
                queue.shift(); // Remove from queue
            }
        }
        time++;
    }

    return result;
}
