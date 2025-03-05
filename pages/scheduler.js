import dynamic from "next/dynamic";
const ChartComponent = dynamic(() => import("../components/ChartComponent"), { ssr: false });

export default function Scheduler() {
    return (
        <div>
            <h1>CPU Scheduling Visualization</h1>
            <ChartComponent />
        </div>
    );
}
