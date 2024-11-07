import Link from "next/link";
import DeleteButton from "@/components/DeleteButton";
import Tag from "@/components/Tag";

const SingeItem = async ({ params }) => {
  const { id } = await params;
  const items = await fetch(`http://127.0.0.1:8000/api/items/${id}`).then(
    (response) => response.json()
  );
  const item = items[0];
  console.log(item.productName);
  return (
    <div className="bg-gray-100 w-[30rem] mx-auto px-8 py-5 text-lg rounded-xl">
      <div className="flex gap-5">
        <h1 className="text-center text-3xl font-bold ">{item.productName}</h1>
        {item.organic == 1 && <Tag text="Organic" />}
      </div>
      <p>
        <strong>From:</strong> {item.origin}
      </p>
      <p>
        <strong>Nutrients:</strong> {item.nutrients}
      </p>
      <p>
        <strong>Quantity:</strong> {item.quantity}
      </p>
      <p>
        <strong>Price:</strong> {item.price}
      </p>
      <p className="my-3">{item.description}</p>
      <div className="flex justify-between">
        <DeleteButton id={id} />

        <Link
          href="/practice-1"
          className="bg-green-500 text-white px-3 py-2 rounded-xl"
        >
          Go back
        </Link>
      </div>
    </div>
  );
};

export default SingeItem;
