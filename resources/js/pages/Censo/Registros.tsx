import Layout from '@/components/Layout';
import { Link, router } from '@inertiajs/react';

interface Province {
    id: number;
    nome: string;
    sigla?: string;
}

interface CensusRecord {
    id: number;
    agent_number: string;
    personnel_type?: string;
    functional_status: string;
    census_status: string;
    life_proof_status: boolean;
    province?: Province;
    user?: {
        name: string;
        email?: string;
        cargo?: string;
        categoria_profissional?: string;
        classe?: string;
    };
}

interface PaginatedRecords {
    data: CensusRecord[];
    current_page: number;
    last_page: number;
    prev_page_url?: string;
    next_page_url?: string;
    total?: number;
}

interface Props {
    provinces: Province[];
    selectedProvinceId?: number;
    records: PaginatedRecords;
}

const statusLabels: Record<string, string> = {
    nao_iniciado: 'Nao iniciado',
    em_preenchimento: 'Em preenchimento',
    submetido: 'Submetido',
    pendente_validacao: 'Pendente de validacao',
    validado: 'Validado',
    correcao: 'Correcao solicitada',
    rejeitado: 'Rejeitado',
    expirado: 'Expirado',
    nao_localizado: 'Nao localizado',
    irregular: 'Indicio de irregularidade',
    falecido_confirmado: 'Falecido confirmado',
    reformado_confirmado: 'Reformado confirmado',
};

const statusStyles: Record<string, string> = {
    nao_iniciado: 'bg-slate-100 text-slate-700',
    em_preenchimento: 'bg-blue-50 text-blue-800',
    submetido: 'bg-indigo-50 text-indigo-800',
    pendente_validacao: 'bg-amber-50 text-amber-800',
    validado: 'bg-emerald-50 text-emerald-800',
    correcao: 'bg-orange-50 text-orange-800',
    rejeitado: 'bg-rose-50 text-rose-800',
    expirado: 'bg-slate-200 text-slate-800',
    nao_localizado: 'bg-zinc-100 text-zinc-800',
    irregular: 'bg-rose-50 text-rose-800',
    falecido_confirmado: 'bg-slate-900 text-white',
    reformado_confirmado: 'bg-emerald-50 text-emerald-800',
};

const functionalLabels: Record<string, string> = {
    ativo: 'Activo',
    inativo: 'Inactivo',
    suspenso: 'Suspenso',
    licenciado: 'Licenciado',
    transferido: 'Transferido',
    reformado_aposentado: 'Reformado/Aposentado',
    falecido: 'Falecido',
    pendente_confirmacao: 'Pendente de confirmacao',
};

const personnelLabels: Record<string, string> = {
    magistrado: 'Magistrado',
    funcionario_judicial: 'Funcionario Judicial',
    nao_classificado: 'Nao classificado',
};

function formatNumber(value?: number) {
    return new Intl.NumberFormat('pt-AO').format(value ?? 0);
}

export default function CensoRegistros({ provinces, selectedProvinceId, records }: Props) {
    const changeProvince = (provinceId: string) => {
        router.get('/censo/registros', provinceId ? { province_id: provinceId } : {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const selectedProvince = provinces.find((province) => province.id === selectedProvinceId);

    return (
        <Layout title="Colaboradores no Censo">
            <div className="space-y-7">
                <section className="border-b border-slate-200 pb-6">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                        <div>
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-md bg-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                                    Operacao provincial
                                </span>
                                <span className="rounded-md border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-blue-800">
                                    Numero de agente obrigatorio
                                </span>
                            </div>
                            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
                                Colaboradores no Censo
                            </h1>
                            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                                Consulta operacional para confirmacao de vinculo, prova de vida,
                                pendencias documentais e classificacao funcional por provincia judicial.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <select
                                value={selectedProvinceId ?? ''}
                                onChange={(event) => changeProvince(event.target.value)}
                                className="h-11 min-w-72 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="">Visao nacional consolidada</option>
                                {provinces.map((province) => (
                                    <option key={province.id} value={province.id}>
                                        {province.nome}
                                    </option>
                                ))}
                            </select>
                            <Link
                                href="/censo/dashboard"
                                className="inline-flex h-11 items-center justify-center rounded-md border border-slate-300 bg-white px-4 text-sm font-bold text-slate-700 shadow-sm transition hover:bg-slate-50"
                            >
                                Voltar ao painel
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-slate-500">Escopo seleccionado</p>
                        <p className="mt-2 text-2xl font-bold text-slate-950">
                            {selectedProvince?.nome ?? 'Nacional'}
                        </p>
                    </div>
                    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm font-semibold text-slate-500">Registros listados</p>
                        <p className="mt-2 text-2xl font-bold text-slate-950">{formatNumber(records.total ?? records.data.length)}</p>
                    </div>
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5">
                        <p className="text-sm font-semibold text-emerald-800">Integridade da consulta</p>
                        <p className="mt-2 text-2xl font-bold text-emerald-950">Auditavel</p>
                    </div>
                </section>

                {!selectedProvinceId && (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
                        Para execucao local do censo, seleccione uma provincia judicial. A visao nacional existe para
                        supervisao, auditoria e consolidacao de relatorios.
                    </div>
                )}

                <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-2 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-950">Ficha operacional dos colaboradores</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Estados institucionais sem acusacao automatica e com rastreabilidade para RH.
                            </p>
                        </div>
                        <span className="rounded-md bg-slate-100 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-600">
                            Pagina {records.current_page} de {records.last_page}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-slate-200 text-sm">
                            <thead className="bg-slate-50">
                                <tr>
                                    {['Agente', 'Colaborador', 'Provincia', 'Tipo', 'Situacao funcional', 'Estado do censo', 'Prova de vida'].map((header) => (
                                        <th key={header} className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {records.data.map((record) => (
                                    <tr key={record.id} className="hover:bg-slate-50">
                                        <td className="px-6 py-4">
                                            <span className="rounded-md bg-slate-950 px-2.5 py-1 text-xs font-bold text-white">
                                                {record.agent_number}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="font-bold text-slate-950">{record.user?.name ?? '-'}</p>
                                            <p className="mt-1 text-xs text-slate-500">{record.user?.cargo ?? record.user?.categoria_profissional ?? 'Cargo por confirmar'}</p>
                                        </td>
                                        <td className="px-6 py-4 font-medium text-slate-700">{record.province?.nome ?? '-'}</td>
                                        <td className="px-6 py-4 text-slate-700">
                                            {personnelLabels[record.personnel_type ?? ''] ?? record.personnel_type ?? '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                                                {functionalLabels[record.functional_status] ?? record.functional_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${statusStyles[record.census_status] ?? 'bg-slate-100 text-slate-700'}`}>
                                                {statusLabels[record.census_status] ?? record.census_status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${record.life_proof_status ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
                                                {record.life_proof_status ? 'Confirmada' : 'Pendente'}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="flex flex-col gap-3 border-t border-slate-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
                        <p className="text-sm text-slate-500">
                            A listagem usa o numero de agente como identificador institucional unico.
                        </p>
                        <div className="flex gap-2">
                            {records.prev_page_url && (
                                <Link href={records.prev_page_url} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
                                    Anterior
                                </Link>
                            )}
                            {records.next_page_url && (
                                <Link href={records.next_page_url} className="rounded-md border border-slate-300 px-3 py-2 text-sm font-bold text-slate-700 hover:bg-slate-50">
                                    Seguinte
                                </Link>
                            )}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
}
