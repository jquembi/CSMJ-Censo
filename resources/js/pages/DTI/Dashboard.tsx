import Layout from '@/components/Layout';
import { usePage } from '@inertiajs/react';

export default function DTIDashboard() {
    const { props } = usePage();
    const stats = props.stats as any;

    return (
        <Layout title="DTI - Dashboard">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        DTI - Departamento de Tecnologia e Informação
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Bem-vindo ao painel de controle do DTI
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Total Candidaturas
                                </p>
                                <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
                                    {stats.total_candidaturas}
                                </p>
                            </div>
                            <div className="text-4xl">📋</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Pendentes
                                </p>
                                <p className="mt-2 text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                                    {stats.candidaturas_pendentes}
                                </p>
                            </div>
                            <div className="text-4xl">⏳</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Aprovadas
                                </p>
                                <p className="mt-2 text-3xl font-bold text-green-600 dark:text-green-400">
                                    {stats.candidaturas_aprovadas}
                                </p>
                            </div>
                            <div className="text-4xl">✅</div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                    Projetos Ativos
                                </p>
                                <p className="mt-2 text-3xl font-bold text-blue-600 dark:text-blue-400">
                                    {stats.projetos_ativos}
                                </p>
                            </div>
                            <div className="text-4xl">🚀</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Ações Rápidas
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <a
                            href="/dti/candidatura-interna"
                            className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                        >
                            <span className="text-2xl">📝</span>
                            <span className="font-medium text-blue-700 dark:text-blue-300">
                                Nova Candidatura
                            </span>
                        </a>
                        <a
                            href="/dti/projetos"
                            className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
                        >
                            <span className="text-2xl">📊</span>
                            <span className="font-medium text-green-700 dark:text-green-300">
                                Ver Projetos
                            </span>
                        </a>
                        <a
                            href="/dti/suporte"
                            className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
                        >
                            <span className="text-2xl">🎫</span>
                            <span className="font-medium text-orange-700 dark:text-orange-300">
                                Abrir Ticket
                            </span>
                        </a>
                        <a
                            href="/dti/relatorios"
                            className="flex items-center gap-3 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-colors"
                        >
                            <span className="text-2xl">📈</span>
                            <span className="font-medium text-purple-700 dark:text-purple-300">
                                Relatórios
                            </span>
                        </a>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Atividade Recente
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="text-2xl">📋</div>
                            <div className="flex-1">
                                <p className="font-medium text-gray-900 dark:text-white">
                                    Nenhuma atividade recente
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                    As atividades do DTI aparecerão aqui
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
