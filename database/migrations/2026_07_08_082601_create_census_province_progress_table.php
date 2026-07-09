<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('census_province_progress', function (Blueprint $table) {
            $table->id();
            $table->foreignId('census_campaign_id')->constrained()->cascadeOnDelete();
            $table->foreignId('province_id')->constrained();
            $table->unsignedInteger('total_expected')->default(0);
            $table->unsignedInteger('total_validated')->default(0);
            $table->unsignedInteger('total_pending')->default(0);
            $table->unsignedInteger('total_not_located')->default(0);
            $table->unsignedInteger('total_irregular')->default(0);
            $table->string('status')->default('nao_iniciado');
            $table->timestamp('auto_completed_at')->nullable();
            $table->string('integrity_hash', 128)->nullable();
            $table->timestamps();

            $table->unique(['census_campaign_id', 'province_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('census_province_progress');
    }
};
