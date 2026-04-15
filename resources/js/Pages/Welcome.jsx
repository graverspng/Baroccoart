import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';
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
        value: 'split',
        label: 'Sadalījums',
        description: 'Plašs + šaurs',
        icon: (
            <div className="flex h-5 w-12 flex-col gap-0.5">
                <span className="flex gap-0.5">
                    <span className="h-2 w-7 rounded-sm bg-white/70" />
                    <span className="h-2 flex-1 rounded-sm bg-white/70" />
                </span>
                <span className="flex gap-0.5">
                    <span className="h-2 flex-1 rounded-sm bg-white/70" />
                    <span className="h-2 w-7 rounded-sm bg-white/70" />
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
    {
        value: 'stacked',
        label: 'Rindas',
        description: 'Pilna platuma',
        icon: (
            <div className="flex h-5 w-12 flex-col gap-0.5">
                <span className="h-1 w-full rounded-sm bg-white/70" />
                <span className="h-1 w-full rounded-sm bg-white/70" />
                <span className="h-1 w-10 rounded-sm bg-white/70" />
            </div>
        ),
    },
];

const normalizeLayout = (value) => {
    if (value === 'masonry') return 'split';
    if (['grid', 'split', 'featured', 'stacked'].includes(value)) return value;
    return 'grid';
};

