"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import Loading from "@/components/Loading";
import moment from "moment";
import { execOnce } from "next/dist/shared/lib/utils";
import { v4 } from "uuid";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MyBarChart = () => {
  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentYear, setCurrentYear] = useState("2024");
  // const [datasets, setDatasets] = useState([
  //   0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  // ]);
  const [data, setData] = useState();
  const [max, setMax] = useState(100);
  const [years, setYears] = useState([]);

  const labels = [
    "Jan",
    "Feb",
    "Mar",
    "April",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  // const data = {
  //   labels: labels,
  //   datasets: [
  //     {
  //       // Title of Graph
  //       label: currentYear,
  //       data: getDatasets(),
  //       backgroundColor: [
  //         "rgba(255, 99, 132, 0.2)",
  //         "rgba(255, 159, 64, 0.2)",
  //         "rgba(255, 205, 86, 0.2)",
  //         "rgba(75, 192, 192, 0.2)",
  //       ],
  //       borderColor: [
  //         "rgb(255, 99, 132)",
  //         "rgb(255, 159, 64)",
  //         "rgb(255, 205, 86)",
  //         "rgb(75, 192, 192)",
  //       ],
  //       borderWidth: 1,
  //       barPercentage: 1,
  //       borderRadius: {
  //         topLeft: 5,
  //         topRight: 5,
  //       },
  //     },
  //     // insert similar in dataset object for making multi bar chart
  //   ],
  // };
  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: "Amount",
        },
        display: true,
        beginAtZero: true,
        max: max,
      },
      x: {
        title: {
          display: true,
          text: "Months",
        },
        display: true,
      },
    },
  };

  const fetchData = async () => {
    try {
      console.log("Calling API...");
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/expenses`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getDatasets = () => {
    if (expenses.length === 0) return [];
    const filteredData = expenses
      .filter(
        (item) => new Date(item.date).getFullYear().toString() === currentYear
      )
      .reduce((acc, item) => {
        const monthIndex = new Date(item.date).getMonth();
        if (!acc[monthIndex]) {
          acc[monthIndex] = 0;
        }
        acc[monthIndex] += item.amount;
        return acc;
      }, {});

    console.log(filteredData);
    const amounts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    Object.keys(filteredData).forEach((monthIndex) => {
      amounts[monthIndex] = filteredData[monthIndex];
    });
    console.log(amounts);
    setMax(Math.max(amounts));

    return amounts;
  };

  useEffect(() => {
    async function fetchAndFilter() {
      try {
        setLoading(true);
        await fetchData();
        // filterYear();
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    }

    fetchAndFilter();
  }, []);

  useEffect(() => {
    let newYears = [];
    expenses.map((expense) => {
      const year = new Date(expense.date).getFullYear();
      if (!newYears.includes(year)) newYears.push(year);
    });
    console.log(newYears);
    setYears(newYears);
    console.log(years);
    setData({
      labels: labels,
      datasets: [
        {
          label: "2024",
          data: getDatasets(),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
          ],
          borderWidth: 1,
          barPercentage: 1,
          borderRadius: {
            topLeft: 5,
            topRight: 5,
          },
        },
      ],
    });
  }, [expenses]);

  useEffect(() => {
    setData({
      labels: labels,
      datasets: [
        {
          label: currentYear,
          data: getDatasets(),
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
          ],
          borderWidth: 1,
          barPercentage: 1,
          borderRadius: {
            topLeft: 5,
            topRight: 5,
          },
        },
      ],
    });
  }, [currentYear]);

  if (loading) return <Loading />;
  return (
    <div className="">
      <h1 className=" text-center text-3xl md:text-5xl font-bold my-5">
        Expense Chart
      </h1>
      <div className="w-56 mx-auto text-2xl">
        <label htmlFor="year">Year: </label>
        <select
          name="year"
          id="year"
          value={currentYear}
          onChange={(e) => {
            setCurrentYear(e.target.value);
          }}
        >
          {years.map((year) => {
            return (
              <option value={year} key={v4()}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
      <div className="w-[700px] mx-auto">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default MyBarChart;
