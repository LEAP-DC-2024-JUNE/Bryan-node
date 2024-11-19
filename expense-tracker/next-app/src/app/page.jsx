"use client";

const dotenv = require("dotenv");
dotenv.config();

import AddExpenseWindow from "@/components/AddExpenseWindow";
import EditExpenseWindow from "@/components/EditExpenseWindow";
import Loading from "@/components/Loading";
import ExpenseItem from "@/components/ExpenseItem";
import { Add, Chart } from "@/components/Icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 } from "uuid";
import clsx from "clsx";

const Home = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [expenses, setExpenses] = useState();
  const [loading, setLoading] = useState(true);

  // Get all expenses
  const fetchData = async () => {
    try {
      const res = await fetch(
        "https://zfd26qss-8000.use2.devtunnels.ms/api/expenses"
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setExpenses(data);
    } catch (error) {
      console.error(error);
    }
  };

  // Show a loading component before the data is received.
  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  return (
    <main className="flex flex-col gap-8 items-center xs:px-5">
      {/* Heading of the page */}
      <h1 className="text-3xl md:text-5xl font-bold mt-5">Expenses</h1>

      {/* The data table */}
      <div className="w-full max-w-screen-lg border-2 border-black p-3 shadow-lg shadow-gray-400 rounded-lg">
        <table className="w-full border-collapse text-xs md:text-2xl ">
          <thead>
            <tr className="bg-[#7352ef] text-white">
              <th className="text-left w-[15%] p-2">Date</th>
              <th className="text-left w-[50%] hidden md:table-cell">
                Description
              </th>
              <th className="text-left w-[20%]">Type</th>
              <th className="text-left w-[20%]">Amount</th>
              <th className="text-left w-[5%] p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense, i) => (
              <ExpenseItem
                expense={expense}
                key={v4()}
                isEditOpen={isEditOpen}
                editId={editId}
                setIsEditOpen={setIsEditOpen}
                setEditId={setEditId}
                fetchData={fetchData}
                color={clsx({ "bg-gray-200": i % 2 == 1 })} // Try changing to `clsx`
              />
            ))}
          </tbody>
        </table>
      </div>

      {/* The Add button and Link to charts page */}
      <div className="flex flex-col md:flex-row flex-wrap gap-5">
        {/* Opens the Add Expense Window */}
        <button
          className="button button-blue"
          onClick={() => {
            setIsAddOpen(true);
          }}
        >
          <Add />
          Add Expense
        </button>

        {/* Redirects to the Chart page */}
        <Link
          href="/chart"
          className="button button-orange"
          // onClick={() => {
          //   // Handle show in chart
          // }}
        >
          <Chart />
          Show Chart
        </Link>
      </div>

      {/* The Modal components */}
      <div>
        <AddExpenseWindow
          isOpen={isAddOpen}
          setIsOpen={setIsAddOpen}
          fetchData={fetchData}
        />
        <EditExpenseWindow
          isOpen={isEditOpen}
          setIsOpen={setIsEditOpen}
          id={editId}
          setId={setEditId}
          expense={expenses.find((expense) => expense.id === editId)}
          fetchData={fetchData}
        />
      </div>
    </main>
  );
};

export default Home;
