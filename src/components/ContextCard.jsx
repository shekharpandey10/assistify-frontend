import { FaTrash, FaEdit, FaEye } from "react-icons/fa";

const ContextCard = ({ ctx, onEdit, onDelete }) => {
  return (
    <li className="bg-white border rounded-lg shadow-sm p-4 flex flex-col justify-between">
      <div>
        <h3 className="text-lg font-bold">{ctx.title}</h3>
        <p className="text-gray-700 mb-2">{ctx.content}</p>
        {ctx.fileUrl && (
          <a
            href={ctx.fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-blue-600 hover:underline"
          >
            <FaEye className="mr-2" /> View File
          </a>
        )}
      </div>
      <div className="flex gap-3 mt-3">
        <button
          onClick={() => onEdit(ctx)}
          className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
        >
          <FaEdit className="mr-1" /> Edit
        </button>
        <button
          onClick={() => onDelete(ctx._id)}
          className="flex items-center bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
        >
          <FaTrash className="mr-1" /> Delete
        </button>
      </div>
    </li>
  );
};

export default ContextCard;
