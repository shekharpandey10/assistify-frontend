const ContextForm = ({
  title,
  setTitle,
  content,
  setContent,
  setFile,
  handleSubmit,
  loading,
  editingId,
  resetForm,
}) => {
  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow-md mb-6 flex flex-col gap-4"
    >
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="border px-3 py-2 rounded"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        className="border px-3 py-2 rounded"
      />
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
        className="border px-3 py-2 rounded"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {loading
            ? "Saving..."
            : editingId
            ? "Update Context"
            : "Upload Context"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ContextForm;
