import Link from "next/link";
import Image from "next/image";

const BottomNav = () => {
  return (
    <nav className="bg-base-300 w-full fixed bottom-0 left-0 right-0">
      <ul className="flex justify-evenly items-center p-1">
        {" "}
        {/* Adjust padding for smaller navbar */}
        <li className="flex flex-col items-center">
          {" "}
          {/* Center the text and icon */}
          <Link href="/" className="btn btn-square btn-ghost">
            <Image
              src="/home_icon.svg"
              width={24} // Smaller icon size
              height={24}
              alt="home"
            />
          </Link>
          <p className="text-xs mt-1">home</p>{" "}
          {/* Center text under the icon */}
        </li>
        <li className="flex flex-col items-center">
          <Link
            href="/dashboard/create-application"
            className="btn btn-square btn-ghost"
          >
            <Image
              src="/plus_icon.svg"
              width={24} // Smaller icon size
              height={24}
              alt="plus"
            />
          </Link>
          <p className="text-xs mt-1">create</p>
        </li>
        <li className="flex flex-col items-center">
          <Link
            href="/dashboard/statistics"
            className="btn btn-square btn-ghost"
          >
            <Image
              src="/chart_icon.png"
              width={24} // Smaller icon size
              height={24}
              alt="chart"
            />
          </Link>
          <p className="text-xs mt-1">stats</p>
        </li>
        <li className="flex flex-col items-center">
          <button
            className="btn btn-square btn-ghost"
            onClick={() => window.history.back()}
          >
            <Image
              src="/back_btn.svg"
              width={24} // Smaller icon size
              height={24}
              alt="back"
            />
          </button>
          <p className="text-xs mt-1">back</p>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
