export function rrScheduler(processes, timeQuantum) 
{
    let time = 0;
    let result = [];
    let queue = [...processes].map((p) => ({ ...p, remainingTime: p.burstTime }));

    while (queue.length > 0) {
        let process = queue.shift(); // Take the first process

        if (time < process.arrivalTime) 
        {
            time = process.arrivalTime; // Fast-forward time if CPU is idle
        }

        let executionTime = Math.min(process.remainingTime, timeQuantum);

        for (let i = 0; i < executionTime; i++) 
        {
            result.push({ processId: process.id, time: time + i });
        }

        time += executionTime;
        process.remainingTime -= executionTime;

        if (process.remainingTime > 0) 
        {
            queue.push(process); // Put it back in the queue if not done
        }
    }
    return result;
}

