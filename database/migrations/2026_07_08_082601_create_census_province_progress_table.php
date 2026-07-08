<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('census_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('census_campaign_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('province_id')->constrained();
            $table->string('agent_number')->index();
            
            // Estados do Censo
            $table->string('census_status')->default('pendente'); 
            // pendente, em_preenchimento, submetido, validado, correcao, rejeitado, nao_localizado, irregular
            
            // Prova de Vida
            $table->boolean('life_proof_status')->default(false);
            $table->timestamp('life_proof_date')->nullable();
            $table->string('life_proof_method')->nullable(); // biometria, presencial, remoto, documental
            
            // Auditoria de Validação (RH)
            $table->foreignId('validated_by')->nullable()->constrained('users');
            $table->timestamp('validation_date')->nullable();
            
            $table->text('notes')->nullable();
            $table->json('data_snapshot')->nullable(); // Snapshot do Profile no momento do censo
            
            $table->timestamps();

            // Evitar duplicidade do mesmo utilizador na mesma campanha
            $table->unique(['census_campaign_id', 'user_id']);
        });
    }

    public function down(): void {
        Schema::dropIfExists('census_records');
    }
};