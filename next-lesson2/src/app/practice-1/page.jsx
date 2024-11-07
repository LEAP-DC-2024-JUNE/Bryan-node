import ItemCard from "@/components/ItemCard";
import Tag from "@/components/Tag";
import Link from "next/link";

const Practice1 = async () => {
  const brief = await fetch("http://127.0.0.1:8000/api/items").then(
    (response) => response.json()
  );

  return (
    <div>
      <h1 className="text-4xl text-center mb-8">Practice 1</h1>
      <div className="flex gap-5 flex-wrap mb-10">
        {brief.map((item, i) => {
          return <ItemCard key={i} item={item} />;
        })}
      </div>
      <Link
        href={"/practice-1/new-item"}
        className="bg-gray-200 hover:bg-gray-400 hover:text-gray-50 px-3 py-2 rounded-xl"
      >
        New Item
      </Link>
    </div>
  );
};

export default Practice1;
