"use client";

const dotenv = require("dotenv").config();

import AddExpenseWindow from "@/components/AddExpenseWindow";
import EditExpenseWindow from "@/components/EditExpenseWindow";
import ExpenseItem from "@/components/ExpenseItem";
import { Add, Chart } from "@/components/Icons";
import Loading from "@/components/Loading";
import Link from "next/link";
import { useEffect, useState } from "react";
import { v4 } from "uuid";

const Home = () => {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editId, setEditId] = useState(-1);
  const [expenses, setExpenses] = useState();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading />;
  return (
    <div className="flex flex-col gap-8 justify-center items-center xs:px-5">
      <h1 className="text-center text-4xl font-bold mt-5">Expenses</h1>
      <div className="w-full max-w-screen-md border-2 border-black p-3 shadow-lg shadow-gray-400 rounded-lg">
        <table className="w-full border-collapse text-xs md:text-base ">
          <thead>
            <tr className="bg-[#91eeed] text-neutral-700">
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
                color={i % 2 == 1 ? "bg-gray-200" : "bg-white"}
              />
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col md:flex-row flex-wrap gap-5">
        <button
          className="flex gap-3 items-center border-2 border-blue-400 rounded-xl
        text-blue-400 hover:text-white hover:bg-blue-400 font-semibold text-xl px-5 py-3 fill-blue-400 hover:fill-white transition-all duration-500"
          onClick={() => {
            setIsAddOpen(true);
          }}
        >
          <Add />
          Add Expense
        </button>
        <Link
          href="/chart"
          className="flex gap-3 items-center border-2 border-orange-400 rounded-xl
        text-orange-400 hover:text-white hover:bg-orange-400 font-semibold text-xl px-5 py-3 fill-orange-400 hover:fill-white transition-all duration-500"
          // onClick={() => {
          //   // Handle show in chart
          // }}
        >
          <Chart />
          Show Chart
        </Link>
      </div>
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
  );
};

export default Home;
