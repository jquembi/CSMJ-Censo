<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('census_campaigns', function (Blueprint $table) {
            $table->id();
            $table->string('name'); // Ex: Censo Nacional 2024
            $table->year('year');
            $table->date('start_date');
            $table->date('end_date');
            $table->string('status')->default('rascunho'); // rascunho, activa, em_validacao, encerrada
            $table->text('description')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void {
        Schema::dropIfExists('census_campaigns');
    }
};
