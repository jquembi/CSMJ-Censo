import { useState } from 'react';
import Layout from '@/components/Layout';
import { useForm } from '@inertiajs/react';

export default function Suporte() {
    const { data, setData, post, processing, errors } = useForm({
        assunto: '',
        prioridade: 'baixa',
        descricao: '',
        categoria: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dti/suporte');
    };

    return (
        <Layout title="DTI - Suporte">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Suporte Técnico
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Abra um ticket de suporte para solicitar assistência técnica
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* New Ticket Form */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Novo Ticket
                        </h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Assunto *
                                </label>
                                <input
                                    type="text"
                                    value={data.assunto}
                                    onChange={(e) => setData('assunto', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                />
                                {errors.assunto && (
                                    <p className="mt-1 text-sm text-red-600">{errors.assunto}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Categoria *
                                </label>
                                <select
                                    value={data.categoria}
                                    onChange={(e) => setData('categoria', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="">Selecione a categoria</option>
                                    <option value="hardware">Hardware</option>
                                    <option value="software">Software</option>
                                    <option value="rede">Rede</option>
                                    <option value="acesso">Acesso/Senha</option>
                                    <option value="sistema">Sistema</option>
                                    <option value="outro">Outro</option>
                                </select>
                                {errors.categoria && (
                                    <p className="mt-1 text-sm text-red-600">{errors.categoria}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Prioridade *
                                </label>
                                <select
                                    value={data.prioridade}
                                    onChange={(e) => setData('prioridade', e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    required
                                >
                                    <option value="baixa">Baixa</option>
                                    <option value="media">Média</option>
                                    <option value="alta">Alta</option>
                                    <option value="urgente">Urgente</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Descrição *
                                </label>
                                <textarea
                                    value={data.descricao}
                                    onChange={(e) => setData('descricao', e.target.value)}
                                    rows={4}
                                    className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    placeholder="Descreva o problema em detalhes..."
                                    required
                                />
                                {errors.descricao && (
                                    <p className="mt-1 text-sm text-red-600">{errors.descricao}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {processing ? 'Enviando...' : 'Abrir Ticket'}
                            </button>
                        </form>
                    </div>

                    {/* Recent Tickets */}
                    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                            Tickets Recentes
                        </h2>
                        <div className="space-y-4">
                            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        #001 - Problema com impressora
                                    </span>
                                    <span className="px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-xs font-medium rounded">
                                        Resolvido
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Impressora não está respondendo na rede
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    Aberto em: 08/07/2026
                                </p>
                            </div>

                            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        #002 - Acesso ao sistema
                                    </span>
                                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300 text-xs font-medium rounded">
                                        Em Análise
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Usuário não consegue acessar o portal
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    Aberto em: 08/07/2026
                                </p>
                            </div>

                            <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-gray-900 dark:text-white">
                                        #003 - Instalação de software
                                    </span>
                                    <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-xs font-medium rounded">
                                        Em Progresso
                                    </span>
                                </div>
                                <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                    Solicitação de instalação do Office 365
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-500">
                                    Aberto em: 07/07/2026
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex gap-3">
                        <div className="text-2xl">📞</div>
                        <div>
                            <h3 className="font-semibold text-blue-900 dark:text-blue-300">
                                Contato de Emergência
                            </h3>
                            <p className="mt-1 text-sm text-blue-800 dark:text-blue-400">
                                Para casos urgentes fora do horário comercial, entre em contato pelo
                                telefone: +244 9XX XXX XXX ou email: suporte@csmj.ao
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
