import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';

export default function ServiceDetail({ service }) {
    const { auth } = usePage().props;
    const isOwner = auth?.user?.is_owner;
    const [editing, setEditing] = useState(false);

    const {
        data,
        setData,
        patch,
        processing,
        recentlySuccessful,
    } = useForm({
        label: service.label,
        heading: service.heading,
        body: Array.isArray(service.body) ? service.body.join('\n') : service.body || '',
        hero_image: service.hero_image || '',
        images: Array.isArray(service.images) ? [...service.images] : [],
        newImage: '',
        uploadFiles: null,
    });

    const submit = () => {
        patch(route('service.update', service.slug), {
            preserveScroll: true,
            onSuccess: () => setEditing(false),
            forceFormData: true,
        });
    };

    const heroSrc = useMemo(() => {
        if (data.hero_image) return data.hero_image;
        if (data.images && data.images.length) return data.images[0];
        return '';
    }, [data.hero_image, data.images]);

    const addImage = () => {
        if (!data.newImage.trim()) return;
        setData('images', [...(data.images || []), data.newImage.trim()]);
        setData('newImage', '');
    };

    const removeImage = (url) => {
        setData(
            'images',
            (data.images || []).filter((img) => img !== url),
        );
    };

    return (
        <>
            <Head title={service.label} />
            <div className="min-h-screen bg-[#050505] text-white">
                <div className="mx-auto flex max-w-6xl flex-col px-6 pb-16 md:pb-24">
                    <header className="flex items-center justify-between py-6">
                        <Link
                            href="/"
                            className="text-lg font-semibold tracking-tight hover:text-white"
                        >
                            Barocco Art
                        </Link>
                        <nav className="flex items-center gap-4 text-sm text-white/80 md:gap-8">
                            <Link
                                href={`${route('services')}#celtnieciba`}
                                className="transition hover:text-white"
                            >
                                Celtniecība
                            </Link>
                            <Link
                                href={`${route('services')}#projektesana`}
                                className="transition hover:text-white"
                            >
                                Projektēšana
                            </Link>
                            <Link
                                href={`${route('services')}#interjera-dizains`}
                                className="transition hover:text-white"
                            >
                                Interjera dizains
                            </Link>
                            <Link
                                href={`${route('services')}#mebeles`}
                                className="transition hover:text-white"
                            >
                                Mēbeles
                            </Link>
                            <Link
                                href={route('contact')}
                                className="transition hover:text-white"
                            >
                                Kontakti
                            </Link>
                            {!auth?.user && (
                                <Link
                                    href={route('login')}
                                    className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                                >
                                    Owner Login
                                </Link>
                            )}
                            {auth?.user && (
                                <Link
                                    href={route('logout')}
                                    method="post"
                                    as="button"
                                    className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                                >
                                    Izrakstīties
                                </Link>
                            )}
                        </nav>
                    </header>

                    <section className="grid gap-8 md:grid-cols-2">
                        <div className="space-y-4 fade-in-up">
                            {isOwner && (
                                <div className="flex items-center gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setEditing((v) => !v)}
                                        className="rounded-full border border-white/30 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                                    >
                                        {editing ? 'Aizvērt' : 'Rediģēt'}
                                    </button>
                                    {recentlySuccessful && (
                                        <span className="text-xs text-green-300">
                                            Saglabāts
                                        </span>
                                    )}
                                </div>
                            )}
                            <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                                {editing ? (
                                    <input
                                        type="text"
                                        value={data.label}
                                        onChange={(e) => setData('label', e.target.value)}
                                        className="w-full rounded-2xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                                    />
                                ) : (
                                    data.label
                                )}
                            </p>
                            <h1 className="text-3xl font-semibold md:text-4xl">
                                {editing ? (
                                    <input
                                        type="text"
                                        value={data.heading}
                                        onChange={(e) => setData('heading', e.target.value)}
                                        className="w-full rounded-2xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                                    />
                                ) : (
                                    data.heading
                                )}
                            </h1>
                            <div className="space-y-3 text-white/80">
                                {editing ? (
                                    <textarea
                                        value={data.body}
                                        onChange={(e) => setData('body', e.target.value)}
                                        rows={8}
                                        className="w-full rounded-2xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                                    />
                                ) : (
                                    (data.body || '')
                                        .split('\n')
                                        .map((line) => line.trim())
                                        .filter(Boolean)
                                        .map((line) => <p key={line}>{line}</p>)
                                )}
                            </div>
                        </div>
                        <div
                            className="overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl fade-in-up"
                            style={{ animationDelay: '0.1s' }}
                        >
                            {heroSrc ? (
                                <img
                                    src={heroSrc}
                                    alt={data.label}
                                    className="aspect-[4/3] w-full object-cover"
                                    loading="lazy"
                                />
                            ) : (
                                <div className="flex aspect-[4/3] items-center justify-center text-white/50">
                                    Nav attēla
                                </div>
                            )}
                        </div>
                    </section>

                    {editing && (
                        <section className="mt-8 space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                                    Galvenais attēls (URL)
                                </label>
                                <input
                                    type="url"
                                    value={data.hero_image}
                                    onChange={(e) => setData('hero_image', e.target.value)}
                                    className="w-full rounded-2xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                                    Papildu attēli (URL)
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {(data.images || []).map((url) => (
                                        <div
                                            key={url}
                                            className="group relative w-32 overflow-hidden rounded-xl border border-white/15 bg-black/40"
                                        >
                                            <img
                                                src={url}
                                                alt=""
                                                className="aspect-square w-full object-cover"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeImage(url)}
                                                className="absolute right-2 top-2 rounded-full bg-red-600 px-2 py-1 text-xs font-semibold text-white opacity-0 transition group-hover:opacity-100"
                                            >
                                                🗑
                                            </button>
                                        </div>
                                    ))}
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <input
                                        type="url"
                                        value={data.newImage}
                                        onChange={(e) => setData('newImage', e.target.value)}
                                        placeholder="https://..."
                                        className="min-w-0 flex-1 rounded-2xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                                    />
                                    <label className="flex cursor-pointer items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10">
                                        <span className="text-base">+</span>
                                        Augšupielādēt
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            className="hidden"
                                            onChange={(e) =>
                                                setData('uploadFiles', e.target.files)
                                            }
                                        />
                                    </label>
                                    <button
                                        type="button"
                                        onClick={addImage}
                                        className="flex items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                                    >
                                        <span className="text-base">+</span>
                                        Pievienot
                                    </button>
                                </div>
                            </div>

                            <div className="flex gap-3">
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
                        </section>
                    )}

                    {!editing && data.images && data.images.length > 0 && (
                        <section className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                            {data.images.map((url) => (
                                <div
                                    key={url}
                                    className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl"
                                >
                                    <img
                                        src={url}
                                        alt=""
                                        className="aspect-[4/3] w-full object-cover"
                                    />
                                </div>
                            ))}
                        </section>
                    )}

                    <div className="mt-10 flex flex-wrap gap-3">
                        <Link
                            href={route('services')}
                            className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10"
                        >
                            Atpakaļ uz pakalpojumiem
                        </Link>
                        <Link
                            href={route('contact')}
                            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
                        >
                            Sazināties
                        </Link>
                    </div>

                    <footer className="mt-10 text-xs text-white/50">
                        © 2025 Barocco Art. Atvērta apskate visiem apmeklētājiem.
                    </footer>
                </div>
            </div>
        </>
    );
}
