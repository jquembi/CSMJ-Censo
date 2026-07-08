import Layout from '@/components/Layout';

export default function Projetos() {
    return (
        <Layout title="DTI - Projetos">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Projetos DTI
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Gerencie e acompanhe os projetos do Departamento de Tecnologia e Informação
                    </p>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-3xl">🌐</span>
                            <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded-full">
                                Em Andamento
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Portal do Censo
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Sistema de gestão e coleta de dados do censo municipal
                        </p>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Progresso: 75%</span>
                            <span className="text-blue-600 dark:text-blue-400 font-medium">Ver detalhes</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-3xl">🔒</span>
                            <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded-full">
                                Planejamento
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Sistema de Segurança
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Implementação de novas políticas de segurança da informação
                        </p>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Progresso: 20%</span>
                            <span className="text-blue-600 dark:text-blue-400 font-medium">Ver detalhes</span>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-3xl">☁️</span>
                            <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded-full">
                                Em Análise
                            </span>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Migração Cloud
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                            Migração de servidores locais para infraestrutura cloud
                        </p>
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 dark:text-gray-400">Progresso: 0%</span>
                            <span className="text-blue-600 dark:text-blue-400 font-medium">Ver detalhes</span>
                        </div>
                    </div>
                </div>

                {/* Add New Project Button */}
                <div className="flex justify-center">
                    <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
                        <span className="text-xl">➕</span>
                        <span>Novo Projeto</span>
                    </button>
                </div>
            </div>
        </Layout>
    );
}
