"use client";
import { useTransition } from "react";
import { deleteGuest } from "./actions";

export default function DeleteGuestButton({ guestId, eventId }: { guestId: string, eventId: string }) {
  const [pending, startTransition] = useTransition();

  async function handleDelete(formData: FormData) {
    if (!confirm("Tem certeza que deseja excluir este convidado?")) return;
    await deleteGuest(formData);
  }

  return (
    <form action={formData => startTransition(() => handleDelete(formData))}>
      <input type="hidden" name="guest_id" value={guestId} />
      <input type="hidden" name="event_id" value={eventId} />
      <button
        type="submit"
        className={`cursor-pointer flex items-center gap-1 px-3 py-1.5 border border-red-300 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg text-xs font-medium shadow-sm transition-all duration-150 relative group disabled:opacity-60 ${pending ? 'ring-2 ring-red-400' : ''}`}
        title={pending ? "Excluindo..." : "Excluir convidado"}
        disabled={pending}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
        {pending ? (
          <span className="text-red-600 font-semibold animate-pulse">Excluindo...</span>
        ) : (
          <span>Excluir</span>
        )}
      </button>
    </form>
  );
} 