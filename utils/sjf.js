function sjfScheduler(processes)
{
    return processes.sort((a, b) => a.burstTime - b.burstTime);
}

module.exports = { sjfScheduler };