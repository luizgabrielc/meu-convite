"use client";
import { useRef, useState, useTransition } from "react";
import { addGuest } from "./actions";

export default function AddGuestForm({ eventId }: { eventId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  async function handleAction(formData: FormData) {
    setError(null);
    setSuccess(false);
    const result = await addGuest(formData);
    if (result?.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      formRef.current?.reset();
    }
  }

  return (
    <form
      ref={formRef}
      action={(formData) => startTransition(() => handleAction(formData))}
      className="flex flex-col gap-2 sm:flex-row sm:items-end"
    >
      <div className="flex flex-col flex-1">
        <label className="text-sm">Nome</label>
        <input name="name" type="text" required className="border rounded px-2 py-1" />
      </div>
      <input type="hidden" name="event_id" value={eventId} />
      <button
        type="submit"
        disabled={pending}
        className="cursor-pointer bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700 transition-colors mt-2 sm:mt-0 disabled:opacity-60"
      >
        {pending ? "Adicionando..." : "Adicionar"}
      </button>
      {error && <div className="text-red-600 text-sm ml-2">{error}</div>}
      {success && <div className="text-green-600 text-sm ml-2">Convidado adicionado!</div>}
    </form>
  );
} 