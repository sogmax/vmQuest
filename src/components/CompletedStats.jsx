import React from 'react';

import vulnhub from '../data/vulnhub.json';
import dockerlabs from '../data/dockerlabs.json';
import hackmyvm from '../data/hackmyvm.json';

/* =========================
   Configuración por plataforma
   ========================= */

const platforms = {
    VulnHub: {
        data: vulnhub,
        getDifficulty: (m) => m.difficultyLevel
    },
    DockerLabs: {
        data: dockerlabs,
        getDifficulty: (m) => m.difficultyLevel
    },
    HackMyVM: {
        data: hackmyvm,
        getDifficulty: (m) => m.difficultyLevel
    }
};

/* =========================
   Normalización de dificultad
   ========================= */

function normalizeDifficulty(value) {
    if (!value) return '⚪ Desconocida';

    const v = value.toString().trim().toLowerCase();

    if (['beginner', 'novato'].includes(v)) return '🟣 Beginner';
    if (['easy', 'facil', 'fácil'].includes(v)) return '🟢 Easy';
    if (['medium', 'medio', 'media'].includes(v)) return '🟡 Medium';
    if (['hard', 'dificil', 'difícil'].includes(v)) return '🔴 Hard';
    if (
        ['very hard', 'muy dificil', 'muy difícil', 'insane', 'extreme'].includes(
            v
        )
    )
        return '⚫ Muy Difícil';

    return `⚪ ${value}`;
}

/* =========================
   Stats por plataforma
   ========================= */

function getPlatformStats(platform) {
    const difficulties = {};

    platform.data.forEach((machine) => {
        const diff = normalizeDifficulty(platform.getDifficulty(machine));
        difficulties[diff] = (difficulties[diff] || 0) + 1;
    });

    return {
        total: platform.data.length,
        difficulties
    };
}

/* =========================
   Stats globales
   ========================= */

function getGlobalStats() {
    const global = {
        total: 0,
        difficulties: {}
    };

    Object.values(platforms).forEach((platform) => {
        platform.data.forEach((machine) => {
            const diff = normalizeDifficulty(platform.getDifficulty(machine));

            global.total++;
            global.difficulties[diff] =
                (global.difficulties[diff] || 0) + 1;
        });
    });

    return global;
}

/* =========================
   Componente
   ========================= */

export default function CompletedStats() {
    const globalStats = getGlobalStats();

    return (
        <section className="space-y-8">
            {/* ===== Card global (ancho completo) ===== */}
            <div className="rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 p-8 text-center">
                <h3 className="text-sm uppercase tracking-widest text-slate-400">
                    Total de máquinas resueltas
                </h3>

                <p className="mt-3 text-6xl font-extrabold text-white">
                    {globalStats.total}
                </p>

                <ul className="mt-6 flex flex-wrap justify-center gap-2 text-sm">
                    {Object.entries(globalStats.difficulties).map(
                        ([label, count]) => (
                            <li
                                key={label}
                                className="rounded-full bg-slate-800 px-3 py-1"
                            >
                                {label}: {count}
                            </li>
                        )
                    )}
                </ul>
            </div>

            {/* ===== Grid de plataformas (medio tamaño) ===== */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {Object.entries(platforms).map(([name, platform]) => {
                    const stats = getPlatformStats(platform);

                    if (stats.total === 0) return null;

                    return (
                        <div
                            key={name}
                            className="rounded-xl border border-slate-800 bg-slate-900 p-6"
                        >
                            <h3 className="text-xl font-semibold">{name}</h3>

                            <p className="mt-1 text-sm text-slate-400">
                                Total: <strong>{stats.total}</strong>
                            </p>

                            <ul className="mt-4 flex flex-wrap gap-2 text-sm">
                                {Object.entries(stats.difficulties).map(
                                    ([label, count]) => (
                                        <li
                                            key={label}
                                            className="rounded-full bg-slate-800 px-3 py-1"
                                        >
                                            {label}: {count}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
