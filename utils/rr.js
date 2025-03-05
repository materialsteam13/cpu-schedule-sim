function rrScheduler(processes, timeQuantum) {
    let queue = [...processes];
    let time = 0;
    let result = [];

    while (queue.length > 0) {
        let process = queue.shift();
        if (process.burstTime > timeQuantum) {
            result.push({ ...process, executedTime: timeQuantum });
            process.burstTime -= timeQuantum;
            queue.push(process);
        } else {
            result.push({ ...process, executedTime: process.burstTime });
        }
        time += timeQuantum;
    }

    return result;
}

module.exports = { rrScheduler };