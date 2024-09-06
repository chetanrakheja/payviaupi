import { ModeToggle } from "./ModeToggle";
import Link from 'next/link';
const currentYear = new Date().getFullYear();

export function Footer() {
    // const session = useSession();
    <div className=""></div>
    return <footer className="flex justify-between px-20 pt-4 border-t-2 border-black dark:border-white p-4">
    <div className="flex column responsive">
    Created by <a href="https://www.linkedin.com/in/chetanrakheja/" target="_blank">&nbsp;Chetan Rakheja</a>
    </div>
    <div>
      <a
        href="https://github.com/chetanrakheja/payviaupi"
        target="_blank"
        rel="noopener noreferrer"
      >
        Visit Github Repo
      </a>
    </div>
    <div className="flex center">© Copyright {currentYear}</div>
  </footer>
}