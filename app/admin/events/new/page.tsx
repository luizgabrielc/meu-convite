"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

export default function NewEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const supabase = createClient();
    const { error } = await supabase.from("events").insert([
      {
        title,
        description,
        date: date ? new Date(date).toISOString() : null,
        location,
      },
    ]);
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      router.push("/admin/events");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">Criar novo evento</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-1">
          Título
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border rounded px-2 py-1"
          />
        </label>
        <label className="flex flex-col gap-1">
          Descrição
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </label>
        <label className="flex flex-col gap-1">
          Data e hora
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="border rounded px-2 py-1"
          />
        </label>
        <label className="flex flex-col gap-1">
          Local
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="border rounded px-2 py-1"
          />
        </label>
        {error && <div className="text-red-600">{error}</div>}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {loading ? "Salvando..." : "Criar evento"}
        </button>
      </form>
    </div>
  );
}
