import Link from "next/link";

const Header = () => {
  return (
    <Link href="/">
      <div className="flex bg-gray-400 p-5">
        <h1 className="text-2xl font-semibold">Bryan's Demo</h1>
      </div>
    </Link>
  );
};

export default Header;
