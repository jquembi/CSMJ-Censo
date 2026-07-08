<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('dti_candidaturas_internas', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->nullable()->constrained()->onDelete('set null');
            $table->string('nome');
            $table->string('email');
            $table->string('telefone');
            $table->string('cargo_desejado');
            $table->string('departamento_atual');
            $table->text('motivacao');
            $table->text('experiencia');
            $table->text('formacao');
            $table->enum('status', ['pendente', 'em_analise', 'aprovada', 'rejeitada'])->default('pendente');
            $table->text('observacoes')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dti_candidaturas_internas');
    }
};
