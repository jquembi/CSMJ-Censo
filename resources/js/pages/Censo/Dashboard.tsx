import Layout from '@/components/Layout';
import { Link, router } from '@inertiajs/react';

interface Province {
    id: number;
    nome: string;
    sigla?: string;
}

interface ProvinceProgress {
    id: number;
    census_campaign_id: number;
    province_id: number;
    total_expected: number;
    total_validated: number;
    total_pending: number;
    total_not_located: number;
    total_irregular: number;
    status: string;
    auto_completed_at?: string;
    province?: Province;
}

interface ReportItem {
    name: string;
    status: string;
    scope: string;
}

interface Props {
    campaign: { id: number; name: string; year: number; status: string };
    provinces: Province[];
    selectedProvinceId?: number;
    progress: ProvinceProgress[];
    riskProvinces: ProvinceProgress[];
    reports: ReportItem[];
    summary: {
        total_expected: number;
        total_validated: number;
        total_pending: number;
        total_not_located: number;
        total_irregular: number;
        completed_provinces: number;
        total_provinces: number;
        validation_rate: number;
        pending_rate: number;
        integrity_alerts: number;
    };
}

const statusLabels: Record<string, string> = {
    nao_iniciado: 'Nao iniciado',
    em_execucao: 'Em execucao',
    em_validacao: 'Em validacao',
    concluido_automaticamente: 'Concluido automaticamente',
    encerrado: 'Encerrado',
};

const statusStyles: Record<string, string> = {
    nao_iniciado: 'bg-slate-100 text-slate-700',
    em_execucao: 'bg-blue-50 text-blue-800',
    em_validacao: 'bg-amber-50 text-amber-800',
    concluido_automaticamente: 'bg-emerald-50 text-emerald-800',
    encerrado: 'bg-slate-900 text-white',
};

function pct(value: number, total: number) {
    if (!total) return 0;
    return Math.round((value / total) * 100);
}

function formatNumber(value: number) {
    return new Intl.NumberFormat('pt-AO').format(value);
}

