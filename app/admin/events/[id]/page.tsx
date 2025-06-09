import { createClient } from "@/utils/supabase/server";
import AddGuestForm from "./AddGuestForm";
import CopyLinkButton from "./CopyLinkButton";
import DeleteGuestButton from "./DeleteGuestButton";
import Link from "next/link";

type Params = Promise<{ id: string }>;

export default async function EventDetailPage({ params }: { params: Params }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: event, error } = await supabase
    .from("events")
    .select("*")
    .eq("id", id)
    .single();

  // Buscar convidados do evento
  const { data: guests, error: guestsError } = await supabase
    .from("guests")
    .select("*")
    .eq("event_id", id)
    .order("created_at", { ascending: true });

  if (error || !event) {
    return (
      <div className="max-w-lg mx-auto mt-8">
        <h1 className="text-2xl font-bold mb-4">Evento não encontrado</h1>
        <Link href="/admin/events" className="text-blue-600 hover:underline">
          Voltar para eventos
        </Link>
      </div>
    );
  }

  // Montar a base da URL para RSVP
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return (
    <div className="max-w-4xl mx-auto py-8 px-2">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-2">
          {event.title}
        </h1>
        <div className="flex flex-col md:flex-row md:items-center md:gap-8 mb-4">
          <div className="mb-2 md:mb-0">
            <span className="font-semibold text-blue-900">Descrição:</span>{" "}
            <span className="text-gray-700">{event.description}</span>
          </div>
          <div className="mb-2 md:mb-0">
            <span className="font-semibold text-blue-900">Data:</span>{" "}
            <span className="text-gray-700">
              {new Date(event.date).toLocaleString()}
            </span>
          </div>
          <div>
            <span className="font-semibold text-blue-900">Local:</span>{" "}
            <span className="text-gray-700">{event.location}</span>
          </div>
        </div>
        <Link
          href="/admin/events"
          className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow hover:from-blue-600 hover:to-cyan-600 font-semibold transition-colors mb-4"
        >
          Voltar para eventos
        </Link>
      </div>

      {/* Formulário para adicionar convidado */}
      <div className="mb-8 p-4 border rounded-lg bg-blue-50/50 shadow">
        <h2 className="text-lg font-semibold mb-2 text-blue-800">
          Adicionar convidado
        </h2>
        <AddGuestForm eventId={id} />
      </div>

      {/* Tabela de convidados */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-6 py-3 border-b text-left text-blue-800 font-bold">
                Nome
              </th>
              <th className="px-6 py-3 border-b text-left text-blue-800 font-bold">
                Status
              </th>
              <th className="px-6 py-3 border-b text-left text-blue-800 font-bold">
                Respondido em
              </th>
              <th className="px-6 py-3 border-b text-left text-blue-800 font-bold">
                Link
              </th>
              <th className="px-6 py-3 border-b text-center text-blue-800 font-bold">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {guests && guests.length > 0 ? (
              guests.map((guest) => (
                <tr
                  key={guest.id}
                  className="border-b hover:bg-blue-50 transition-colors group"
                >
                  <td className="px-6 py-4 font-semibold text-blue-900 group-hover:text-blue-700">
                    {guest.name}
                  </td>
                  <td className="px-6 py-4 capitalize text-gray-700">
                    {guest.rsvp_status === "yes"
                      ? "Confirmado"
                      : guest.rsvp_status === "no"
                        ? "Não Confirmado"
                        : "Não Respondido"}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {guest.responded_at
                      ? new Date(guest.responded_at).toLocaleString()
                      : "-"}
                  </td>
                  <td className="px-6 py-4">
                    {guest.unique_token ? (
                      <CopyLinkButton
                        link={`${baseUrl}/rsvp/${guest.unique_token}`}
                      />
                    ) : (
                      <span className="text-gray-400 text-xs">Sem link</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <DeleteGuestButton guestId={guest.id} eventId={id} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-gray-500 text-lg"
                >
                  Nenhum convidado cadastrado.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
