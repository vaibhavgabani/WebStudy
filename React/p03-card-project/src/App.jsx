import Card from './components/Card.jsx'
import jobListings from './Data/jobListingsData.js'
import './App.css'

function App() {
  return (
    <main className="page-shell">
      {jobListings.map((job) => (
        <Card
          initial={job.initial}
          companyName={job.companyName}
          postedDate={job.postedDate}
          position={job.position}
          tag1={job.tag1}
          tag2={job.tag2}
          currency={job.currency}
          salary={job.salary}
          location={job.location}
        />
      ))}
    </main>
  )
}

export default App
