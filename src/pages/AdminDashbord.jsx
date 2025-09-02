import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import {
  getContexts,
  uploadContext,
  deleteContext,
  updateContext,
} from "../services/api";
import ContextForm from "../components/admin/ContextForm";
import ContextList from "../components/admin/ContextList";

const AdminDashboard = () => {
  const { user } = useContext(AuthContext);
  const [contexts, setContexts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch contexts
  const fetchContexts = async () => {
    try {
      const { data } = await getContexts();
      setContexts(data.contexts || []);
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  useEffect(() => {
    fetchContexts();
  }, []);

  // ✅ Submit handler (upload/update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (file) formData.append("file", file);

    try {
      if (editingId) {
        await updateContext(editingId, formData);
      } else {
        await uploadContext(formData);
      }
      resetForm();
      fetchContexts();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this item?")) return;
    try {
      await deleteContext(id);
      fetchContexts();
    } catch (err) {
      console.error(err.response?.data?.message || err.message);
    }
  };

  // ✅ Edit
  const handleEdit = (ctx) => {
    setEditingId(ctx._id);
    setTitle(ctx.title);
    setContent(ctx.content);
  };

  const resetForm = () => {
    setEditingId(null);
    setTitle("");
    setContent("");
    setFile(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <p className="mb-6 text-gray-700">
        Welcome, <span className="font-semibold">{user.name || user.email}</span>
      </p>

      {/* Form */}
      <ContextForm
        title={title}
        setTitle={setTitle}
        content={content}
        setContent={setContent}
        setFile={setFile}
        handleSubmit={handleSubmit}
        loading={loading}
        editingId={editingId}
        resetForm={resetForm}
      />

      {/* Contexts */}
      <ContextList contexts={contexts} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AdminDashboard;
