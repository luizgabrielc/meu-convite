"use client";
import { useState, useTransition } from "react";
import type React from "react";

import { rsvpGuest } from "./actions";
import { CheckCircle } from "lucide-react";
// import { CheckCircle } from "lucide-react";

export default function RSVPForm({
  guestId,
  currentStatus,
  token,
  guestName,
}: {
  guestId: string;
  currentStatus: string;
  token: string;
  guestName: string;
}) {
  const [pending, startTransition] = useTransition();
  const [status, setStatus] = useState(currentStatus || "pending");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleRSVP(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    const formData = new FormData(e.currentTarget);
    startTransition(async () => {
      const result = await rsvpGuest(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        setSuccess(true);
        setStatus(formData.get("rsvp_status") as string);
      }
    });
  }

  return (
    <form onSubmit={handleRSVP} className="flex flex-col gap-3 w-full px-4">
      <input type="hidden" name="guest_id" value={guestId} />
      <input type="hidden" name="token" value={token} />
      <p className="text-center text-xl font-semibold text-pink-600">Aloha, {guestName}! Posso contar com sua presença?</p>
      <label
        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
                        ${
                          status === "yes"
                            ? "bg-green-100 border-green-500 text-green-800"
                            : "bg-white border-gray-300 text-gray-700"
                        }
                        hover:bg-green-50`}
      >
        <input
          type="radio"
          name="rsvp_status"
          value="yes"
          checked={status === "yes"}
          onChange={() => setStatus("yes")}
          disabled={pending || success}
          className="hidden"
        />
        <span className="font-semibold flex-grow">
          Confirmar presença
        </span>
        {status === "yes" && <CheckCircle className="ml-auto text-green-600" />}
      </label>

      <label
        className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-all duration-200 ease-in-out
                        ${
                          status === "no"
                            ? "bg-pink-100 border-pink-500 text-pink-800"
                            : "bg-white border-gray-300 text-gray-700"
                        }
                        hover:bg-pink-50`}
      >
        <input
          type="radio"
          name="rsvp_status"
          value="no"
          checked={status === "no"}
          onChange={() => setStatus("no")}
          disabled={pending || success}
          className="hidden"
        />
        <span className="font-semibold flex-grow">Não poderei ir</span>
        {status === "no" && <CheckCircle className="ml-auto text-pink-600" />}
      </label>

      <button
        type="submit"
        disabled={pending || success}
        className="bg-pink-600 cursor-pointer text-white rounded-full px-6 py-3 text-lg font-bold hover:bg-pink-700 transition-colors disabled:opacity-60 shadow-md"
      >
        {pending ? "Enviando..." : success ? "Resposta enviada!" : "Enviar"}
      </button>
      {error && (
        <div className="text-red-600 text-sm text-center mt-2">{error}</div>
      )}
      {success && (
        <div className="text-green-600 text-sm text-center">
          Obrigado pela resposta!
        </div>
      )}
    </form>
  );
}
