import { ReactNode } from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

interface MenuItem {
    title: string;
    initials: string;
    path: string;
    children: Array<{ title: string; path: string }>;
}

export default function Layout({ children, title }: LayoutProps) {
    const { url } = usePage();

    const menuItems: MenuItem[] = [
        {
            title: 'Visao Geral',
            initials: 'VG',
            path: '/dashboard',
            children: [],
        },
        {
            title: 'Recursos Humanos',
            initials: 'RH',
            path: '/censo',
            children: [
                { title: 'Censo e Controlo de Pessoal', path: '/censo/dashboard' },
                { title: 'Colaboradores no Censo', path: '/censo/registros' },
                { title: 'Quadro de Pessoal', path: '/censo/dashboard#quadro' },
                { title: 'Relatorios Provinciais', path: '/censo/dashboard#relatorios' },
            ],
        },
        {
            title: 'Tecnologia e Informacao',
            initials: 'DT',
            path: '/dti',
            children: [
                { title: 'Dashboard', path: '/dti/dashboard' },
                { title: 'Candidatura Interna', path: '/dti/candidatura-interna' },
                { title: 'Projetos', path: '/dti/projetos' },
                { title: 'Suporte', path: '/dti/suporte' },
                { title: 'Relatorios', path: '/dti/relatorios' },
            ],
        },
    ];

    const isActive = (path: string) => url === path || url.startsWith(path.replace(/#.*$/, '') + '/');

    return (
        <>
            <Head title={title} />
            <div className="min-h-screen bg-slate-100 text-slate-950">
                <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-slate-200 bg-white lg:flex lg:flex-col">
                    <div className="border-b border-slate-200 px-6 py-6">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-md bg-slate-950 text-sm font-bold text-white">
                                CS
                            </div>
                            <div>
                                <h1 className="text-base font-bold tracking-tight text-slate-950">
                                    CSMJ
                                </h1>
                                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                                    Plataforma Institucional
                                </p>
                            </div>
                        </div>
                    </div>

                    <nav className="flex-1 overflow-y-auto px-4 py-5">
                        <div className="mb-3 px-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                            Modulos
                        </div>
                        <ul className="space-y-2">
                            {menuItems.map((item) => (
                                <li key={item.title}>
                                    {item.children.length === 0 ? (
                                        <Link
                                            href={item.path}
                                            className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold transition ${
                                                isActive(item.path)
                                                    ? 'bg-slate-950 text-white'
                                                    : 'text-slate-700 hover:bg-slate-100'
                                            }`}
                                        >
                                            <span className="flex h-8 w-8 items-center justify-center rounded-md border border-current/15 text-xs">
                                                {item.initials}
                                            </span>
                                            {item.title}
                                        </Link>
                                    ) : (
                                        <div className="space-y-1">
                                            <div
                                                className={`flex items-center gap-3 rounded-md px-3 py-3 text-sm font-semibold ${
                                                    isActive(item.path)
                                                        ? 'bg-slate-950 text-white'
                                                        : 'text-slate-800'
                                                }`}
                                            >
                                                <span className="flex h-8 w-8 items-center justify-center rounded-md border border-current/15 text-xs">
                                                    {item.initials}
                                                </span>
                                                {item.title}
                                            </div>
                                            <ul className="ml-11 space-y-1 border-l border-slate-200 pl-3">
                                                {item.children.map((child) => (
                                                    <li key={child.path}>
                                                        <Link
                                                            href={child.path}
                                                            className={`block rounded-md px-3 py-2 text-sm transition ${
                                                                url === child.path || url.startsWith(child.path.replace(/#.*$/, ''))
                                                                    ? 'bg-blue-50 font-semibold text-blue-800'
                                                                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950'
                                                            }`}
                                                        >
                                                            {child.title}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </nav>

                    <div className="border-t border-slate-200 p-4">
                        <div className="rounded-md border border-emerald-200 bg-emerald-50 p-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">
                                Integridade activa
                            </p>
                            <p className="mt-1 text-sm text-emerald-900">
                                Validacao automatica por provincia e trilha de auditoria habilitada.
                            </p>
                        </div>
                    </div>
                </aside>

                <main className="lg:pl-72">
                    <div className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 px-5 py-4 backdrop-blur lg:px-8">
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                                    Conselho Superior da Magistratura Judicial
                                </p>
                                <p className="text-sm font-medium text-slate-800">
                                    {title ?? 'Gestao Integrada'}
                                </p>
                            </div>
                            <div className="flex items-center gap-3">
                                <span className="rounded-md border border-slate-200 px-3 py-2 text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Ambiente institucional
                                </span>
                                <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-950 text-xs font-bold text-white">
                                    AD
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="px-5 py-6 lg:px-8 lg:py-8">{children}</div>
                </main>
            </div>
        </>
    );
}
