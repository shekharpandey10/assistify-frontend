import ContextCard from "./ContextCard";

const ContextList = ({ contexts, onEdit, onDelete }) => {
  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Uploaded Contexts</h2>
      {contexts.length === 0 ? (
        <p className="text-gray-600">No contexts uploaded yet.</p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-4">
          {contexts.map((ctx) => (
            <ContextCard
              key={ctx._id}
              ctx={ctx}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default ContextList;
