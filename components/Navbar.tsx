import Link from 'next/link';

function Navbar() {
  return (
    <nav className="mx-auto flex max-w-screen-md items-center justify-between pt-2 text-lg">
      <Link href="/" className="font-normal">
        Brandon Carlisle
      </Link>

      <ul className="flex gap-3">
        <li>
          <Link href="/profile" className="font-normal">
            Profile
          </Link>
        </li>
        <li>
          <Link href="/projects" className="font-normal">
            Projects
          </Link>
        </li>
        <li>
          <Link href="/blog" className="font-normal">
            Blog
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
