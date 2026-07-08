<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('census_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('census_campaign_id')->constrained();
            $table->foreignId('user_id')->nullable()->constrained(); // Quem fez a ação
            $table->string('action'); // inicio_censo, submissao, validacao, tentativa_manipulacao
            $table->string('ip_address')->nullable();
            $table->text('description');
            $table->json('metadata')->nullable();
            $table->timestamp('created_at');
        });
    }

    public function down(): void {
        Schema::dropIfExists('census_logs');
    }
};