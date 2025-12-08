import { Head, Link, usePage } from '@inertiajs/react';

export default function Services({ services = [] }) {
    const { auth } = usePage().props;

    const renderLine = (line) => {
        if (!line) return '';
        const parts = line.split(/[-–]/);
        if (parts.length > 1) {
            const [lead, ...rest] = parts;
            return (
                <>
                    <strong className="font-semibold">{lead.trim()}</strong>
                    {` –${rest.join('–')}`}
                </>
            );
        }
        return line;
    };

    return (
        <>
            <Head title="Pakalpojumi" />
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
                            <Link href={`${route('services')}#celtnieciba`} className="transition hover:text-white">
                                Celtniecība
                            </Link>
                            <Link href={`${route('services')}#projektesana`} className="transition hover:text-white">
                                Projektēšana
                            </Link>
                            <Link href={`${route('services')}#interjera-dizains`} className="transition hover:text-white">
                                Interjera dizains
                            </Link>
                            <Link href={`${route('services')}#mebeles`} className="transition hover:text-white">
                                Mēbeles
                            </Link>
                            <Link href={route('contact')} className="transition hover:text-white">
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

                    <section className="py-6 text-center md:py-10">
                        <p className="text-sm uppercase tracking-[0.2em] text-white/60 fade-in-up">
                            Pilns projektēšanas pakalpojumu serviss
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl fade-in-up">
                            Pakalpojumi
                        </h1>
                        <p className="mx-auto mt-4 max-w-3xl text-white/70 fade-in-up-delayed">
                            Arhitektūras daļa, ģenplāns, būvkonstrukcijas, inženiertehniskie tīkli un autoruzraudzība vienotā komandā.
                        </p>
                    </section>

                    <section className="space-y-14">
                        {services.map((item, index) => (
                            <div
                                key={item.slug}
                                id={item.slug}
                                className={`grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur md:grid-cols-2 ${
                                    index % 2 ? 'md:grid-flow-col-dense' : ''
                                } fade-in-up`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex flex-col justify-center space-y-3">
                                    <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                                        {item.label}
                                    </p>
                                    <h2 className="text-2xl font-semibold">{item.heading}</h2>
                                    <p className="text-white/80">
                                        {renderLine((item.body || [])[0] || '')}
                                    </p>
                                    <Link
                                        href={route('service.detail', item.slug)}
                                        className="text-sm font-semibold text-white underline decoration-white/40 underline-offset-4 hover:decoration-white"
                                    >
                                        Lasīt vairāk
                                    </Link>
                                </div>
                                <div className="overflow-hidden rounded-2xl border border-white/10">
                                    <img
                                        src={item.hero_image}
                                        alt={item.heading}
                                        className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </section>

                    <footer className="mt-10 text-xs text-white/50">
                        © 2025 Barocco Art.
                    </footer>
                </div>
            </div>
        </>
    );
}
