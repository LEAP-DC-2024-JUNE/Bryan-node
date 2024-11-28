"use client";

const dotenv = require("dotenv");
dotenv.config();

import AddExpenseWindow from "@/components/AddExpenseWindow";
import EditExpenseWindow from "@/components/EditExpenseWindow";
import Loading from "@/components/Loading";
import ExpenseItem from "@/components/ExpenseItem";
import { Add, Chart, Left, Right } from "@/components/Icons";
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
  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const per_page = 5;

  // Get all expenses
  const fetchData = async () => {
    const start = per_page * (page - 1);
    const end = per_page * page;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/expenses`);
      if (!res.ok) throw new Error("Failed to fetch data");
      const data = await res.json();
      setMaxPage(Math.ceil(data.length / per_page));
      setExpenses(data.slice(start, end));
    } catch (error) {
      console.error(error);
    }
  };

  // Change page
  const changePage = (direction) => {
    if (direction === "prev" && page != 1) {
      setPage(page - 1);
    } else if (direction === "next" && page != maxPage) {
      setPage(page + 1);
    } else {
      setPage(parseInt(direction));
    }
  };

  // Show a loading component before the data is received.
  useEffect(() => {
    setLoading(true);
    fetchData().finally(() => setLoading(false));
  }, [page]);

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
        {expenses.length === 0 && (
          <div className="text-3xl text-center my-3">No expenses recorded</div>
        )}

        {/* Pagination */}
        <div
          className="w-1/2 mx-auto text-sm  md:text-lg mt-3
                        flex justify-around"
        >
          <button
            onClick={() => changePage("prev")}
            disabled={page === 1}
            className={
              "flex items-center disabled:text-gray-400 disabled:fill-gray-400"
            }
          >
            <Left />
            Prev
          </button>
          <div>
            Page:{" "}
            {/* <input
              type="number"
              name="page"
              id="page"
              value={page}
              min={1}
              max={maxPage}
              onChange={(e) => changePage(e.target.value)}
            /> */}
            {page}/{maxPage}
          </div>
          <button
            onClick={() => changePage("next")}
            disabled={page === maxPage}
            className={
              "flex items-center disabled:text-gray-400 disabled:fill-gray-400"
            }
          >
            Next
            <Right />
          </button>
        </div>
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
