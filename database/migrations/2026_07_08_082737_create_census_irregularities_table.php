<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('census_irregularities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('census_record_id')->constrained()->cascadeOnDelete();
            $table->string('type'); // duplicidade, documento_invalido, ausencia_fisica, incoerencia_cargo
            $table->string('severity')->default('media'); // baixa, media, alta
            $table->text('description');
            
            $table->boolean('is_resolved')->default(false);
            $table->timestamp('resolved_at')->nullable();
            $table->foreignId('resolved_by')->nullable()->constrained('users');
            
            $table->timestamps();
        });
    }

    public function down(): void {
        Schema::dropIfExists('census_irregularities');
    }
};