"use client"

import { login } from "@/app/login/actions";
import { useFormStatus } from "react-dom";

export default function LoginButton() {
    const { pending } = useFormStatus()

    return (
        <button 
            formAction={login} 
            disabled={pending}
            className="cursor-pointer flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg shadow hover:from-blue-600 hover:to-cyan-600 font-semibold transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
        >
            {pending ? 'Entrando...' : 'Entrar'}
        </button>
    )
}