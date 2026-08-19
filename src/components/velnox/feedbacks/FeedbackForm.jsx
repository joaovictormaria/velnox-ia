'use client';

import React, { useRef, useState } from 'react';
import { Star, Camera, X, Check, Loader2, PenLine } from 'lucide-react';

const MAX_FILE_BYTES = 8 * 1024 * 1024;
const PHOTO_SIDE = 320;
const QUOTE_MIN = 20;
const QUOTE_MAX = 1200;

/**
 * Reduz a foto no navegador antes de subir: recorta o centro em quadrado (o
 * avatar e redondo, entao o resto da imagem seria descartado de qualquer jeito)
 * e devolve um JPEG de 320px, que da ~20 KB. Sem isso subiria a foto de 4 MB da
 * camera do celular para caber num circulo de 44px.
 */
async function toSquareDataUrl(file) {
  const bitmap = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const side = Math.min(bitmap.width, bitmap.height);

  const canvas = document.createElement('canvas');
  canvas.width = PHOTO_SIDE;
  canvas.height = PHOTO_SIDE;

  const ctx = canvas.getContext('2d');
  ctx.drawImage(
    bitmap,
    (bitmap.width - side) / 2,
    (bitmap.height - side) / 2,
    side,
    side,
    0,
    0,
    PHOTO_SIDE,
    PHOTO_SIDE
  );
  bitmap.close?.();

  return canvas.toDataURL('image/jpeg', 0.82);
}