export default function Welcome({ auth, services = [], homeLayout }) {
    const isOwner = auth?.user?.is_owner;
    const [editingLayout, setEditingLayout] = useState(false);
    const {
        data,
        setData,
        patch,
        processing,
        recentlySuccessful,
    } = useForm({
        home_layout: normalizeLayout(homeLayout || 'grid'),
    });
    const savedLayout = normalizeLayout(homeLayout || 'grid');
    const activeLayout = normalizeLayout(data.home_layout || savedLayout);
    const layoutSectionClass = {
        grid: 'grid grid-cols-1 gap-8 md:grid-cols-2',
        split: 'grid grid-cols-1 gap-6 md:grid-cols-12 md:auto-rows-[240px]',
        featured: 'grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3',
        stacked: 'grid grid-cols-1 gap-6',
    }[activeLayout] || 'grid grid-cols-1 gap-8 md:grid-cols-2';
    const cardSpanClass = (index) => {
        if (activeLayout === 'split') {
            const spans = ['md:col-span-7', 'md:col-span-5', 'md:col-span-5', 'md:col-span-7'];
            return spans[index % spans.length];
        }
        if (activeLayout === 'featured' && index === 0) {
            return 'md:col-span-2 lg:col-span-3';
        }
        return '';
    };
    const figureClass = `relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-white/30 fade-in-up ${
        activeLayout === 'split' ? 'md:h-full' : ''
    }`;
    const imageClass = (index) => {
        if (activeLayout === 'split') {
            return 'aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105 md:h-full md:aspect-auto';
        }
        if (activeLayout === 'stacked') {
            return 'aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105';
        }
        if (activeLayout === 'featured' && index === 0) {
            return 'aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105';
        }
        return 'aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105';
    };

    const submitLayout = () => {
        patch(route('home.layout.update'), {
            preserveScroll: true,
            onSuccess: () => {
                setEditingLayout(false);
            },
        });
    };

    const closeLayoutEditor = () => {
        setData('home_layout', savedLayout);
        setEditingLayout(false);
    };
    return (
        <>
            <Head title="Barocco Art" />
            <div className="min-h-screen bg-[#050505] text-white">
                <div className="mx-auto flex max-w-6xl flex-col px-6 pb-16 md:pb-24">
                    <SiteHeader className="fade-in-up" />

                    <section className="py-8 text-center md:py-12 slide-pop">
                        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl fade-in-up">
                            Barocco Art
                        </h1>
                        <p className="mx-auto mt-4 max-w-3xl text-lg text-white/70 md:text-xl fade-in-up-delayed">
                            Mūsdienīga arhitektūra, tīras līnijas un telpas, kas
                            atdzīvojas gaismā. Barocco Art kolekcijā
                            apvienojam privātmājas, industriālos risinājumus un
                            radošus interjerus, lai radītu vietas, kas iedvesmo
                            ikvienu apmeklētāju.
                        </p>
                        {isOwner && (
                            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        editingLayout ? closeLayoutEditor() : setEditingLayout(true)
                                    }
                                    className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                                >
                                    {editingLayout ? 'Aizvērt' : 'Mainīt izkārtojumu'}
                                </button>
                                {recentlySuccessful && (
                                    <span className="text-xs text-green-300">Saglabāts</span>
                                )}
                            </div>
                        )}
                    </section>

                    {isOwner && editingLayout && (
                        <section className="mb-10 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl">
                            <div className="space-y-2 text-left">
                                <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                                    Galvenās lapas izkārtojums
                                </p>
                                <div className="grid gap-3 sm:grid-cols-3">
                                    {layoutOptions.map((option) => {
                                        const isActive = data.home_layout === option.value;
                                        return (
                                            <button
                                                key={option.value}
                                                type="button"
                                                onClick={() =>
                                                    setData('home_layout', option.value)
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
                            <div className="mt-5 flex gap-3">
                                <button
                                    type="button"
                                    onClick={submitLayout}
                                    disabled={processing}
                                    className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60"
                                >
                                    Saglabāt
                                </button>
                                <button
                                    type="button"
                                    onClick={closeLayoutEditor}
                                    className="rounded-full border border-white/30 px-5 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10"
                                >
                                    Atcelt
                                </button>
                            </div>
                        </section>
                    )}

                    <section className={layoutSectionClass}>
                        {(services || []).map((item, index) => (
                            <Link
                                key={item.slug}
                                href={route('service.detail', item.slug)}
                                className={`group block slide-pop ${cardSpanClass(index)}`}
                            >
                                <figure className={figureClass}>
                                    <img
                                        src={item.hero_image}
                                        alt={item.label}
                                        className={imageClass(index)}
                                        loading="lazy"
                                    />
                                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />
                                    <figcaption className="pointer-events-none absolute inset-0 flex items-end p-6 opacity-0 transition duration-300 group-hover:opacity-100">
                                        <div className="space-y-1">
                                            <p className="text-xs uppercase tracking-[0.3em] text-white/80">
                                                {item.label}
                                            </p>
                                            <p className="text-lg font-semibold text-white">
                                                {item.blurb}
                                            </p>
                                        </div>
                                    </figcaption>
                                </figure>
                            </Link>
                        ))}
                    </section>

                    <section
                        id="services"
                        className="mt-14 grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-2 slide-pop"
                    >
                        <div className="space-y-3">
                            <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                                Pakalpojumi
                            </p>
                            <h2 className="text-2xl font-semibold">
                                Telpas, kas strādā jūsu idejai
                            </h2>
                            <p className="text-white/70">
                                No koncepta skicēm līdz realizētām fasādēm un
                                interjeriem. Izceļam dabisko gaismu,
                                ilgtspējīgus materiālus un precīzas detaļas,
                                lai katrs projekts būtu funkcionāls un
                                vizuāli pārliecinošs.
                            </p>
                        </div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <Link
                                href={route('services')}
                                className="group block rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                            >
                                <p className="text-xl font-semibold">
                                    Dzīvojamās mājas
                                </p>
                                <p className="mt-2 text-base text-white/70">
                                    Individuāli risinājumi ar ērtām plānojuma
                                    līnijām un plašu stiklojumu.
                                </p>
                            </Link>
                            <Link
                                href={route('services')}
                                className="group block rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                            >
                                <p className="text-xl font-semibold">
                                    Industriālie objekti
                                </p>
                                <p className="mt-2 text-base text-white/70">
                                    Noliktavas, ražotnes un angāri ar
                                    optimizētu dienasgaismu un loģistiku.
                                </p>
                            </Link>
                            <Link
                                href={route('services')}
                                className="group block rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                            >
                                <p className="text-xl font-semibold">
                                    Interjera dizains
                                </p>
                                <p className="mt-2 text-base text-white/70">
                                    Minimālisma valoda, kas izceļ materiālu
                                    faktūru un gaismu.
                                </p>
                            </Link>
                            <Link
                                href={route('services')}
                                className="group block rounded-2xl border border-white/10 bg-black/30 p-5 transition hover:-translate-y-1 hover:border-white/30 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                            >
                                <p className="text-xl font-semibold">
                                    Konsultācijas
                                </p>
                                <p className="mt-2 text-base text-white/70">
                                    Projekta stratēģija, budžeta un materiālu
                                    izvēles sesijas.
                                </p>
                            </Link>
                        </div>
                    </section>

                    <section
                        id="contact"
                        className="mt-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 md:flex-row md:items-center md:justify-between slide-pop"
                    >
                        <div className="space-y-2">
                            <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                                Kontakti
                            </p>
                            <h3 className="text-2xl font-semibold">
                                Sazinies ar mums
                            </h3>
                            <p className="text-white/70">
                                Pastāsti par savu projektu vai ieplāno klātienes
                                tikšanos Barocco Art studijā.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <a
                                href="mailto:hello@baroccoart.com"
                                className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10"
                            >
                                E-pasts
                            </a>
                            <a
                                href="tel:+37100000000"
                                className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10"
                            >
                                Zvanīt
                            </a>
                        </div>
                    </section>

                    <footer className="mt-10 text-xs text-white/50 fade-in-up" style={{ animationDelay: '0.35s' }}>
                        <a href="/login">© 2025 Barocco Art.</a>
                    </footer>
                </div>
            </div>
        </>
    );
}
