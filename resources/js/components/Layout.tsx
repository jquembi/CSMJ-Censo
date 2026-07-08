import { ReactNode } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Head } from '@inertiajs/react';

interface LayoutProps {
    children: ReactNode;
    title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
    const { url } = usePage();
    
    const menuItems = [
        {
            title: 'Dashboard',
            icon: '🏠',
            path: '/dashboard',
            children: []
        },
        {
            title: 'DTI - Departamento de Tecnologia e Informação',
            icon: '💻',
            path: '/dti',
            children: [
                { title: 'Dashboard', path: '/dti/dashboard' },
                { title: 'Candidatura Interna', path: '/dti/candidatura-interna' },
                { title: 'Projetos', path: '/dti/projetos' },
                { title: 'Suporte', path: '/dti/suporte' },
                { title: 'Relatórios', path: '/dti/relatorios' },
            ]
        },
        {
            title: 'Censo',
            icon: '📊',
            path: '/censo',
            children: [
                { title: 'Dashboard', path: '/censo/dashboard' },
                { title: 'Registros', path: '/censo/registros' },
            ]
        }
    ];

    const isActive = (path: string) => {
        return url === path || url.startsWith(path + '/');
    };

    return (
        <>
            <Head title={title} />
            <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
                {/* Sidebar */}
                <aside className="w-64 bg-white dark:bg-gray-800 shadow-lg flex flex-col">
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                            CSMJ Sistema
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Gestão Integrada
                        </p>
                    </div>
                    
                    <nav className="flex-1 overflow-y-auto p-4">
                        <ul className="space-y-2">
                            {menuItems.map((item, index) => (
                                <li key={index}>
                                    {item.children.length === 0 ? (
                                        <Link
                                            href={item.path}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                                isActive(item.path)
                                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                            }`}
                                        >
                                            <span className="text-xl">{item.icon}</span>
                                            <span className="font-medium">{item.title}</span>
                                        </Link>
                                    ) : (
                                        <div className="space-y-1">
                                            <div className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                                isActive(item.path)
                                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                                    : 'text-gray-700 dark:text-gray-300'
                                            }`}>
                                                <span className="text-xl">{item.icon}</span>
                                                <span className="font-medium">{item.title}</span>
                                            </div>
                                            <ul className="ml-8 space-y-1">
                                                {item.children.map((child, childIndex) => (
                                                    <li key={childIndex}>
                                                        <Link
                                                            href={child.path}
                                                            className={`block px-4 py-2 rounded-lg text-sm transition-colors ${
                                                                isActive(child.path)
                                                                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                                                    : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
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
                    
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                                U
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-gray-800 dark:text-white">Usuário</p>
                                <p className="text-xs text-gray-500 dark:text-gray-400">Administrador</p>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto">
                    <div className="p-8">
                        {children}
                    </div>
                </main>
            </div>
        </>
    );
}