export default function CensoDashboard({
    campaign,
    provinces,
    selectedProvinceId,
    progress,
    riskProvinces,
    reports,
    summary,
}: Props) {
    const changeProvince = (provinceId: string) => {
        router.get('/censo/dashboard', provinceId ? { province_id: provinceId } : {}, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    return (
        <Layout title="Censo e Controlo de Pessoal">
            <div className="space-y-8">
                <section className="border-b border-slate-200 pb-6">
                    <div className="flex flex-col gap-5 xl:flex-row xl:items-end xl:justify-between">
                        <div className="max-w-4xl">
                            <div className="flex flex-wrap items-center gap-2">
                                <span className="rounded-md bg-slate-950 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white">
                                    Recursos Humanos
                                </span>
                                <span className="rounded-md border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-wide text-emerald-800">
                                    Anti-manipulacao activo
                                </span>
                                <span className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
                                    Campanha {campaign.year}
                                </span>
                            </div>
                            <h1 className="mt-4 text-4xl font-bold tracking-tight text-slate-950">
                                Censo e Controlo de Pessoal
                            </h1>
                            <p className="mt-3 max-w-3xl text-base leading-7 text-slate-600">
                                Painel institucional para prova de vida, confirmacao de vinculo,
                                controlo do quadro de pessoal e apuramento de vagas reais por provincia judicial.
                            </p>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
                            <select
                                value={selectedProvinceId ?? ''}
                                onChange={(event) => changeProvince(event.target.value)}
                                className="h-11 min-w-64 rounded-md border border-slate-300 bg-white px-3 text-sm font-medium text-slate-800 shadow-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                            >
                                <option value="">Todas as provincias judiciais</option>
                                {provinces.map((province) => (
                                    <option key={province.id} value={province.id}>
                                        {province.nome}
                                    </option>
                                ))}
                            </select>
                            <Link
                                href="/censo/registros"
                                className="inline-flex h-11 items-center justify-center rounded-md bg-blue-700 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800"
                            >
                                Ver colaboradores
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
                    {[
                        ['Cobertura validada', `${summary.validation_rate}%`, `${formatNumber(summary.total_validated)} de ${formatNumber(summary.total_expected)} colaboradores`, 'border-blue-200 bg-blue-50 text-blue-900'],
                        ['Pendentes de confirmacao', formatNumber(summary.total_pending), `${summary.pending_rate}% do universo actual`, 'border-amber-200 bg-amber-50 text-amber-900'],
                        ['Indicios de irregularidade', formatNumber(summary.total_irregular), `${summary.integrity_alerts} provincias com alerta`, 'border-rose-200 bg-rose-50 text-rose-900'],
                        ['Provincias concluidas', `${summary.completed_provinces}/${summary.total_provinces}`, 'Conclusao apenas automatica', 'border-emerald-200 bg-emerald-50 text-emerald-900'],
                    ].map(([label, value, detail, className]) => (
                        <div key={label} className={`rounded-lg border p-5 ${className}`}>
                            <p className="text-sm font-semibold">{label}</p>
                            <p className="mt-3 text-4xl font-bold tracking-tight">{value}</p>
                            <p className="mt-2 text-sm opacity-80">{detail}</p>
                        </div>
                    ))}
                </section>

                <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1fr_380px]">
                    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm" id="quadro">
                        <div className="flex flex-col gap-3 border-b border-slate-200 px-6 py-5 md:flex-row md:items-center md:justify-between">
                            <div>
                                <h2 className="text-lg font-bold text-slate-950">Matriz provincial do censo</h2>
                                <p className="mt-1 text-sm text-slate-500">
                                    Recalculo continuo com base nos colaboradores reais do banco institucional.
                                </p>
                            </div>
                            <span className="rounded-md bg-slate-100 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-600">
                                {progress.length} provincias em acompanhamento
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 text-sm">
                                <thead className="bg-slate-50">
                                    <tr>
                                        {['Provincia judicial', 'Validacao', 'Pendencias', 'Nao localizados', 'Risco', 'Estado', ''].map((header) => (
                                            <th key={header} className="px-6 py-3 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                                                {header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {progress.map((item) => {
                                        const rate = pct(item.total_validated, item.total_expected);

                                        return (
                                            <tr key={item.id} className="hover:bg-slate-50">
                                                <td className="px-6 py-4">
                                                    <p className="font-bold text-slate-950">{item.province?.nome ?? `Provincia ${item.province_id}`}</p>
                                                    <p className="text-xs uppercase tracking-wide text-slate-500">{item.province?.sigla ?? 'Provincia judicial'}</p>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex min-w-44 items-center gap-3">
                                                        <div className="h-2 flex-1 overflow-hidden rounded bg-slate-200">
                                                            <div className="h-full bg-blue-700" style={{ width: `${rate}%` }} />
                                                        </div>
                                                        <span className="w-10 text-right font-bold text-slate-800">{rate}%</span>
                                                    </div>
                                                    <p className="mt-1 text-xs text-slate-500">
                                                        {formatNumber(item.total_validated)} / {formatNumber(item.total_expected)}
                                                    </p>
                                                </td>
                                                <td className="px-6 py-4 font-semibold text-amber-800">{formatNumber(item.total_pending)}</td>
                                                <td className="px-6 py-4 font-semibold text-slate-700">{formatNumber(item.total_not_located)}</td>
                                                <td className="px-6 py-4">
                                                    <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${item.total_irregular > 0 ? 'bg-rose-50 text-rose-800' : 'bg-emerald-50 text-emerald-800'}`}>
                                                        {item.total_irregular > 0 ? `${item.total_irregular} alerta(s)` : 'Sem alerta'}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${statusStyles[item.status] ?? 'bg-slate-100 text-slate-700'}`}>
                                                        {statusLabels[item.status] ?? item.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <Link
                                                        href={`/censo/registros?province_id=${item.province_id}`}
                                                        className="font-bold text-blue-700 hover:text-blue-900"
                                                    >
                                                        Abrir
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <aside className="space-y-6">
                        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-950">Centro de integridade</h2>
                            <div className="mt-5 space-y-4">
                                {[
                                    ['Conclusao manual', 'Bloqueada', 'bg-emerald-50 text-emerald-800'],
                                    ['Hash de progresso', 'Activo', 'bg-emerald-50 text-emerald-800'],
                                    ['Logs automaticos', 'Activo', 'bg-emerald-50 text-emerald-800'],
                                    ['Alteracoes em massa', 'Sob validacao', 'bg-amber-50 text-amber-800'],
                                ].map(([name, state, className]) => (
                                    <div key={name} className="flex items-center justify-between gap-4">
                                        <span className="text-sm font-medium text-slate-600">{name}</span>
                                        <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${className}`}>{state}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
                            <h2 className="text-lg font-bold text-slate-950">Prioridades provinciais</h2>
                            <div className="mt-4 space-y-3">
                                {riskProvinces.length === 0 ? (
                                    <p className="text-sm text-slate-500">Nao existem provincias com pendencias relevantes.</p>
                                ) : (
                                    riskProvinces.map((item) => (
                                        <Link
                                            key={item.id}
                                            href={`/censo/registros?province_id=${item.province_id}`}
                                            className="block rounded-md border border-slate-200 p-3 transition hover:border-blue-300 hover:bg-blue-50"
                                        >
                                            <div className="flex items-center justify-between gap-3">
                                                <p className="font-bold text-slate-900">{item.province?.nome}</p>
                                                <span className="text-xs font-bold text-rose-700">{item.total_irregular} risco(s)</span>
                                            </div>
                                            <p className="mt-1 text-sm text-slate-500">{item.total_pending} pendencias por validar</p>
                                        </Link>
                                    ))
                                )}
                            </div>
                        </div>
                    </aside>
                </section>

                <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm" id="relatorios">
                    <div className="flex flex-col gap-2 border-b border-slate-200 pb-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="text-lg font-bold text-slate-950">Relatorios institucionais</h2>
                            <p className="mt-1 text-sm text-slate-500">
                                Produtos de decisao para RH, concursos internos, progressoes e auditoria.
                            </p>
                        </div>
                        <span className="rounded-md bg-slate-100 px-3 py-2 text-xs font-bold uppercase tracking-wide text-slate-600">
                            Baseado em dados validados
                        </span>
                    </div>
                    <div className="mt-5 grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-5">
                        {reports.map((report) => (
                            <div key={report.name} className="rounded-lg border border-slate-200 p-4">
                                <p className="text-sm font-bold text-slate-950">{report.name}</p>
                                <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-500">{report.scope}</p>
                                <span className="mt-3 inline-flex rounded-md bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                                    {report.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </Layout>
    );
}
