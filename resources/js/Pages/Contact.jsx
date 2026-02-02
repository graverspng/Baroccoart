import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import SiteHeader from '@/Components/SiteHeader';

const placeholderBg = [
    'from-amber-500/70 via-pink-500/70 to-purple-500/70',
    'from-emerald-500/70 via-cyan-500/70 to-blue-500/70',
    'from-orange-500/70 via-amber-500/70 to-lime-500/70',
    'from-sky-500/70 via-indigo-500/70 to-violet-500/70',
];

export default function Contact({ contacts = [] }) {
    const { auth } = usePage().props;
    const isOwner = auth?.user?.is_owner;
    const [editing, setEditing] = useState(false);
    const [previews, setPreviews] = useState({});

    const {
        data,
        setData,
        patch,
        processing,
        recentlySuccessful,
    } = useForm({
        contacts,
        photo_files: {},
    });

    const cards = useMemo(() => data.contacts || [], [data.contacts]);
    const gridColsClass = (() => {
        if (cards.length <= 1) return 'md:grid-cols-1';
        if (cards.length === 2) return 'md:grid-cols-2';
        return 'md:grid-cols-3';
    })();

    const updateField = (id, key, value) => {
        setData('contacts', cards.map((c) => (c.id === id ? { ...c, [key]: value } : c)));
    };

    const handlePhoto = (id, fileList) => {
        if (!fileList || !fileList.length) return;
        const file = fileList[0];
        setData('photo_files', { ...(data.photo_files || {}), [id]: file });
        setPreviews((prev) => ({ ...prev, [id]: URL.createObjectURL(file) }));
    };

    const submit = () => {
        patch(route('contact.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setEditing(false);
                setPreviews({});
            },
            forceFormData: true,
        });
    };

    const avatarFor = (card, idx) => {
        const src = previews[card.id] || card.photo;
        if (src) {
            return (
                <img
                    src={src}
                    alt={card.lead}
                    className="h-20 w-20 rounded-full border border-white/10 object-cover shadow-lg"
                />
            );
        }
        const initials = (card.lead || card.title || '?')
            .split(' ')
            .filter(Boolean)
            .slice(0, 2)
            .map((w) => w[0]?.toUpperCase() || '')
            .join('');
        const gradient = placeholderBg[idx % placeholderBg.length];
        return (
            <div
                className={`flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br ${gradient} text-lg font-semibold text-white shadow-lg`}
            >
                {initials || '?'}
            </div>
        );
    };

    return (
        <>
            <Head title="Kontakti" />
            <div className="min-h-screen bg-[#050505] text-white">
                <div className="mx-auto flex max-w-6xl flex-col px-6 pb-16 md:pb-24">
                    <SiteHeader />

                    <section className="py-6 text-center md:py-10 slide-pop" style={{ animationDelay: '0.05s' }}>
                        <p className="text-sm uppercase tracking-[0.2em] text-white/60 fade-in-up">
                            Projektēšanas birojs BAROCCO ART
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl fade-in-up">
                            Arhitektūra · Interjers · Projektēšana · Būvniecība
                        </h1>
                        <p className="mx-auto mt-4 max-w-3xl text-white/70 fade-in-up-delayed">
                            Sazinieties ar mums par interjera dizainu, arhitektūru vai būvniecības
                            risinājumiem. Zemāk atradīsiet tiešos kontaktus atbildīgajiem cilvēkiem.
                        </p>
                        {isOwner && (
                            <div className="mt-4 flex items-center justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() => setEditing((v) => !v)}
                                    className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                                >
                                    {editing ? 'Aizvērt' : 'Rediģēt'}
                                </button>
                                {recentlySuccessful && (
                                    <span className="text-xs text-green-300">Saglabāts</span>
                                )}
                            </div>
                        )}
                    </section>

                    <section className={`grid grid-cols-1 gap-6 ${gridColsClass}`}>
                        {cards.map((item, index) => (
                            <div
                                key={item.id ?? item.slug ?? item.title}
                                className="flex h-full flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur slide-pop"
                                style={{ animationDelay: `${0.1 + index * 0.08}s` }}
                            >
                                <div className="flex flex-col items-start gap-3">
                                    {avatarFor(item, index)}
                                    <div>
                                        <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                                            {editing ? (
                                                <input
                                                    type="text"
                                                    value={item.title}
                                                    onChange={(e) =>
                                                        updateField(item.id, 'title', e.target.value)
                                                    }
                                                    className="w-full rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                                                />
                                            ) : (
                                                item.title
                                            )}
                                        </p>
                                        <h2 className="text-xl font-semibold">
                                            {editing ? (
                                                <input
                                                    type="text"
                                                    value={item.lead}
                                                    onChange={(e) =>
                                                        updateField(item.id, 'lead', e.target.value)
                                                    }
                                                    className="mt-1 w-full rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                                                />
                                            ) : (
                                                item.lead
                                            )}
                                        </h2>
                                    </div>
                                </div>

                                <div className="space-y-2 text-white/80">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.16em] text-white/50">
                                            Email
                                        </p>
                                        {editing ? (
                                            <input
                                                type="email"
                                                value={item.email}
                                                onChange={(e) =>
                                                    updateField(item.id, 'email', e.target.value)
                                                }
                                                className="w-full rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                                            />
                                        ) : (
                                            <a
                                                href={`mailto:${item.email}`}
                                                className="text-white hover:text-white/80"
                                            >
                                                {item.email}
                                            </a>
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.16em] text-white/50">
                                            Telefons
                                        </p>
                                        {editing ? (
                                            <div className="flex flex-col gap-2">
                                                <input
                                                    type="text"
                                                    value={item.phone}
                                                    onChange={(e) =>
                                                        updateField(item.id, 'phone', e.target.value)
                                                    }
                                                    className="w-full rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                                                />
                                                <input
                                                    type="text"
                                                    value={item.tag || ''}
                                                    onChange={(e) =>
                                                        updateField(item.id, 'tag', e.target.value)
                                                    }
                                                    placeholder="Tag (WhatsApp, gsm...)"
                                                    className="w-full rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                                                />
                                                <label className="flex cursor-pointer items-center gap-2 text-xs uppercase tracking-[0.16em] text-white/60">
                                                    <span className="rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] transition hover:border-white hover:bg-white/10">
                                                        Nomainīt foto
                                                    </span>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        className="hidden"
                                                        onChange={(e) => handlePhoto(item.id, e.target.files || [])}
                                                    />
                                                </label>
                                            </div>
                                        ) : (
                                            <a
                                                href={`tel:${(item.phone || '').replace(/\s+/g, '')}`}
                                                className="text-white hover:text-white/80"
                                            >
                                                {item.phone} {item.tag}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="mt-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 md:flex-row md:items-center md:justify-between slide-pop" style={{ animationDelay: `${0.4 + cards.length * 0.08}s` }}>
                        <div className="space-y-2">
                            <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                                Sazināties
                            </p>
                            <h3 className="text-2xl font-semibold">Pastāsti par savu projektu</h3>
                            <p className="text-white/70">
                                Raksti mums jebkurā laikā. Atbildēsim, lai vienotos par nākamajiem soļiem un tikšanās laiku.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="mailto:barocco@baroccoart.lv"
                                className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10"
                            >
                                barocco@baroccoart.lv
                            </a>
                            <a
                                href="tel:+37126262626"
                                className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10"
                            >
                                +371 26262626
                            </a>
                            <a
                                href="https://wa.me/37126262626"
                                className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
                            >
                                WhatsApp
                            </a>
                        </div>
                    </section>

                    {isOwner && editing && (
                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                onClick={submit}
                                disabled={processing}
                                className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60"
                            >
                                Saglabāt
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditing(false)}
                                className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10"
                            >
                                Atcelt
                            </button>
                        </div>
                    )}

                    <footer className="mt-10 text-xs text-white/50">
                        © 2025 Barocco Art.
                    </footer>
                </div>
            </div>
        </>
    );
}
