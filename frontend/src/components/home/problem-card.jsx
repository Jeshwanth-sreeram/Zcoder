import '../../styles/home/problem-section.css';
import { Link } from "react-router-dom";

const Problemcard = ({problem}) => {
  return (
     <div className="problem-card">
              <div className="problem-header">
                <h3>{problem.title}</h3>
                <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                  {problem.difficulty}
                </span>
              </div>
              <div className="topics">
                {problem.topics.map(topic => (
                  <span key={topic} className="topic-tag">{topic}</span>
                ))}
              </div>
              <div className="problem-footer">
                <span>Solved by {problem.solved}+ users</span>
                <Link to={`/problems/${problem.id}`} className="solve-button">Solve</Link>
              </div>
    </div>
  )
}

export default Problemcard