import { Head, Link } from '@inertiajs/react';

const gallery = [
    {
        src: 'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
        alt: 'Modern hillside home with panoramic glass',
    },
    {
        src: 'https://images.unsplash.com/photo-1473186578172-c141e6798cf4?auto=format&fit=crop&w=1400&q=80',
        alt: 'Sunlit agricultural hall stacked with hay bales',
    },
    {
        src: 'https://images.unsplash.com/photo-1496307042754-b4aa456c4a2d?auto=format&fit=crop&w=1400&q=80',
        alt: 'Sharp-lined concrete residence at dusk',
    },
    {
        src: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1400&q=80',
        alt: 'Tall glass atrium filled with soft light',
    },
    {
        src: 'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80',
        alt: 'Minimalist staircase inside a gallery space',
    },
    {
        src: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
        alt: 'Large open warehouse prepared for installations',
    },
];

export default function Welcome() {
    return (
        <>
            <Head title="Barocco Art" />
            <div className="min-h-screen bg-[#050505] text-white">
                <div className="mx-auto flex max-w-6xl flex-col px-6 pb-16 md:pb-24">
                    <header className="flex items-center justify-between py-6">
                        <span className="text-lg font-semibold tracking-tight">
                            Barocco Art
                        </span>
                        <nav className="flex items-center gap-4 text-sm text-white/80 md:gap-8">
                            <Link
                                href={route('contact')}
                                className="transition hover:text-white"
                            >
                                Kontakti
                            </Link>
                            <Link
                                href={route('services')}
                                className="transition hover:text-white"
                            >
                                Pakalpojumi
                            </Link>
                            <Link
                                href={route('login')}
                                className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                            >
                                Owner Login
                            </Link>
                        </nav>
                    </header>

                    <section className="py-8 text-center md:py-12">
                        <h1 className="text-4xl font-semibold tracking-tight md:text-5xl fade-in-up">
                            Barocco Art
                        </h1>
                        <p className="mx-auto mt-4 max-w-3xl text-base text-white/70 md:text-lg fade-in-up-delayed">
                            Mūsdienīga arhitektūra, tīras līnijas un telpas, kas
                            atdzīvojas gaismā. Barocco Art kolekcijā
                            apvienojam privātmājas, industriālos risinājumus un
                            radošus interjerus, lai radītu vietas, kas iedvesmo
                            ikvienu apmeklētāju.
                        </p>
                    </section>

                    <section className="grid grid-cols-1 gap-8 md:grid-cols-2">
                        {gallery.map((item, index) => (
                            <figure
                                key={item.alt}
                                className="group overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl transition duration-300 hover:-translate-y-1 hover:border-white/30 fade-in-up"
                                style={{ animationDelay: `${index * 0.08}s` }}
                            >
                                <img
                                    src={item.src}
                                    alt={item.alt}
                                    className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
                                    loading="lazy"
                                />
                                <figcaption className="sr-only">
                                    {item.alt}
                                </figcaption>
                            </figure>
                        ))}
                    </section>

                    <section
                        id="services"
                        className="mt-14 grid gap-8 rounded-3xl border border-white/10 bg-white/5 p-8 md:grid-cols-2"
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
                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <p className="text-lg font-semibold">
                                    Dzīvojamās mājas
                                </p>
                                <p className="mt-2 text-sm text-white/70">
                                    Individuāli risinājumi ar ērtām plānojuma
                                    līnijām un plašu stiklojumu.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <p className="text-lg font-semibold">
                                    Industriālie objekti
                                </p>
                                <p className="mt-2 text-sm text-white/70">
                                    Noliktavas, ražotnes un angāri ar
                                    optimizētu dienasgaismu un loģistiku.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <p className="text-lg font-semibold">
                                    Interjera dizains
                                </p>
                                <p className="mt-2 text-sm text-white/70">
                                    Minimālisma valoda, kas izceļ materiālu
                                    faktūru un gaismu.
                                </p>
                            </div>
                            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
                                <p className="text-lg font-semibold">
                                    Konsultācijas
                                </p>
                                <p className="mt-2 text-sm text-white/70">
                                    Projekta stratēģija, budžeta un materiālu
                                    izvēles sesijas.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section
                        id="contact"
                        className="mt-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 md:flex-row md:items-center md:justify-between"
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

                    <section className="mt-8 flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <p className="text-sm font-semibold">
                                Īpašnieka zona
                            </p>
                            <p className="text-sm text-white/70">
                                Pieslēdzies, lai atjaunotu saturu vai pievienotu
                                jaunus projektus. Pārējie apmeklētāji lapu
                                skatās brīvi.
                            </p>
                        </div>
                        <Link
                            href={route('login')}
                            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
                        >
                            Owner Login
                        </Link>
                    </section>

                    <footer className="mt-10 text-xs text-white/50">
                        © 2025 Barocco Art. Atvērta apskate visiem
                        apmeklētājiem.
                    </footer>
                </div>
            </div>
        </>
    );
}
