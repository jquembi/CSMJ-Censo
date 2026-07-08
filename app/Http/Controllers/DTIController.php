<?php

namespace App\Http\Controllers;

use App\Models\DTICandidaturaInterna;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DTIController extends Controller
{
    /**
     * Display the DTI dashboard.
     */
    public function dashboard()
    {
        $stats = [
            'total_candidaturas' => DTICandidaturaInterna::count(),
            'candidaturas_pendentes' => DTICandidaturaInterna::where('status', 'pendente')->count(),
            'candidaturas_aprovadas' => DTICandidaturaInterna::where('status', 'aprovada')->count(),
            'projetos_ativos' => 3,
            'tickets_abertos' => 2,
        ];

        return Inertia::render('DTI/Dashboard', [
            'stats' => $stats,
        ]);
    }

    /**
     * Display the Candidatura Interna page.
     */
    public function candidaturaInterna()
    {
        $candidaturas = DTICandidaturaInterna::latest()->get();

        return Inertia::render('DTI/CandidaturaInterna', [
            'candidaturas' => $candidaturas,
        ]);
    }

    /**
     * Store a new candidatura interna.
     */
    public function storeCandidaturaInterna(Request $request)
    {
        $validated = $request->validate([
            'nome' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'telefone' => 'required|string|max:20',
            'cargo_desejado' => 'required|string|max:255',
            'departamento_atual' => 'required|string|max:255',
            'motivacao' => 'required|string',
            'experiencia' => 'required|string',
            'formacao' => 'required|string',
        ]);

        DTICandidaturaInterna::create($validated);

        return back()->with('success', 'Candidatura enviada com sucesso!');
    }

    /**
     * Display the Projetos page.
     */
    public function projetos()
    {
        return Inertia::render('DTI/Projetos', [
            'projetos' => [],
        ]);
    }

    /**
     * Display the Suporte page.
     */
    public function suporte()
    {
        return Inertia::render('DTI/Suporte', [
            'tickets' => [],
        ]);
    }

    /**
     * Display the Relatórios page.
     */
    public function relatorios()
    {
        return Inertia::render('DTI/Relatorios', [
            'relatorios' => [],
        ]);
    }
}
