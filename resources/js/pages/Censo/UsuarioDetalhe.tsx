import Layout from '@/components/Layout';
import { Link, useForm, usePage } from '@inertiajs/react';
import { FormEvent, ReactNode } from 'react';

interface Option {
    value: string;
    label: string;
}

interface Province {
    id: number;
    nome: string;
    sigla?: string;
}

interface UserPayload {
    id: number;
    name: string;
    email?: string;
    numero_agente: string;
    cargo?: string;
    telefone?: string;
    status?: string;
    province_id?: number;
    categoria_profissional?: string;
    classe?: string;
    tipo_usuario?: string;
    province?: Province;
    magistrate?: Career | null;
    justice_officer?: Career | null;
}

interface Career {
    categoria?: string;
    nivel?: string;
    situacao?: string;
}

interface CensusRecord {
    id: number;
    census_status?: string;
    functional_status?: string;
    life_proof_status?: boolean;
    life_proof_method?: string;
    notes?: string;
    validation_date?: string;
    validator?: { name: string };
    irregularities?: Array<{
        id: number;
        type: string;
        severity: string;
        description: string;
        is_resolved: boolean;
    }>;
}

interface Props {
    user: UserPayload;
    record?: CensusRecord | null;
    provinces: Province[];
    statusOptions: Option[];
    censusStatusOptions: Option[];
    functionalStatusOptions: Option[];
}

const careerLabels: Record<string, string> = {
    magistrate: 'Magistrado',
    justice_officer: 'Funcionário judicial',
    none: 'Sem carreira definida',
};

