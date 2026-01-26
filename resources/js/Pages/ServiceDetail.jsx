import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { useMemo, useState } from 'react';
import OwnerPasswordModal from '@/Components/OwnerPasswordModal';
import SiteHeader from '@/Components/SiteHeader';

const layoutOptions = [
    {
        value: 'grid',
        label: 'Režģis',
        description: 'Vienmērīgs tīkls',
        icon: (
            <div className="grid grid-cols-2 gap-1">
                <span className="h-2 w-3 rounded-sm bg-white/70" />
                <span className="h-2 w-3 rounded-sm bg-white/70" />
                <span className="h-2 w-3 rounded-sm bg-white/70" />
                <span className="h-2 w-3 rounded-sm bg-white/70" />
            </div>
        ),
    },
    {
        value: 'masonry',
        label: 'Mozaīka',
        description: 'Dažādi izmēri',
        icon: (
            <div className="flex h-5 w-12 gap-1">
                <span className="h-full w-5 rounded-sm bg-white/70" />
                <span className="flex flex-1 flex-col gap-1">
                    <span className="flex-1 rounded-sm bg-white/70" />
                    <span className="flex-1 rounded-sm bg-white/70" />
                </span>
            </div>
        ),
    },
    {
        value: 'featured',
        label: 'Izceltā',
        description: 'Viens foto dominē',
        icon: (
            <div className="flex h-5 w-12 flex-col gap-1">
                <span className="h-2 rounded-sm bg-white/70" />
                <span className="flex flex-1 gap-1">
                    <span className="flex-1 rounded-sm bg-white/70" />
                    <span className="flex-1 rounded-sm bg-white/70" />
                </span>
            </div>
        ),
    },
];

