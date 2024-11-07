import Link from "next/link";
import { Details } from "./Icons";
import Tag from "./Tag";

const ItemCard = ({ item }) => {
  return (
    <div className="p-5 border-2 bg-gray-100 rounded-xl">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl">{item.productName} </h1>
        {item.organic == 1 && <Tag text="Organic" />}
        <Link href={`/practice-1/${item.id}`}>
          <Details />
        </Link>
      </div>
      <p className="text-lg">Price: ${item.price}</p>
    </div>
  );
};

export default ItemCard;
