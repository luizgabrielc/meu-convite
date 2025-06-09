import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-cyan-100 to-pink-100 px-4">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-3xl font-extrabold text-blue-700 mb-4 text-center">Bem-vindo ao Meu Convite!</h1>
        <p className="text-gray-700 text-lg mb-8 text-center">
          Gerencie convites de aniversário, acompanhe confirmações de presença e facilite a organização do seu evento.
        </p>
        <Link
          href="/login"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow hover:from-blue-600 hover:to-cyan-600 font-semibold transition-colors text-lg"
        >
          Área do anfitrião
        </Link>
      </div>
    </main>
  );
}
