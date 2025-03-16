export function sjfScheduler(processes) 
{
    let time = 0;

    let result = [];

    let queue = [...processes];

    // Sort by arrival time first, then burst time
    queue.sort((a, b) => a.arrivalTime - b.arrivalTime || a.burstTime - b.burstTime);

    while (queue.length > 0) 
    {
        let availableProcesses = queue.filter(p => p.arrivalTime <= time);
        
        if (availableProcesses.length === 0) 
        {
            // If no process is available, fast-forward time to next arrival
            time = queue[0].arrivalTime;
            continue;
        }

        // Select process with shortest burst time
        let process = availableProcesses.reduce((prev, curr) => 
            curr.burstTime < prev.burstTime ? curr : prev
        );

        queue = queue.filter(p => p.id !== process.id); // Remove from queue

        for (let i = 0; i < process.burstTime; i++) 
        {
            result.push({ processId: process.id, time: time + i });
        }

        time += process.burstTime;
    }

    return result;
}