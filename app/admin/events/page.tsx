// app/admin/events/page.tsx
import { createClient } from "@/utils/supabase/client";
import Link from "next/link";

export default async function AdminEventsPage() {
  const supabase = createClient();
  const { data: events, error } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: true });
  console.log("events", events);
  if (error) {
    return <div>Erro ao carregar eventos: {error.message}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-2">
      <h1 className="text-3xl font-extrabold text-blue-700 mb-2">
        Painel de Eventos
      </h1>
      <p className="mb-6 text-gray-700 text-lg">
        Gerencie seus eventos e acompanhe as confirmações de presença de forma
        fácil e rápida.
      </p>
      <div className="flex justify-end mb-6">
        <Link
          href="/admin/events/new"
          className="px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow hover:from-blue-600 hover:to-cyan-600 font-semibold transition-colors"
        >
          + Criar novo evento
        </Link>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-xl overflow-hidden shadow-md bg-white">
          <thead>
            <tr className="bg-blue-100">
              <th className="px-6 py-3 border-b text-left text-blue-800 font-bold">
                Título
              </th>
              <th className="px-6 py-3 border-b text-left text-blue-800 font-bold">
                Descrição
              </th>
              <th className="px-6 py-3 border-b text-left text-blue-800 font-bold">
                Data
              </th>
              <th className="px-6 py-3 border-b text-left text-blue-800 font-bold">
                Local
              </th>
              <th className="px-6 py-3 border-b text-center text-blue-800 font-bold">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {events?.length ? (
              events.map((event) => (
                <tr
                  key={event.id}
                  className="border-b hover:bg-blue-50 transition-colors group"
                >
                  <td className="px-6 py-4 font-semibold text-blue-900 group-hover:text-blue-700">
                    {event.title}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {event.description}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    {new Date(event.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{event.location}</td>
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center w-full">
                      <Link
                        href={`/admin/events/${event.id}`}
                        className=" px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition-colors text-sm font-semibold"
                      >
                        Ver detalhes
                      </Link>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-gray-500 text-lg"
                >
                  Nenhum evento cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