export default function ServiceDetail({ service }) {
    const { auth } = usePage().props;
    const isOwner = auth?.user?.is_owner;
    const [previewUploads, setPreviewUploads] = useState([]);
    const [heroPreview, setHeroPreview] = useState('');
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
        gallery_layout: service.gallery_layout || 'grid',
        images: Array.isArray(service.images) ? [...service.images] : [],
        newImage: '',
        uploadFiles: [],
        hero_file: null,
    });

    const renderLine = (line) => {
        if (!line) return null;
        const parts = line.split(/[-–]/);
        if (parts.length > 1) {
            const [lead, ...rest] = parts;
            return (
                <>
                    <strong className="font-semibold text-white">{lead.trim()}</strong>
                    {` –${rest.join('–')}`}
                </>
            );
        }
        return line;
    };

    const displayImages = useMemo(() => {
        const list = [...(data.images || [])];
        if (heroPreview) {
            list.unshift(heroPreview);
        }
        return [...list, ...previewUploads];
    }, [data.images, previewUploads, heroPreview]);

    const editingImages = useMemo(
        () => [ ...(data.images || []), ...previewUploads ],
        [data.images, previewUploads],
    );
    const galleryLayout = data.gallery_layout || 'grid';
    const galleryImages = data.images || [];
    const galleryCardClass =
        'overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-xl';

    const submit = () => {
        patch(route('service.update', service.slug), {
            preserveScroll: true,
            onSuccess: () => {
                setEditing(false);
                setPreviewUploads([]);
                setHeroPreview('');
            },
            forceFormData: true,
        });
    };

    const heroSrc = useMemo(() => {
        if (heroPreview) return heroPreview;
        if (data.hero_image) return data.hero_image;
        if (displayImages.length) return displayImages[0];
        return '';
    }, [data.hero_image, displayImages, heroPreview]);

    const addImage = () => {
        if (!data.newImage.trim()) return;
        setData('images', [...(data.images || []), data.newImage.trim()]);
        setData('newImage', '');
    };

    const removeImage = (url) => {
        if (url === heroPreview) {
            setHeroPreview('');
            setData('hero_file', null);
        }

        setData('images', (data.images || []).filter((img) => img !== url));

        setPreviewUploads((prev) => {
            const idx = prev.indexOf(url);
            if (idx !== -1) {
                setData('uploadFiles', (files) =>
                    (files || []).filter((_, fileIdx) => fileIdx !== idx),
                );
            }
            return prev.filter((img) => img !== url);
        });
    };

    const handleFileSelect = (files) => {
        if (!files || !files.length) return;
        const nextFiles = Array.from(files);
        setData('uploadFiles', [ ...(data.uploadFiles || []), ...nextFiles ]);
        setPreviewUploads([
            ...previewUploads,
            ...nextFiles.map((file) => URL.createObjectURL(file)),
        ]);
    };

    const handleHeroFile = (files) => {
        if (!files || !files.length) return;
        const file = files[0];
        setData('hero_file', file);
        setHeroPreview(URL.createObjectURL(file));
    };

    const renderGallery = () => {
        if (!galleryImages.length) return null;

        if (galleryLayout === 'featured') {
            const [first, ...rest] = galleryImages;
            return (
                <section className="mt-10 space-y-6">
                    <div className={galleryCardClass}>
                        <img
                            src={first}
                            alt=""
                            className="aspect-[16/9] w-full object-cover"
                        />
                    </div>
                    {rest.length > 0 && (
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                            {rest.map((url) => (
                                <div key={url} className={galleryCardClass}>
                                    <img
                                        src={url}
                                        alt=""
                                        className="aspect-[4/3] w-full object-cover"
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            );
        }

        if (galleryLayout === 'masonry') {
            return (
                <section className="mt-10 grid auto-rows-[180px] grid-flow-dense grid-cols-1 gap-6 sm:auto-rows-[200px] sm:grid-cols-2 lg:grid-cols-3">
                    {galleryImages.map((url, index) => {
                        const isLarge = index % 6 === 0;
                        const isTall = index % 6 === 3;
                        return (
                            <div
                                key={url}
                                className={`${galleryCardClass} ${
                                    isLarge ? 'sm:row-span-2 lg:col-span-2' : ''
                                } ${isTall ? 'sm:row-span-2' : ''}`}
                            >
                                <img
                                    src={url}
                                    alt=""
                                    className="h-full w-full object-cover"
                                />
                            </div>
                        );
                    })}
                </section>
            );
        }

        return (
            <section className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
                {galleryImages.map((url) => (
                    <div key={url} className={galleryCardClass}>
                        <img
                            src={url}
                            alt=""
                            className="aspect-[4/3] w-full object-cover"
                        />
                    </div>
                ))}
            </section>
        );
    };

    return (
        <>
            <OwnerPasswordModal />
            <Head title={service.label} />
            <div className="min-h-screen bg-[#050505] text-white">
                <div className="mx-auto flex max-w-6xl flex-col px-6 pb-16 md:pb-24">
                    <SiteHeader />

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
                                        .map((line) => (
                                            <p key={line}>{renderLine(line)}</p>
                                        ))
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
                                <div className="flex flex-wrap gap-2">
                                    <input
                                        type="url"
                                        value={data.hero_image}
                                        onChange={(e) => {
                                            setHeroPreview('');
                                            setData('hero_file', null);
                                            setData('hero_image', e.target.value);
                                        }}
                                        placeholder="https://..."
                                        className="min-w-0 flex-1 rounded-2xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                                    />
                                    <label className="flex cursor-pointer items-center gap-2 rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10">
                                        <span className="text-base">+</span>
                                        Augšupielādēt
                                        <input
                                            type="file"
                                            accept="image/*"
                                            className="hidden"
                                            onChange={(e) => handleHeroFile(e.target.files || [])}
                                        />
                                    </label>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs uppercase tracking-[0.2em] text-white/60">
                                    Papildu attēli (URL)
                                </label>
                                <div className="flex flex-wrap gap-3">
                                    {editingImages.map((url) => (
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
                                                handleFileSelect(e.target.files || [])
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

                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                                    Foto izkārtojums
                                </p>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    {layoutOptions.map((option) => {
                                        const isActive = data.gallery_layout === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() =>
                                                    setData('gallery_layout', option.value)
                                                }
                                                aria-pressed={isActive}
                                                className={`group flex h-full flex-col gap-2 rounded-2xl border p-4 text-left transition ${
                                                    isActive
                                                        ? 'border-white bg-white/10'
                                                        : 'border-white/15 bg-black/40 hover:border-white/40'
                                                }`}
                                            >
                                                <span className="flex h-10 w-12 items-center justify-center rounded-lg border border-white/10 bg-black/40">
                                                    {option.icon}
                                                </span>
                                                <span className="text-sm font-semibold">
                                                    {option.label}
                                                </span>
                                                <span className="text-xs text-white/60">
                                                    {option.description}
                                                </span>
                                            </button>
                                        );
                                    })}
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

                    {!editing && renderGallery()}

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
                        © 2025 Barocco Art.
                    </footer>
                </div>
            </div>
        </>
    );
}
