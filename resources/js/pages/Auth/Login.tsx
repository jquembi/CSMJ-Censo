import { Head, useForm } from '@inertiajs/react';
import { FormEvent } from 'react';

function Icon({ className = '' }: { className?: string }) {
    return (
        <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true">
            <path d="M10 3 4.5 5v5c0 3.5 2.3 6.1 5.5 7 3.2-.9 5.5-3.5 5.5-7V5L10 3Z" />
            <path d="M7.8 10.2 9.4 12l3.2-3.8" />
        </svg>
    );
}

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        login: '',
        password: '',
        remember: false,
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        post('/login');
    };

    return (
        <>
            <Head title="Entrar" />
            <main className="min-h-screen bg-slate-100 text-slate-950">
                <div className="grid min-h-screen lg:grid-cols-[1fr_30rem]">
                    <section className="hidden bg-slate-950 px-12 py-10 text-white lg:flex lg:flex-col lg:justify-between">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-slate-950">
                                <Icon className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="text-lg font-bold">CSMJ Censo</p>
                                <p className="text-xs uppercase tracking-wide text-slate-300">Controlo de pessoal</p>
                            </div>
                        </div>

                        <div className="max-w-2xl">
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-slate-400">Acesso institucional</p>
                            <h1 className="mt-5 text-4xl font-bold tracking-tight">Censo, prova de vida e validação provincial num único painel.</h1>
                            <p className="mt-5 max-w-xl text-base leading-7 text-slate-300">
                                Área reservada para equipas autorizadas acompanharem registos, pendências, irregularidades e consolidação nacional do quadro de pessoal.
                            </p>
                        </div>

                        <p className="text-xs text-slate-400">Conselho Superior da Magistratura Judicial</p>
                    </section>

                    <section className="flex items-center justify-center px-6 py-10">
                        <form onSubmit={submit} className="w-full max-w-md rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <div className="mb-6 flex items-center gap-3 lg:hidden">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-950 text-white">
                                    <Icon className="h-5 w-5" />
                                </div>
                                <div>
                                    <p className="font-bold">CSMJ Censo</p>
                                    <p className="text-xs uppercase tracking-wide text-slate-500">Acesso reservado</p>
                                </div>
                            </div>

                            <h2 className="text-2xl font-bold tracking-tight">Entrar no sistema</h2>
                            <p className="mt-2 text-sm leading-6 text-slate-500">Use o e-mail institucional ou o número de agente.</p>

                            <div className="mt-6 space-y-4">
                                <label className="block">
                                    <span className="text-sm font-semibold text-slate-700">E-mail ou número de agente</span>
                                    <input
                                        value={data.login}
                                        onChange={(event) => setData('login', event.target.value)}
                                        className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-200"
                                        autoFocus
                                        autoComplete="username"
                                    />
                                    {errors.login && <p className="mt-1 text-sm text-rose-700">{errors.login}</p>}
                                </label>

                                <label className="block">
                                    <span className="text-sm font-semibold text-slate-700">Palavra-passe</span>
                                    <input
                                        type="password"
                                        value={data.password}
                                        onChange={(event) => setData('password', event.target.value)}
                                        className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-slate-950 focus:ring-4 focus:ring-slate-200"
                                        autoComplete="current-password"
                                    />
                                    {errors.password && <p className="mt-1 text-sm text-rose-700">{errors.password}</p>}
                                </label>

                                <label className="flex items-center gap-2 text-sm text-slate-600">
                                    <input
                                        type="checkbox"
                                        checked={data.remember}
                                        onChange={(event) => setData('remember', event.target.checked)}
                                        className="rounded border-slate-300"
                                    />
                                    Manter sessão iniciada neste dispositivo
                                </label>
                            </div>

                            <button
                                disabled={processing}
                                className="mt-6 h-11 w-full rounded-md bg-slate-950 px-4 text-sm font-bold text-white transition hover:bg-slate-800 disabled:opacity-60"
                            >
                                {processing ? 'A validar...' : 'Entrar'}
                            </button>
                        </form>
                    </section>
                </div>
            </main>
        </>
    );
}
