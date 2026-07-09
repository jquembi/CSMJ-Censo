<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('census_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('census_campaign_id')->constrained()->cascadeOnDelete();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('province_id')->constrained();
            $table->string('agent_number')->index();
            $table->string('personnel_type')->nullable();
            $table->string('functional_status')->default('pendente_confirmacao');
            $table->string('census_status')->default('nao_iniciado');
            $table->boolean('life_proof_status')->default(false);
            $table->timestamp('life_proof_date')->nullable();
            $table->string('life_proof_method')->nullable();
            $table->unsignedSmallInteger('not_located_attempts')->default(0);
            $table->timestamp('not_located_confirmed_at')->nullable();
            $table->foreignId('validated_by')->nullable()->constrained('users');
            $table->timestamp('validation_date')->nullable();
            $table->text('notes')->nullable();
            $table->json('data_snapshot')->nullable();
            $table->string('integrity_hash', 128)->nullable();
            $table->timestamps();

            $table->unique(['census_campaign_id', 'user_id']);
            $table->unique(['census_campaign_id', 'agent_number']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('census_records');
    }
};