export default function UsuarioDetalhe({ user, record, provinces, statusOptions, censusStatusOptions, functionalStatusOptions }: Props) {
    const { props } = usePage();
    const flash = (props as any).flash;
    const careerType = user.magistrate ? 'magistrate' : user.justice_officer ? 'justice_officer' : 'none';
    const career = user.magistrate ?? user.justice_officer ?? {};

    const { data, setData, put, processing, errors } = useForm({
        name: user.name ?? '',
        email: user.email ?? '',
        numero_agente: user.numero_agente ?? '',
        telefone: user.telefone ?? '',
        cargo: user.cargo ?? '',
        status: user.status ?? 'ativo',
        province_id: user.province_id ? String(user.province_id) : '',
        categoria_profissional: user.categoria_profissional ?? '',
        classe: user.classe ?? '',
        tipo_usuario: user.tipo_usuario ?? '',
        career_type: careerType,
        career_categoria: career.categoria ?? '',
        career_nivel: career.nivel ?? '',
        career_situacao: career.situacao ?? user.status ?? 'ativo',
        census_status: record?.census_status ?? 'em_preenchimento',
        functional_status: record?.functional_status ?? 'pendente_confirmacao',
        life_proof_status: Boolean(record?.life_proof_status),
        life_proof_method: record?.life_proof_method ?? '',
        notes: record?.notes ?? '',
    });

    const submit = (event: FormEvent) => {
        event.preventDefault();
        put(`/censo/usuarios/${user.id}`, { preserveScroll: true });
    };

    return (
        <Layout title={`Ficha do funcionário - ${user.name}`}>
            <form onSubmit={submit} className="space-y-6">
                <section className="border-b border-slate-200 pb-6">
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                        <div>
                            <Link href="/censo/registros" className="text-sm font-bold text-blue-700 hover:text-blue-900">
                                Voltar à lista
                            </Link>
                            <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-950">{user.name}</h1>
                            <p className="mt-2 text-sm text-slate-500">
                                Número de agente {user.numero_agente || 'por definir'} · {careerLabels[careerType]}
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <StatusBadge label={data.status || 'sem_estado'} tone={isActive(data.status) ? 'emerald' : 'rose'} />
                            <StatusBadge label={data.census_status || 'sem_censo'} tone={data.census_status === 'validado' ? 'emerald' : 'amber'} />
                        </div>
                    </div>
                </section>

                {flash?.success && (
                    <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-900">
                        {flash.success}
                    </div>
                )}

                <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
                    <div className="space-y-6">
                        <Panel title="Dados do funcionário" description="Informação de identificação, contacto e enquadramento institucional.">
                            <div className="grid gap-4 md:grid-cols-2">
                                <Input label="Nome completo" value={data.name} onChange={(value) => setData('name', value)} error={errors.name} required />
                                <Input label="Número de agente" value={data.numero_agente} onChange={(value) => setData('numero_agente', value)} error={errors.numero_agente} required />
                                <Input label="E-mail" type="email" value={data.email} onChange={(value) => setData('email', value)} error={errors.email} />
                                <Input label="Telefone" value={data.telefone} onChange={(value) => setData('telefone', value)} error={errors.telefone} />
                                <Input label="Cargo / função" value={data.cargo} onChange={(value) => setData('cargo', value)} error={errors.cargo} />
                                <Select label="Estado actual" value={data.status} onChange={(value) => setData('status', value)} options={statusOptions} error={errors.status} required />
                                <Select
                                    label="Província"
                                    value={data.province_id}
                                    onChange={(value) => setData('province_id', value)}
                                    options={provinces.map((province) => ({ value: String(province.id), label: province.nome }))}
                                    emptyLabel="Sem província"
                                    error={errors.province_id}
                                />
                                <Input label="Tipo de utilizador" value={data.tipo_usuario} onChange={(value) => setData('tipo_usuario', value)} error={errors.tipo_usuario} />
                            </div>
                        </Panel>

                        <Panel title="Carreira e categoria" description="Classificação funcional usada no censo e em relatórios de quadro de pessoal.">
                            <div className="grid gap-4 md:grid-cols-2">
                                <Select
                                    label="Tipo de carreira"
                                    value={data.career_type}
                                    onChange={(value) => setData('career_type', value)}
                                    options={[
                                        { value: 'magistrate', label: 'Magistrado' },
                                        { value: 'justice_officer', label: 'Funcionário judicial' },
                                        { value: 'none', label: 'Sem carreira definida' },
                                    ]}
                                />
                                <Input label="Categoria profissional" value={data.categoria_profissional} onChange={(value) => setData('categoria_profissional', value)} error={errors.categoria_profissional} />
                                <Input label="Classe" value={data.classe} onChange={(value) => setData('classe', value)} error={errors.classe} />
                                <Input label="Categoria da carreira" value={data.career_categoria} onChange={(value) => setData('career_categoria', value)} error={errors.career_categoria} />
                                <Input label="Nível / classe da carreira" value={data.career_nivel} onChange={(value) => setData('career_nivel', value)} error={errors.career_nivel} />
                                <Select label="Situação da carreira" value={data.career_situacao} onChange={(value) => setData('career_situacao', value)} options={statusOptions} error={errors.career_situacao} />
                            </div>
                        </Panel>

                        <Panel title="Avaliação do censo" description="Validação do vínculo, prova de vida e notas de acompanhamento.">
                            <div className="grid gap-4 md:grid-cols-2">
                                <Select label="Estado do censo" value={data.census_status} onChange={(value) => setData('census_status', value)} options={censusStatusOptions} error={errors.census_status} />
                                <Select label="Situação funcional apurada" value={data.functional_status} onChange={(value) => setData('functional_status', value)} options={functionalStatusOptions} error={errors.functional_status} />
                                <label className="flex items-center gap-3 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                                    <input
                                        type="checkbox"
                                        checked={data.life_proof_status}
                                        onChange={(event) => setData('life_proof_status', event.target.checked)}
                                        className="rounded border-slate-300"
                                    />
                                    Prova de vida confirmada
                                </label>
                                <Input label="Método da prova de vida" value={data.life_proof_method} onChange={(value) => setData('life_proof_method', value)} error={errors.life_proof_method} placeholder="Presencial, documento, biometria..." />
                                <label className="md:col-span-2">
                                    <span className="text-sm font-semibold text-slate-700">Notas de avaliação</span>
                                    <textarea
                                        value={data.notes}
                                        onChange={(event) => setData('notes', event.target.value)}
                                        className="mt-2 min-h-32 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
                                    />
                                    {errors.notes && <p className="mt-1 text-sm text-rose-700">{errors.notes}</p>}
                                </label>
                            </div>
                        </Panel>
                    </div>

                    <aside className="space-y-6">
                        <Panel title="Resumo de estado">
                            <div className="space-y-3 text-sm">
                                <InfoLine label="Estado actual" value={label(data.status)} />
                                <InfoLine label="Censo" value={label(data.census_status)} />
                                <InfoLine label="Prova de vida" value={data.life_proof_status ? 'Confirmada' : 'Pendente'} />
                                <InfoLine label="Última validação" value={record?.validation_date ? new Date(record.validation_date).toLocaleDateString('pt-PT') : 'Sem validação'} />
                                <InfoLine label="Validador" value={record?.validator?.name ?? 'Não informado'} />
                            </div>
                        </Panel>

                        <Panel title="Irregularidades">
                            <div className="space-y-3">
                                {record?.irregularities?.length ? record.irregularities.map((item) => (
                                    <div key={item.id} className="rounded-lg border border-slate-200 p-3 text-sm">
                                        <div className="flex items-center justify-between gap-2">
                                            <p className="font-bold text-slate-900">{label(item.type)}</p>
                                            <StatusBadge label={item.is_resolved ? 'Resolvida' : item.severity} tone={item.is_resolved ? 'emerald' : item.severity === 'alta' ? 'rose' : 'amber'} />
                                        </div>
                                        <p className="mt-2 text-slate-500">{item.description}</p>
                                    </div>
                                )) : (
                                    <p className="text-sm text-slate-500">Sem irregularidades registadas.</p>
                                )}
                            </div>
                        </Panel>

                        <button
                            type="submit"
                            disabled={processing}
                            className="h-11 w-full rounded-md bg-blue-700 px-4 text-sm font-bold text-white shadow-sm transition hover:bg-blue-800 disabled:opacity-60"
                        >
                            {processing ? 'A guardar...' : 'Guardar avaliação e dados'}
                        </button>
                    </aside>
                </section>
            </form>
        </Layout>
    );
}

