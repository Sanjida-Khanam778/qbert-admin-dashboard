import { useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import Revenue from "../Charts/Revenue";
import up from "../../assets/images/up.png";
import down from "../../assets/images/down.png";
const Overview = () => {
  const [sortBy, setSortBy] = useState("yearly");

  // Fetch data from APIs

  const data = [
    { name: "5k", value: 25 },
    { name: "10k", value: 30 },
    { name: "15k", value: 45 },
    { name: "20k", value: 95, highlight: true, tooltipValue: "64,364" },
    { name: "25k", value: 55 },
    { name: "30k", value: 50 },
    { name: "35k", value: 60 },
    { name: "40k", value: 25 },
    { name: "45k", value: 70 },
    { name: "50k", value: 65 },
    { name: "55k", value: 55 },
    { name: "60k", value: 60 },
  ];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (data.highlight) {
        return (
          <div className="bg-slate-800 text-white px-3 py-2 rounded shadow-lg text-sm">
            {data.tooltipValue}
          </div>
        );
      }
    }
    return null;
  };

  const metrics = [
    {
      title: "Total Users",
      value: "40,689",
      percentage: "8.5%",
      text: "Up from ye saturday",
      image: up,
    },
    {
      title: "Total Active Users",
      value: "10,293",
      percentage: "1.3%",
      text: " Up from past week",
      image: up,
    },
    {
      title: "Total Revenue",
      value: "$89,000",
      percentage: "4.3%",
      text: " Down from yesterday",
      image: down,
    },
  ];

  return (
    <div className="p-6 h-[90vh] overflow-y-scroll">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto bg-white">
        {metrics.map((metric, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 border-2 border-gray shadow-md transition-shadow duration-200"
          >
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-dark/70 tracking-wide">
                {metric.title}
              </h3>
              <div className="text-3xl font-bold text-primary">
                {metric.value}
              </div>
              <div className="text-xl font-bold text-dark/70 flex items-center">
                <img src={metric.image} alt="" />{" "}
                <span
                  className={`text-[#00B69B] mx-2 ${
                    metric.percentage === "4.3%"
                      ? "text-[#F93C65]"
                      : "text-[#00B69B]"
                  }`}
                >
                  {metric.percentage}
                </span>{" "}
                {metric.text}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-6xl mx-auto mt-10">
        <div className="bg-white rounded-xl p-6 mb-10 shadow-md border-2 border-gray">
          {/* Chart Header */}
          <div className="flex justify-between items-start mb-8">
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Total Revenue
              </h2>
              <div className="flex items-center space-x-8">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-gray-800"></div>
                  <span className="text-sm font-medium text-gray-700">
                    This year
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="text-sm border border-dark/40 rounded-md px-3 py-1 bg-white text-dark/50 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="september">September</option>
                <option value="october">October</option>
                <option value="november">November</option>
                <option value="december">December</option>
                <option value="january">January</option>
                <option value="february">February</option>
                <option value="march">March</option>
                <option value="april">April</option>
                <option value="may">May</option>
                <option value="june">June</option>
                <option value="july">July</option>
                <option value="august">August</option>
              </select>
            </div>
          </div>

          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
              >
                <defs>
                  <linearGradient
                    id="colorGradient"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#0E4269" stopOpacity={0.65} />
                    <stop
                      offset="100%"
                      stopColor="#e2e8f0"
                      stopOpacity={0.05}
                    />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  dy={10}
                />
                <YAxis
                  domain={[0, 100]}
                  tickFormatter={(value) => `${value}%`}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: "#9ca3af" }}
                  dx={-10}
                />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#0E4269"
                  strokeWidth={2}
                  fill="url(#colorGradient)"
                  dot={{ fill: "#0E4269", strokeWidth: 2, r: 4 }}
                  activeDot={{ r: 6, fill: "#0E4269" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Revenue Component */}
        <Revenue />
      </div>
    </div>
  );
};

export default Overview;
