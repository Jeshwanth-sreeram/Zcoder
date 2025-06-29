import '../../styles/home/problem-section.css';
import { Link } from "react-router-dom";
import Problemcard from './problem-card';
const Problems = () => {

  const featuredProblems = [
    {
      id: 1,
      title: "Two Sum",
      difficulty: "Easy",
      topics: ["Array", "Hash Table"],
      solved: 1250
    },
    {
      id: 7,
      title: "Reverse Linked List",
      difficulty: "Medium",
      topics: ["Linked List", "Recursion"],
      solved: 843
    },
    {
      id: 8,
      title: "Binary Tree Level Order Traversal",
      difficulty: "Medium",
      topics: ["Tree", "BFS"],
      solved: 621
    }
  ];

  return (
    <section className="problems-section">
        <div className="section-header">
          <h2 className="section-title">Featured Problems</h2>
          <Link to="/problems" className="view-all">View All →</Link>
        </div>
        <div className="problems-grid">
          {featuredProblems.map(problem => (
            <Problemcard key={problem.id} problem={problem}/>
          ))}
        </div>
      </section>
  )
}

export default Problems;