import LoginButton from "@/components/LoginButton";

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-200 via-cyan-100 to-pink-100 px-4">
      <div className="bg-white/90 rounded-2xl shadow-xl p-8 max-w-md w-full flex flex-col items-center">
        <h1 className="text-2xl font-extrabold text-blue-700 mb-4 text-center">
          Área do Anfitrião
        </h1>
        <p className="text-gray-700 text-base mb-6 text-center">
          Faça login para gerenciar seus eventos e convidados.
        </p>
        <form className="w-full flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label
              htmlFor="email"
              className="text-sm font-medium text-blue-900"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label
              htmlFor="password"
              className="text-sm font-medium text-blue-900"
            >
              Senha
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              className="border border-blue-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex gap-2 mt-2">
            <LoginButton />
            {/* <button formAction={signup} className="flex-1 px-4 py-2 bg-gray-200 text-blue-700 rounded-lg shadow hover:bg-gray-300 font-semibold transition-colors">Cadastrar</button> */}
          </div>
        </form>
      </div>
    </main>
  );
}
