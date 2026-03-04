import ComplaintCard from "./ComplaintCard.jsx";

export default function ComplaintList({ complaints, onRate }) {
  if (!complaints?.length) {
    return <div className="card">No grievances yet.</div>;
  }

  return (
    <div className="list">
      {complaints.map((complaint) => (
        <ComplaintCard key={complaint.id} complaint={complaint} onRate={onRate} />
      ))}
    </div>
  );
}
