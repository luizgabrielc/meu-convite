import { createClient } from "@/utils/supabase/server";
import RSVPForm from "./RSVPForm";
import Image from "next/image";

type Params = Promise<{ token: string }>;

export default async function RSVPPage({
  params,
}: {
  params: Params;
}) {
  const { token } = await params;
  const supabase = await createClient();
  const { data: guest, error } = await supabase
    .from("guests")
    .select("*")
    .eq("unique_token", token)
    .single();

  if (error || !guest) {
    return (
      <div className="max-w-lg mx-auto mt-16 text-center p-6 bg-white rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-red-600">
          Convite não encontrado
        </h1>
        <p className="text-gray-700">
          Verifique se o link está correto ou entre em contato com os
          anfitriões.
        </p>
      </div>
    );
  }

  return (
    <>
      <div
        className="lg:hidden rounded-lg bg-gradient-to-br from-blue-200 via-cyan-100 to-pink-100 min-h-screen h-full md:pb-8 flex flex-col items-center 
    justify-center"
      >
        <Image
          src="/convite-maria-cecilia-2-anos.svg"
          alt="Convite"
          width={1000}
          height={1000}
        />
        <RSVPForm
          guestName={guest.name}
          guestId={guest.id}
          currentStatus={guest.rsvp_status}
          token={token}
        />
      </div>
      <div className="min-h-screen hidden flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-cyan-100 to-pink-100 py-8 px-2 lg:flex">
        <div className="w-full max-w-2xl xl:max-w-4xl bg-white/90 rounded-2xl shadow-xl flex flex-col md:flex-row items-center gap-8 p-4 md:p-10 border-4 border-blue-400 relative">
          <div className="w-full flex flex-col items-center md:w-1/2">
            <Image
              src="/convite-maria-cecilia-2-anos.svg"
              alt="Convite"
              width={350}
              height={350}
              className="bg-gradient-to-br from-blue-200 via-cyan-100 to-pink-100 mb-4 drop-shadow-lg rounded-xl border-2 border-blue-200 bg-white w-full max-w-xs md:max-w-none"
              priority
            />
            <div className="text-center text-xs text-blue-900 opacity-70 mt-2">
              Tema: Lilo & Stitch • Maria Cecília faz 2 aninhos!
            </div>
          </div>
          <div className="w-full flex flex-col items-center md:w-1/2">
            <RSVPForm
              guestName={guest.name}
              guestId={guest.id}
              currentStatus={guest.rsvp_status}
              token={token}
            />
          </div>
        </div>
      </div>
    </>
  );
}
