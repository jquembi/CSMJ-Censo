import Layout from '@/components/Layout';

export default function Relatorios() {
    return (
        <Layout title="DTI - Relatórios">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Relatórios DTI
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Visualize e exporte relatórios do Departamento de Tecnologia e Informação
                    </p>
                </div>

                {/* Report Categories */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="text-4xl mb-4">📊</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Candidaturas
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Relatório de candidaturas internas por período, cargo e status
                        </p>
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Gerar Relatório
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="text-4xl mb-4">🚀</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Projetos
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Status e progresso dos projetos em andamento no DTI
                        </p>
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Gerar Relatório
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="text-4xl mb-4">🎫</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Suporte
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Estatísticas de tickets de suporte e tempo de resposta
                        </p>
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Gerar Relatório
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="text-4xl mb-4">💻</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Equipamentos
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Inventário de equipamentos e status de manutenção
                        </p>
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Gerar Relatório
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="text-4xl mb-4">👥</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Equipe
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Informações sobre a equipe do DTI e distribuição de cargos
                        </p>
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Gerar Relatório
                        </button>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow cursor-pointer">
                        <div className="text-4xl mb-4">📈</div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Desempenho
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Métricas de desempenho e KPIs do departamento
                        </p>
                        <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            Gerar Relatório
                        </button>
                    </div>
                </div>

                {/* Recent Reports */}
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                        Relatórios Recentes
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="text-2xl">📊</div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        Candidaturas - Julho 2026
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Gerado em: 08/07/2026 às 10:30
                                    </p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                                Download
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="text-2xl">🚀</div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        Projetos - Q2 2026
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Gerado em: 01/07/2026 às 14:15
                                    </p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                                Download
                            </button>
                        </div>

                        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <div className="flex items-center gap-4">
                                <div className="text-2xl">🎫</div>
                                <div>
                                    <p className="font-medium text-gray-900 dark:text-white">
                                        Suporte - Junho 2026
                                    </p>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        Gerado em: 30/06/2026 às 17:45
                                    </p>
                                </div>
                            </div>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm">
                                Download
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
