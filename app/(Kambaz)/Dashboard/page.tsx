import Link from "next/link";
import Image from "next/image";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link href="/Courses/1234" className="wd-dashboard-course-link">
            <Image src="/images/reactjs.jpg" width={200} height={150} alt={""} />
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/Courses/5678" className="wd-dashboard-course-link">
                <Image src="/images/mern.jpeg" width={200} height={150} alt={""} />
                <div>
                    <h5> CS5678 MERN </h5>
                    <p className="wd-dashboard-course-title">
                        Arav Goyal
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
        <div className="wd-dashboard-course">
            <Link href="/Courses/91011" className="wd-dashboard-course-link">
                <Image src="/images/javascript.jpg" width={200} height={150} alt={""} />
                <div>
                    <h5> CS91011 JavaScript </h5>
                    <p className="wd-dashboard-course-title">
                        Full Stack software developer
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
        <div>
            <Link href="/Courses/121314" className="wd-dashboard-course-link">
                <Image src="/images/htmlcss.jpg" width={200} height={150} alt={""} />
                <div>
                    <h5> CS121314 HTML/CSS </h5>
                    <p className="wd-dashboard-course-title">
                        Full Stack software developer
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
        <div>
            <Link href="/Courses/151617" className="wd-dashboard-course-link">
                <Image src="/images/java.jpg" width={200} height={150} alt={""} />
                <div>
                    <h5> CS151617 Java </h5>
                    <p className="wd-dashboard-course-title">
                        Full Stack software developer
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
        <div>
            <Link href="/Courses/181920" className="wd-dashboard-course-link">
                <Image src="/images/python.jpg" width={200} height={150} alt={""} />
                <div>
                    <h5> CS181920 Python </h5>
                    <p className="wd-dashboard-course-title">
                        Full Stack software developer
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
        <div>
            <Link href="/Courses/212223" className="wd-dashboard-course-link">
                <Image src="/images/csharp.jpg" width={200} height={150} alt={""} />
                <div>
                    <h5> CS212223 C# </h5>
                    <p className="wd-dashboard-course-title">
                        Full Stack software developer
                    </p>
                    <button> Go </button>
                </div>
            </Link>
        </div>
      </div>
    </div>
);}
