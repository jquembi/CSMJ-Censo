import { Form, Head, Link, usePage } from '@inertiajs/react';
import { ReactNode } from 'react';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

type IconName = 'chart' | 'records' | 'shield' | 'logout' | 'users';

const icons: Record<IconName, string[]> = {
    chart: ['M4 18V9', 'M10 18V5', 'M16 18v-7', 'M3 19h14'],
    records: ['M5 3h7l3 3v11H5V3Z', 'M12 3v4h4', 'M8 10h5', 'M8 13h5'],
    shield: ['M10 3 4.5 5v5c0 3.5 2.3 6.1 5.5 7 3.2-.9 5.5-3.5 5.5-7V5L10 3Z', 'M7.8 10.2 9.4 12l3.2-3.8'],
    logout: ['M8 5H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h3', 'M12 7l3 3-3 3', 'M15 10H7'],
    users: ['M7.5 10.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z', 'M3 17c.7-2.6 2.3-4 4.5-4s3.8 1.4 4.5 4', 'M13 11c1.8.2 3.1 1.6 3.7 4', 'M13.5 8.5a2.4 2.4 0 1 0 0-4.8'],
};

export default function Layout({ children, title }: LayoutProps) {
    const { url, props } = usePage();
    const user = (props.auth as any)?.user;
    const menuItems = [
        { title: 'Painel do Censo', icon: 'chart' as const, path: '/censo/dashboard' },
        { title: 'Funcionários', icon: 'users' as const, path: '/censo/registros' },
    ];

    const isActive = (path: string) => url === path || url.startsWith(`${path}/`);

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-slate-100 text-slate-950">
                <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">
                    <div className="border-b border-slate-200 px-6 py-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-slate-950 text-white">
                                <Icon name="shield" className="h-5 w-5" />
                            </div>
                            <div>
                                <h1 className="text-base font-bold tracking-tight text-slate-950">CSMJ Censo</h1>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Controlo de pessoal</p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-4 py-5">
                        <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Censo</div>
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.path}>
                                    <Link
                                        href={item.path}
                                        className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-semibold transition ${
                                            isActive(item.path)
                                                ? 'bg-slate-950 text-white shadow-sm'
                                                : 'text-slate-700 hover:bg-slate-100'
                                        }`}
                                    >
                                        <span className="flex h-8 w-8 items-center justify-center rounded-md border border-current/15">
                                            <Icon name={item.icon} className="h-4 w-4" />
                                        </span>
                                        {item.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="border-t border-slate-200 p-4">
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-4">
                            <div className="flex items-start gap-3">
                                <Icon name="shield" className="mt-0.5 h-5 w-5 text-emerald-700" />
                                <div>
                                    <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">Integridade ativa</p>
                                    <p className="mt-1 text-sm text-emerald-900">Validação por província e trilha de auditoria habilitada.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>

                <main className="lg:pl-72">
                    <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur lg:px-8">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Conselho Superior da Magistratura Judicial</p>
                                <p className="text-sm font-medium text-slate-800">{title ?? 'Censo e controlo de pessoal'}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-3">
                                <span className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-600">
                                    {user?.name ?? 'Utilizador autenticado'}
                                </span>
                                <Form method="post" action="/logout">
                                    <button className="inline-flex h-9 items-center gap-2 rounded-md bg-slate-950 px-3 text-xs font-bold text-white transition hover:bg-slate-800">
                                        <Icon name="logout" className="h-4 w-4" />
                                        Sair
                                    </button>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 py-6 lg:px-8 lg:py-8">{children}</div>
                </main>
            </div>
        </>
    );
}

export function Icon({ name, className = '' }: { name: IconName; className?: string }) {
    return (
        <svg
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            {icons[name].map((path) => <path key={path} d={path} />)}
        </svg>
    );
}
