const BottomNav = () => {
  return (
    <nav className="bg-base-300 w-full fixed bottom-0 left-0 right-0">
      <ul className="flex justify-evenly items-center p-2">
        <li>
          <a href="#" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-facebook"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M7 10v4h3v7h4v-7h3l1-4h-4v-2a1 1 0 0 1 1-1h3v-4h-3a5 5 0 0 0 -5 5v2H7" />
            </svg>
          </a>
        </li>
        <li>
          <a href="#" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-twitter"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M22 4v16a2 2 0 0 1 -2 2h-16l3 -3m0 -3l-3 -3" />
              <path d="M14 7l-1 -1l-3 3" />
            </svg>
          </a>
        </li>
        <li>
          <a href="#" className="btn btn-square btn-ghost">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-brand-linkedin"
              width={24}
              height={24}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <rect x={4} y={4} width={16} height={16} rx={2} />
              <line x1={8} y1={11} x2={8} y2={16} />
              <line x1={8} y1={8} x2={8} y2={8.01} />
              <line x1={12} y1={16} x2={12} y2={11} />
              <path d="M16 16v-3a2 2 0 0 0 -4 0" />
            </svg>
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
