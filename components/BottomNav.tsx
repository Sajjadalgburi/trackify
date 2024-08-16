import Link from "next/link";
import Image from "next/image";

const BottomNav = () => {
  return (
    <nav className="bg-base-300 w-full fixed bottom-0 left-0 right-0">
      <ul className="flex justify-evenly items-center p-2">
        <li>
          <Link href="/" className="btn btn-square btn-ghost">
            {" "}
            <Image
              src="/home_icon.svg"
              width={30}
              height={30}
              alt="sign"
            />{" "}
          </Link>
        </li>
        <li>
          <Link
            href="/dashboard/create-application"
            className="btn btn-square btn-ghost"
          >
            <Image src="/plus_icon.svg" width={30} height={30} alt="sign" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