function Panel({ title, description, children }: { title: string; description?: string; children: ReactNode }) {
    return (
        <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-5 border-b border-slate-200 pb-4">
                <h2 className="text-lg font-bold text-slate-950">{title}</h2>
                {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
            </div>
            {children}
        </section>
    );
}

function Input({ label, value, onChange, type = 'text', error, required = false, placeholder }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    type?: string;
    error?: string;
    required?: boolean;
    placeholder?: string;
}) {
    return (
        <label>
            <span className="text-sm font-semibold text-slate-700">{label} {required && <span className="text-rose-700">*</span>}</span>
            <input
                type={type}
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="mt-2 h-11 w-full rounded-md border border-slate-300 px-3 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            />
            {error && <p className="mt-1 text-sm text-rose-700">{error}</p>}
        </label>
    );
}

function Select({ label, value, onChange, options, error, required = false, emptyLabel }: {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: Option[];
    error?: string;
    required?: boolean;
    emptyLabel?: string;
}) {
    return (
        <label>
            <span className="text-sm font-semibold text-slate-700">{label} {required && <span className="text-rose-700">*</span>}</span>
            <select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                className="mt-2 h-11 w-full rounded-md border border-slate-300 bg-white px-3 text-sm outline-none transition focus:border-blue-600 focus:ring-4 focus:ring-blue-100"
            >
                {emptyLabel && <option value="">{emptyLabel}</option>}
                {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            {error && <p className="mt-1 text-sm text-rose-700">{error}</p>}
        </label>
    );
}

function InfoLine({ label, value }: { label: string; value?: string }) {
    return (
        <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 px-3 py-2">
            <span className="text-slate-500">{label}</span>
            <strong className="text-right text-slate-900">{value || '-'}</strong>
        </div>
    );
}

function StatusBadge({ label, tone }: { label: string; tone: 'emerald' | 'amber' | 'rose' }) {
    const styles = {
        emerald: 'bg-emerald-50 text-emerald-800',
        amber: 'bg-amber-50 text-amber-800',
        rose: 'bg-rose-50 text-rose-800',
    };

    return <span className={`rounded-md px-2.5 py-1 text-xs font-bold ${styles[tone]}`}>{label}</span>;
}

function isActive(value?: string) {
    return ['ativo', 'activo', 'active'].includes(String(value || '').toLowerCase());
}

function label(value?: string) {
    return value ? value.replaceAll('_', ' ').replace(/\b\w/g, (char) => char.toUpperCase()) : '-';
}
