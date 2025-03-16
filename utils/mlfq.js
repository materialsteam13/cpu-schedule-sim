export function mlfqScheduler(processes, timeQuantums = [2, 4, 8]) 
{
    let time = 0;
    let result = [];
    
    // Create three priority queues
    let queues = [[], [], []];

    // Sort processes by arrival time
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    // Add processes to the highest priority queue (queue 0)
    processes.forEach(process => {
        queues[0].push({ ...process, remainingTime: process.burstTime, queueLevel: 0 });
    });

    while (queues.some(queue => queue.length > 0)) {
        let executed = false;

        for (let level = 0; level < queues.length; level++) 
        {
            if (queues[level].length > 0) 
            {
                let process = queues[level].shift(); // Get the first process from this queue

                if (time < process.arrivalTime) 
                {
                    time = process.arrivalTime; // Fast-forward time if CPU is idle
                }

                let executionTime = Math.min(process.remainingTime, timeQuantums[level]);

                for (let i = 0; i < executionTime; i++) 
                {
                    result.push({ processId: process.id, time: time + i, queue: level });
                }

                time += executionTime;
                process.remainingTime -= executionTime;

                if (process.remainingTime > 0) 
                {
                    // Move to a lower queue if possible
                    let nextQueue = Math.min(level + 1, queues.length - 1);
                    queues[nextQueue].push({ ...process, queueLevel: nextQueue });
                }

                executed = true;
                break; // Restart loop from highest-priority queue
            }
        }

        // If no process was executed, move time forward to next process arrival
        if (!executed) 
        {
            time++;
        }
    }

    return result;
}