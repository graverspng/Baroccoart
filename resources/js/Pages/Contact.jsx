import { Head, Link, usePage } from '@inertiajs/react';

const sections = [
    {
        title: 'Interjers, dizains',
        lead: 'Mareta Gitendorfa Lūse',
        email: 'mareta@baroccoart.lv',
        phone: '+371 2 921 9791',
        tag: 'gsm',
    },
    {
        title: 'Arhitektūra, projektēšana',
        lead: 'Armands Lūsis',
        email: 'armands@baroccoart.lv',
        phone: '+371 2 949 4338',
        tag: 'gsm',
    },
    {
        title: 'Birojs',
        lead: 'Brīvības iela 137 Rīga, Latvija',
        email: 'barocco@baroccoart.lv',
        phone: '+371 26262626',
        tag: 'WhatsApp',
    },
];

export default function Contact() {
    return (
        <>
            <Head title="Kontakti" />
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
                            {!usePage().props.auth?.user && (
                                <Link
                                    href={route('login')}
                                    className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                                >
                                    Owner Login
                                </Link>
                            )}
                            {usePage().props.auth?.user && (
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

                    <section className="py-6 text-center md:py-10">
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
                    </section>

                    <section className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {sections.map((item, index) => (
                            <div
                                key={item.title}
                                className="flex h-full flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                                    {item.title}
                                </p>
                                <h2 className="text-xl font-semibold">{item.lead}</h2>
                                <div className="space-y-2 text-white/80">
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.16em] text-white/50">
                                            Email
                                        </p>
                                        <a
                                            href={`mailto:${item.email}`}
                                            className="text-white hover:text-white/80"
                                        >
                                            {item.email}
                                        </a>
                                    </div>
                                    <div>
                                        <p className="text-xs uppercase tracking-[0.16em] text-white/50">
                                            Telefons
                                        </p>
                                        <a
                                            href={`tel:${item.phone.replace(/\s+/g, '')}`}
                                            className="text-white hover:text-white/80"
                                        >
                                            {item.phone} {item.tag}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="mt-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-8 md:flex-row md:items-center md:justify-between">
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

                    <footer className="mt-10 text-xs text-white/50">
                        © 2025 Barocco Art. Atvērta apskate visiem apmeklētājiem.
                    </footer>
                </div>
            </div>
        </>
    );
}