/** @param {{ labels: Record<string, string>, locale: string }} props */
export default function FeedbackForm({ labels, locale }) {
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [hovered, setHovered] = useState(0);
  const [photo, setPhoto] = useState(null);
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState(null);
  const fileRef = useRef(null);
  const formRef = useRef(null);

  const shown = hovered || rating;

  const pickPhoto = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;

    if (file.size > MAX_FILE_BYTES) {
      setError(labels.errorPhoto);
      return;
    }

    try {
      setPhoto(await toSquareDataUrl(file));
      setError(null);
    } catch {
      setError(labels.errorPhoto);
    }
  };

  const submit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const quote = String(data.get('quote') ?? '').trim();
    const name = String(data.get('name') ?? '').trim();

    if (!name || quote.length < QUOTE_MIN) {
      setError(labels.errorInvalid);
      return;
    }

    setStatus('sending');
    setError(null);

    try {
      const response = await fetch('/api/testimonials', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          role: String(data.get('role') ?? '').trim(),
          quote,
          rating,
          photo,
          locale,
          website: String(data.get('website') ?? ''),
        }),
      });

      if (response.ok) {
        setStatus('sent');
        return;
      }

      const payload = await response.json().catch(() => ({}));
      setError(
        {
          photo: labels.errorPhoto,
          rate_limited: labels.errorRate,
          invalid: labels.errorInvalid,
        }[payload.error] ?? labels.errorServer
      );
      setStatus('idle');
    } catch {
      setError(labels.errorServer);
      setStatus('idle');
    }
  };

  const reset = () => {
    formRef.current?.reset();
    setOpen(false);
    setStatus('idle');
    setError(null);
    setPhoto(null);
    setRating(5);
  };

  if (status === 'sent') {
    return (
      <div className="mt-10 mx-auto max-w-xl rounded-2xl border border-neon-cyan/40 bg-card/60 p-6 text-center backdrop-blur-xl">
        <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-full bg-neon-cyan/15">
          <Check className="h-5 w-5 text-neon-cyan" strokeWidth={2.5} />
        </div>
        <p className="text-sm text-foreground">{labels.success}</p>
      </div>
    );
  }

  if (!open) {
    return (
      <div className="mt-10 text-center">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 rounded-full border border-neon-cyan/30 bg-card/60 px-6 py-3 text-sm font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:border-neon-cyan/60 hover:shadow-[0_0_25px_rgba(53,221,233,0.18)]"
        >
          <PenLine className="h-4 w-4 text-neon-cyan" />
          {labels.trigger}
        </button>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      onSubmit={submit}
      className="mt-10 mx-auto max-w-2xl rounded-2xl border border-border bg-card/50 p-6 backdrop-blur-xl md:p-8"
    >
      <div className="mb-6 text-center">
        <h3 className="font-display text-xl font-bold text-foreground">{labels.title}</h3>
        <p className="mt-1 text-xs text-muted-foreground">{labels.subtitle}</p>
      </div>

      {/* Campo isca: fora da tela e fora da ordem de tabulacao. Quem preenche
          e robo, e a rota descarta o envio em silencio. */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="absolute left-[-9999px] h-0 w-0 opacity-0"
      />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{labels.name}</span>
          <input
            type="text"
            name="name"
            required
            maxLength={60}
            placeholder={labels.namePlaceholder}
            className="w-full rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-neon-cyan/60"
          />
        </label>

        <label className="block">
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{labels.role}</span>
          <input
            type="text"
            name="role"
            maxLength={60}
            placeholder={labels.rolePlaceholder}
            className="w-full rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-neon-cyan/60"
          />
        </label>
      </div>

      <label className="mt-4 block">
        <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{labels.quote}</span>
        <textarea
          name="quote"
          required
          rows={5}
          minLength={QUOTE_MIN}
          maxLength={QUOTE_MAX}
          placeholder={labels.quotePlaceholder}
          className="w-full resize-y rounded-lg border border-border bg-background/60 px-3 py-2.5 text-sm leading-relaxed text-foreground outline-none transition-colors placeholder:text-muted-foreground/60 focus:border-neon-cyan/60"
        />
      </label>

      <div className="mt-5 flex flex-wrap items-start justify-between gap-6">
        {/* Radios de verdade por baixo das estrelas: a nota fica navegavel por
            teclado e anunciada pelo leitor de tela sem nenhum handler extra. */}
        <fieldset onMouseLeave={() => setHovered(0)}>
          <legend className="mb-1.5 text-xs font-medium text-muted-foreground">{labels.rating}</legend>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <label
                key={value}
                onMouseEnter={() => setHovered(value)}
                className="cursor-pointer p-0.5 focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-neon-cyan/60"
              >
                <input
                  type="radio"
                  name="rating"
                  value={value}
                  checked={rating === value}
                  onChange={() => setRating(value)}
                  className="sr-only"
                />
                <span className="sr-only">{labels.ratingValue.replace('{n}', String(value))}</span>
                <Star
                  aria-hidden
                  className={
                    value <= shown
                      ? 'h-6 w-6 fill-neon-cyan text-neon-cyan drop-shadow-[0_0_8px_rgba(53,221,233,0.6)] transition-transform duration-200 hover:scale-110'
                      : 'h-6 w-6 text-muted-foreground transition-transform duration-200 hover:scale-110'
                  }
                />
              </label>
            ))}
          </div>
        </fieldset>

        <div>
          <span className="mb-1.5 block text-xs font-medium text-muted-foreground">{labels.photo}</span>
          <div className="flex items-center gap-3">
            {photo ? (
              <img src={photo} alt="" className="h-12 w-12 rounded-full border border-neon-cyan/30 object-cover" />
            ) : (
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-dashed border-border">
                <Camera className="h-4 w-4 text-muted-foreground" />
              </div>
            )}

            <input ref={fileRef} type="file" accept="image/*" onChange={pickPhoto} className="sr-only" />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="rounded-lg border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-neon-cyan/50"
            >
              {labels.photoPick}
            </button>

            {photo ? (
              <button
                type="button"
                onClick={() => setPhoto(null)}
                aria-label={labels.photoRemove}
                className="rounded-lg border border-border p-2 text-muted-foreground transition-colors hover:border-neon-magenta/50 hover:text-foreground"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            ) : null}
          </div>
        </div>
      </div>

      {error ? (
        <p role="alert" className="mt-5 rounded-lg border border-neon-magenta/40 bg-neon-magenta/5 px-3 py-2 text-xs text-foreground">
          {error}
        </p>
      ) : null}

      <div className="mt-6 flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full px-4 py-2.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          {labels.cancel}
        </button>
        <button
          type="submit"
          disabled={status === 'sending'}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-neon-cyan to-neon-magenta px-6 py-2.5 text-sm font-semibold text-background transition-opacity disabled:opacity-60"
        >
          {status === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
          {status === 'sending' ? labels.sending : labels.submit}
        </button>
      </div>
    </form>
  );
}
