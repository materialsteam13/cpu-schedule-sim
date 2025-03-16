export function fifoScheduler(processes) 
{
    let time = 0;
    let result = [];

    // Sort by arrival time
    const queue = [...processes].sort((a, b) => a.arrivalTime - b.arrivalTime);

    queue.forEach((process) => {
        // If CPU is idle, fast-forward time
        if (time < process.arrivalTime) 
        {
            time = process.arrivalTime;
        }

        for (let i = 0; i < process.burstTime; i++) 
        {
            result.push({ processId: process.id, time: time + i });
        }

        time += process.burstTime; // Move time forward
    });

    return result;
}