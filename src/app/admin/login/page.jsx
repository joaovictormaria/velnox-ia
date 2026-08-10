'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        setError('Usuário ou senha inválidos.');
        setLoading(false);
        return;
      }

      router.push('/admin');
      router.refresh();
    } catch {
      setError('Falha ao conectar. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6 bg-background">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-card/60 backdrop-blur-xl border border-border rounded-2xl p-8 space-y-4"
      >
        <h1 className="font-display text-2xl font-bold text-center mb-2">Admin</h1>

        <div>
          <label htmlFor="admin-username" className="block text-sm text-muted-foreground mb-1.5">
            Usuário
          </label>
          <input
            id="admin-username"
            type="text"
            required
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors"
          />
        </div>

        <div>
          <label htmlFor="admin-password" className="block text-sm text-muted-foreground mb-1.5">
            Senha
          </label>
          <input
            id="admin-password"
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-background/60 border border-border text-foreground text-sm focus:outline-none focus:border-neon-cyan/50 transition-colors"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-cyan to-neon-magenta text-background font-semibold text-sm hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all disabled:opacity-60"
        >
          {loading ? 'Entrando...' : 'Entrar'} <LogIn className="w-4 h-4" />
        </button>
      </form>
    </main>
  );
}
