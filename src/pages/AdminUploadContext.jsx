import { useState } from "react";
import { createContext } from "../services/api";

export default function AdminUploadContext() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    if (content) formData.append("content", content);
    if (file) formData.append("file", file);

    try {
      await createContext(formData);
      alert("Context uploaded successfully!");
      setTitle("");
      setContent("");
      setFile(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload context");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Upload Context</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <textarea
          placeholder="Content (optional if file is uploaded)"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Upload
        </button>
      </form>
    </div>
  );
}
