import { useState } from 'react';
import Layout from '@/components/Layout';
import { useForm } from '@inertiajs/react';

export default function CandidaturaInterna() {
    const { data, setData, post, processing, errors } = useForm({
        nome: '',
        email: '',
        telefone: '',
        cargo_desejado: '',
        departamento_atual: '',
        motivacao: '',
        experiencia: '',
        formacao: '',
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/dti/candidatura-interna');
    };

    return (
        <Layout title="DTI - Candidatura Interna">
            <div className="space-y-6">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Candidatura Interna
                    </h1>
                    <p className="mt-2 text-gray-600 dark:text-gray-400">
                        Preencha o formulário abaixo para se candidatar a uma vaga interna no DTI
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Informações Pessoais */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Informações Pessoais
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Nome Completo *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.nome}
                                        onChange={(e) => setData('nome', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.nome && (
                                        <p className="mt-1 text-sm text-red-600">{errors.nome}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Telefone *
                                    </label>
                                    <input
                                        type="tel"
                                        value={data.telefone}
                                        onChange={(e) => setData('telefone', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.telefone && (
                                        <p className="mt-1 text-sm text-red-600">{errors.telefone}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Departamento Atual *
                                    </label>
                                    <input
                                        type="text"
                                        value={data.departamento_atual}
                                        onChange={(e) => setData('departamento_atual', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    />
                                    {errors.departamento_atual && (
                                        <p className="mt-1 text-sm text-red-600">{errors.departamento_atual}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Informações da Candidatura */}
                        <div>
                            <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Informações da Candidatura
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Cargo Desejado *
                                    </label>
                                    <select
                                        value={data.cargo_desejado}
                                        onChange={(e) => setData('cargo_desejado', e.target.value)}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        required
                                    >
                                        <option value="">Selecione o cargo</option>
                                        <option value="desenvolvedor_junior">Desenvolvedor Júnior</option>
                                        <option value="desenvolvedor_pleno">Desenvolvedor Pleno</option>
                                        <option value="desenvolvedor_senior">Desenvolvedor Sênior</option>
                                        <option value="analista_sistemas">Analista de Sistemas</option>
                                        <option value="gestor_projetos">Gestor de Projetos</option>
                                        <option value="administrador_rede">Administrador de Rede</option>
                                        <option value="analista_seguranca">Analista de Segurança</option>
                                        <option value="suporte_ti">Suporte TI</option>
                                    </select>
                                    {errors.cargo_desejado && (
                                        <p className="mt-1 text-sm text-red-600">{errors.cargo_desejado}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Formação Acadêmica *
                                    </label>
                                    <textarea
                                        value={data.formacao}
                                        onChange={(e) => setData('formacao', e.target.value)}
                                        rows={3}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Descreva sua formação acadêmica..."
                                        required
                                    />
                                    {errors.formacao && (
                                        <p className="mt-1 text-sm text-red-600">{errors.formacao}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Experiência Profissional *
                                    </label>
                                    <textarea
                                        value={data.experiencia}
                                        onChange={(e) => setData('experiencia', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Descreva sua experiência profissional relevante..."
                                        required
                                    />
                                    {errors.experiencia && (
                                        <p className="mt-1 text-sm text-red-600">{errors.experiencia}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Motivação para a Candidatura *
                                    </label>
                                    <textarea
                                        value={data.motivacao}
                                        onChange={(e) => setData('motivacao', e.target.value)}
                                        rows={4}
                                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        placeholder="Por que você deseja se juntar ao DTI e qual o seu interesse nesta vaga?"
                                        required
                                    />
                                    {errors.motivacao && (
                                        <p className="mt-1 text-sm text-red-600">{errors.motivacao}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="flex justify-end gap-4">
                            <a
                                href="/dti/dashboard"
                                className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                            >
                                Cancelar
                            </a>
                            <button
                                type="submit"
                                disabled={processing}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {processing ? 'Enviando...' : 'Enviar Candidatura'}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Info Box */}
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                    <div className="flex gap-3">
                        <div className="text-2xl">ℹ️</div>
                        <div>
                            <h3 className="font-semibold text-blue-900 dark:text-blue-300">
                                Informações Importantes
                            </h3>
                            <p className="mt-1 text-sm text-blue-800 dark:text-blue-400">
                                Após o envio da candidatura, você receberá uma confirmação por email.
                                O processo de seleção inclui análise curricular, entrevista técnica e
                                entrevista comportamental. O prazo de resposta é de até 15 dias úteis.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
