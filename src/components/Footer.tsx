import { ModeToggle } from "./ModeToggle";
import Link from 'next/link';
const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center px-4 md:px-20 py-4 border-t-2 border-black dark:border-white">
      <div className="flex flex-col md:flex-row items-center mb-4 md:mb-0">
        Created by 
        <a
          href="https://www.linkedin.com/in/chetanrakheja/"
          target="_blank"
          className="ml-1 text-blue-500"
          rel="noopener noreferrer"
        >
          Chetan Rakheja
        </a>
      </div>
      <div className="mb-4 md:mb-0">
        <a
          href="https://github.com/chetanrakheja/payviaupi"
          target="_blank"
          className="text-blue-500"
          rel="noopener noreferrer"
        >
          Visit Github Repo
        </a>
      </div>
      <div className="text-center">
        © {currentYear}
      </div>
    </footer>
  );
}
