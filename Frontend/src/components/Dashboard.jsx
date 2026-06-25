import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Bar, Doughnut } from "react-chartjs-2";
import CountUp from "react-countup";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Dashboard({ result }) {
  if (!result) return null;

  const installed = result.detected_panels;
  const maxPanels = result.max_panels_possible;
  const extraPanels = Math.max(0, maxPanels - installed);

  const currentCapacity = installed * 0.55;
  const maxCapacity = maxPanels * 0.55;
  const extraCapacity = extraPanels * 0.55;

  const currentEnergy = currentCapacity * 1500;
  const maxEnergy = maxCapacity * 1500;
  const extraEnergy = extraCapacity * 1500;

  const currentSavings = currentEnergy * 8;
  const extraSavings = extraEnergy * 8;

  const co2Saved = maxEnergy * 0.82;

  const utilization =
    maxPanels > 0
      ? ((installed / maxPanels) * 100).toFixed(1)
      : 0;

  const capacityData = {
    labels: [
      "Current",
      "Additional",
      "Maximum",
    ],
    datasets: [
      {
        label: "Capacity (kW)",
        data: [
          currentCapacity,
          extraCapacity,
          maxCapacity,
        ],
        backgroundColor: [
          "#00D4B4",
          "#F5A623",
          "#8B5CF6",
        ],
      },
    ],
  };

  const energyData = {
    labels: [
      "Current",
      "Additional",
    ],
    datasets: [
      {
        data: [
          currentEnergy,
          extraEnergy,
        ],
        backgroundColor: [
          "#00D4B4",
          "#F5A623",
        ],
      },
    ],
  };

  return (
    <div className="dashboard">

      <h1>Solar Analytics Dashboard</h1>

      <div className="stats-grid">
        <div className="card">
          <h3>Detected Panels</h3>
          <h2>
            <CountUp end={installed} />
          </h2>
        </div>

        <div className="card">
          <h3>Roof Area</h3>
          <h2>
            <CountUp
              end={result.roof_area_m2}
              decimals={1}
            />
            m²
          </h2>
        </div>

        <div className="card">
          <h3>Additional Panels</h3>
          <h2>
            <CountUp end={extraPanels} />
          </h2>
        </div>

        <div className="card">
          <h3>Maximum Capacity</h3>
          <h2>
            {maxCapacity.toFixed(1)} kW
          </h2>
        </div>

        <div className="card">
          <h3>Annual Energy</h3>
          <h2>
            {Math.round(maxEnergy).toLocaleString()}
            kWh
          </h2>
        </div>

        <div className="card">
          <h3>Annual Savings</h3>
          <h2>
            ₹
            {Math.round(
              currentSavings +
                extraSavings
            ).toLocaleString()}
          </h2>
        </div>
      </div>

      <div className="charts">

        <div className="chart-card">
          <h2>Capacity Analysis</h2>
          <Bar data={capacityData} />
        </div>

        <div className="chart-card">
          <h2>Energy Generation</h2>
          <Doughnut
            data={energyData}
          />
        </div>

      </div>

      <div className="ai-card">
        <h2>AI Recommendations</h2>

        <p>
          ⚡ Install{" "}
          <strong>{extraPanels}</strong>
          {" "}additional solar panels.
        </p>

        <p>
          🔋 Generate{" "}
          <strong>
            {Math.round(
              extraEnergy
            ).toLocaleString()}
            {" "}kWh/year
          </strong>
          {" "}of extra electricity.
        </p>

        <p>
          💰 Save approximately{" "}
          <strong>
            ₹
            {Math.round(
              extraSavings
            ).toLocaleString()}
          </strong>
          {" "}every year.
        </p>

        <p>
          🌍 Reduce nearly{" "}
          <strong>
            {(
              co2Saved / 1000
            ).toFixed(1)}
            {" "}tons
          </strong>
          {" "}of CO₂ emissions annually.
        </p>

        <p>
          🏠 Roof utilization:
          {" "}
          <strong>
            {utilization}%
          </strong>
        </p>
      </div>
    </div>
  );
}