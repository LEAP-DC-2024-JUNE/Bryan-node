"use client";

import { useEffect } from "react";

const moment = require("moment");

const ExpenseItem = ({
  expense,
  isEditOpen,
  setIsEditOpen,
  editId,
  setEditId,
  fetchData,
  color,
}) => {
  const formatDate = (date) => {
    return moment(date).format("L");
  };
  const formatAmount = (amount) => {
    return amount.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  };
  const handleAction = async (event) => {
    const action = event.target.value;
    if (action === "edit") {
      setEditId(expense.id);
      // console.log(editId);
      // setIsEditOpen(true);
    } else if (action === "delete") {
      await fetch(
        `https://zfd26qss-8000.use2.devtunnels.ms/api/expenses/${expense.id}`,
        {
          method: "DELETE",
        }
      );
      await fetchData();
    }
    event.target.value = "";
  };

  useEffect(() => {
    console.log(editId);
    setIsEditOpen(editId != -1);
  }, [editId]);
  return (
    <tr className={`${color}`}>
      <td className="p-2 align-top">{formatDate(expense.date)}</td>
      <td className="p-2 align-top hidden md:table-cell">
        {expense.description}
      </td>
      <td className="p-2 align-top">{expense.type}</td>
      <td className="p-2 align-top">{formatAmount(expense.amount)}</td>
      <td className="p-2 align-top">
        {/* <Menu /> */}
        <select
          className={`p-1 border rounded bg-white border-black appearance-none md:appearance-auto w-fit`}
          onChange={(e) => handleAction(e)}
          defaultValue=""
        >
          <option
            value=""
            defaultValue={true}
            disabled
            hidden
            className="bg-white"
          ></option>
          <option
            value="edit"
            className="bg-white text-yellow-400 highlight:bg-yellow p-7"
          >
            Edit
          </option>
          <option value="delete" className="bg-white text-red-400 p-2">
            Delete
          </option>
        </select>
      </td>
    </tr>
  );
};

export default ExpenseItem;
