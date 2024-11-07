"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NewItemForm = () => {
  const [data, setData] = useState({
    productName: "",
    from: "",
    nutrients: "",
    quantity: "",
    price: "",
    organic: false,
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    let errors = {};

    if (data.productName === "") {
      errors.productName = "Product name is required.";
    }

    if (data.from === "") {
      errors.from = "Origin is required.";
    }

    if (data.nutrients === "") {
      errors.nutrients = "Nutrients is required.";
    }

    if (data.quantity === "") {
      errors.quantity = "Quantity is required.";
    }

    if (data.price === "") {
      errors.price = "Price is required.";
    }

    if (data.description === "") {
      errors.description = "Description is required.";
    }

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleClick = (e) => {
    e.preventDefault();
    // console.log(JSON.stringify(data));
    if (!isFormValid) {
      alert("Missing information");
      return;
    }
    fetch("https://zfd26qss-8000.use2.devtunnels.ms/api/items", {
      // mode: "no-cors",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).catch((e) => alert(e));
    setData({
      productName: "",
      image: "",
      from: "",
      nutrients: "",
      quantity: "",
      price: "",
      organic: false,
      description: "",
    });
    alert("Item added.");
  };

  useEffect(() => {
    validateForm();
  }, [data]);

  return (
    <div className="bg-gray-100 w-[35rem] mx-auto px-8 py-5 text-lg">
      <h1 className="text-3xl text-center font-bold">New Item Form</h1>
      <div className="flex flex-col gap-5">
        <div>
          <label htmlFor="productName">Product Name: </label>
          <input
            type="text"
            name="productName"
            id="productName"
            value={data.productName}
            onChange={(e) => setData({ ...data, productName: e.target.value })}
            className="text-black bg-white border-black  rounded-lg px-3 py-2"
            required={true}
          />
        </div>
        <div>
          <label htmlFor="from">From: </label>
          <input
            type="text"
            name="from"
            id="from"
            value={data.from}
            onChange={(e) => setData({ ...data, from: e.target.value })}
            className="text-black bg-white border-black  rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="nutrients">Nutrients: </label>
          <input
            type="text"
            name="nutrients"
            id="nutrients"
            value={data.nutrients}
            onChange={(e) => setData({ ...data, nutrients: e.target.value })}
            className="text-black bg-white border-black  rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="quantity">Quantity: </label>
          <input
            type="text"
            name="quantity"
            id="quantity"
            value={data.quantity}
            onChange={(e) => setData({ ...data, quantity: e.target.value })}
            className="text-black bg-white border-black  rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="price">Price: </label>
          <input
            type="text"
            name="price"
            id="price"
            value={data.price}
            onChange={(e) => setData({ ...data, price: e.target.value })}
            className="text-black bg-white border-black  rounded-lg px-3 py-2"
          />
        </div>
        <div>
          <label htmlFor="organic">Organic: </label>
          <input
            type="checkbox"
            name="organic"
            id="organic"
            checked={data.organic}
            onChange={(e) => setData({ ...data, organic: e.target.checked })}
          />
        </div>
        <div>
          <label htmlFor="description">Description: </label>
          <input
            type="text"
            name="description"
            id="description"
            value={data.description}
            onChange={(e) => setData({ ...data, description: e.target.value })}
            className="text-black bg-white border-black  rounded-lg px-3 py-2"
          />
        </div>
      </div>
      <button
        onClick={(e) => handleClick(e)}
        className="w-full text-center my-5 bg-green-200 hover:bg-green-500 py-3 rounded-md"
      >
        Submit
      </button>
      <Link
        href="/practice-1"
        className="w-full block text-center bg-red-200 hover:bg-red-500 py-3 rounded-md"
      >
        Go Back
      </Link>
    </div>
  );
};

export default NewItemForm;
