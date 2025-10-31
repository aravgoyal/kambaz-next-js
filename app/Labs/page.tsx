import Link from "next/link";

export default function Labs() {
  return (
    <div id="wd-labs" className="container mt-4">
      <h1 className="mb-4">Labs</h1>
      
      <ul className="nav nav-pills mb-4">
        <li className="nav-item">
          <Link href="/Labs/Lab1" id="wd-lab1-link" className="nav-link">
            Lab 1
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/Labs/Lab2" id="wd-lab2-link" className="nav-link">
            Lab 2
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/Labs/Lab3" id="wd-lab3-link" className="nav-link">
            Lab 3
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/Labs/Lab4" id="wd-lab4-link" className="nav-link active">
            Lab 4
          </Link>
        </li>
      </ul>

      <h2>Arav Goyal</h2>
      <Link href="https://github.com/aravgoyal/kambaz-next-js" id="wd-github" className="btn btn-link">
        Repository
      </Link>
    </div>
  );
}