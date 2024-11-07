// import LocationLogo from "@/components/LocationLogo";
import Link from "next/link";

const Home = () => {
  return (
    <div className="py-8">
      <h1 className="text-4xl text-center">Bryan's API Demo</h1>
      <Link href="/practice-1">Practice 1</Link>
      {/* <LocationLogo /> */}
    </div>
  );
};

export default Home;
