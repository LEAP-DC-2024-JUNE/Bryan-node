"use client";

import { useRouter } from "next/navigation";
import { Delete } from "./Icons";

const DeleteButton = ({ id }) => {
  const router = useRouter();
  const deleteItem = async () => {
    const response = await fetch(
      `https://zfd26qss-8000.use2.devtunnels.ms/api/items/${id}`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      router.push("/practice-1");
    } else {
    }
  };

  return (
    <button
      onClick={deleteItem}
      className=" flex gap-2 items-center bg-red-500 text-white px-3 py-2 rounded-xl"
    >
      <Delete /> Delete
    </button>
  );
};

export default DeleteButton;
