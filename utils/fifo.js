function fifoScheduler(processes)
{
    // Sorting process by arrival time; First process in, is first process out.
    return processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
}

module.exports = { fifoScheduler };