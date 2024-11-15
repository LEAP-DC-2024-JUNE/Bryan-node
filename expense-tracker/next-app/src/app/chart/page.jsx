"use client";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  ResponsiveContainer,
} from "recharts";

const ChartPage = () => {
  const expenses = [
    {
      id: 1,
      date: "2024-11-12",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet incidunt, veniam sint distinctio voluptas nisi?",
      type: "Housing",
      amount: 1200,
    },
    {
      id: 2,
      date: "2024-11-13",
      description: "Groceries",
      type: "Food",
      amount: 150,
    },
    {
      id: 3,
      date: "2024-11-14",
      description: "Utilities",
      type: "Bills",
      amount: 100,
    },
  ];
  if (typeof window === "undefined") return null;
  return (
    <div className="p-10">
      {/* <ResponsiveContainer width={"100%"}>
        <BarChart data={expenses}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" name={"Amount"} />
        </BarChart>
      </ResponsiveContainer> */}
    </div>
  );
};

export default ChartPage;
