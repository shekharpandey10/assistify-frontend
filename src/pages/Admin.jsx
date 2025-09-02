import { useEffect, useState } from "react";
import { fetchContexts, updateContext, deleteContext } from "../services/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";

export default function Admin() {
  const [contexts, setContexts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedContext, setSelectedContext] = useState(null);
  const [editData, setEditData] = useState({ title: "", content: "" });
  const [updating, setUpdating] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await fetchContexts();
        setContexts(data.contexts || []);
      } catch (error) {
        console.error("Failed to fetch contexts:", error);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) return <p className="p-6">Loading contexts...</p>;

  const openDialog = (context) => {
    setSelectedContext(context);
    setEditData({ title: context.title, content: context.content });
  };

const handleUpdate = async () => {
  if (!selectedContext) return;
  setUpdating(true);
  try {
    const res = await updateContext(selectedContext._id, editData);
    if (res.data.success) {
      setContexts((prev) =>
        prev.map((c) =>
          c._id === selectedContext._id
            ? { ...c, title: editData.title, content: editData.content }
            : c
        )
      );
      setSelectedContext(null);
    }
  } catch (err) {
    console.error("Failed to update context:", err);
  } finally {
    setUpdating(false);
  }
};

const handleDelete = async () => {
  if (!selectedContext) return;
  setDeleting(true);
  try {
    const res = await deleteContext(selectedContext._id);
    if (res.data.success) {
      setContexts((prev) => prev.filter((c) => c._id !== selectedContext._id));
      setSelectedContext(null);
    }
  } catch (err) {
    console.error("Failed to delete context:", err);
  } finally {
    setDeleting(false);
  }
};



  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold mb-6">📚 Contexts</h2>

      {contexts.length === 0 ? (
        <p>No contexts found.</p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
          {contexts.map((c) => (
            <Card
              key={c._id}
              className="shadow-lg border rounded-2xl cursor-pointer hover:shadow-2xl transition-all w-full sm:max-w-full md:max-w-[400px] lg:max-w-[450px] h-[300px]"
              onClick={() => openDialog(c)}
            >
              <CardHeader>
                <CardTitle className="text-xl truncate">{c.title}</CardTitle>
              </CardHeader>
              <CardContent className="overflow-auto h-[200px]">
                <p className="text-gray-600">{c.content}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* View / Update / Delete Dialog */}
      <Dialog open={!!selectedContext} onOpenChange={() => setSelectedContext(null)}>
        <DialogContent className="max-w-3xl w-full max-h-[80vh] overflow-auto">
          <DialogHeader>
            <DialogTitle>Update Context</DialogTitle>
          </DialogHeader>

          <input
            type="text"
            value={editData.title}
            onChange={(e) => setEditData((prev) => ({ ...prev, title: e.target.value }))}
            className="w-full border rounded p-2 mb-3"
            placeholder="Title"
          />

          <textarea
            value={editData.content}
            onChange={(e) => setEditData((prev) => ({ ...prev, content: e.target.value }))}
            className="w-full border rounded p-2"
            rows={10}
            placeholder="Content"
          />

          <DialogFooter className="mt-4 flex justify-between">
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              <Trash2 size={16} /> {deleting ? "Deleting..." : "Delete"}
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setSelectedContext(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate} disabled={updating}>
                {updating ? "Saving..." : "Save"}
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
