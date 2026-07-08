import Layout from '@/components/Layout';
import { Link } from '@inertiajs/react';

export default function Dashboard() {
    return (
        <Layout title="Dashboard">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Bem-vindo ao CSMJ Sistema
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Sistema de Gestão Integrada - Conferência de São Miguel Janzada
                    </p>
                </div>

                {/* Quick Access Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <Link
                        href="/dti/dashboard"
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-4xl">💻</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    DTI
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Departamento de Tecnologia e Informação
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Acesse o painel do DTI para gerenciar candidaturas, projetos e suporte técnico.
                        </p>
                    </Link>

                    <Link
                        href="/censo/dashboard"
                        className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-4xl">📊</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Censo
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Sistema de Censo Municipal
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Acesse o sistema de gestão e coleta de dados do censo municipal.
                        </p>
                    </Link>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="text-4xl">👥</div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    RH
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    Recursos Humanos
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            Módulo em desenvolvimento. Em breve disponível.
                        </p>
                    </div>
                </div>

                {/* System Info */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Informações do Sistema
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Versão
                            </p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                1.0.0
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Última Atualização
                            </p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                08/07/2026
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                Status
                            </p>
                            <p className="text-lg font-semibold text-green-600 dark:text-green-400">
                                Operacional
                            </p>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Ações Rápidas
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <Link
                            href="/dti/candidatura-interna"
                            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            <span className="text-2xl">📝</span>
                            <span className="font-medium text-blue-700 dark:text-blue-300">
                                Nova Candidatura DTI
                            </span>
                        </Link>
                        <Link
                            href="/dti/suporte"
                            className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                        >
                            <span className="text-2xl">🎫</span>
                            <span className="font-medium text-orange-700 dark:text-orange-300">
                                Abrir Ticket
                            </span>
                        </Link>
                        <Link
                            href="/dti/projetos"
                            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                        >
                            <span className="text-2xl">🚀</span>
                            <span className="font-medium text-green-700 dark:text-green-300">
                                Ver Projetos
                            </span>
                        </Link>
                        <Link
                            href="/dti/relatorios"
                            className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                        >
                            <span className="text-2xl">📈</span>
                            <span className="font-medium text-purple-700 dark:text-purple-300">
                                Relatórios
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
