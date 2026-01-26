import { Head, Link } from '@inertiajs/react';
import SiteHeader from '@/Components/SiteHeader';

export default function Services({ services = [] }) {
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
                    <SiteHeader />

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
