import { Head, Link } from '@inertiajs/react';

const services = [
    {
        title: 'PROJEKTĒŠANA',
        body: 'Stūdija izstrādā daudzdzīvokļu ēku projektus, sabiedrisku un biroju ēku būvprojektus. Realizēti arī viesnīcu un skolu projekti.',
        image:
            'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1400&q=80',
    },
    {
        title: 'BŪVNORMATĪVI UN TERITORIJAS PLĀNOŠANAS NOTEIKUMI',
        body: 'Kompetence valsts un pašvaldību būvniecību reglamentējošā likumdošanā. Būvatļaujas izsniegšanas process, būvniecība un ēkas nodošana ekspluatācijā. Sertificēta būvprojektu ekspertīze.',
        image:
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
    },
    {
        title: 'PROJEKTU VADĪBA',
        body: 'Pieredze sarežģītu būvniecības projektu vadībā, no koncepcijas līdz būves nodošanai ekspluatācijā.',
        image:
            'https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=1400&q=80',
    },
    {
        title: 'ĒKAS INFORMĀCIJAS MODELĒŠANA',
        body: 'BIM 3D modelēšana, kas nodrošina sadarbību starp visām ieinteresētajām pusēm, uzlabo efektivitāti un samazina kļūdas būvniecības laikā.',
        image:
            'https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1400&q=80',
    },
];

export default function Services() {
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

                    <section className="py-6 text-center md:py-10">
                        <p className="text-sm uppercase tracking-[0.2em] text-white/60 fade-in-up">
                            Pilns projektēšanas pakalpojumu serviss
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl fade-in-up">
                            Pakalpojumi
                        </h1>
                        <p className="mx-auto mt-4 max-w-3xl text-white/70 fade-in-up-delayed">
                            No idejas līdz nodošanai ekspluatācijā – pārraugām katru soli ar BIM 3D modelēšanu, ekspertīzi un projektu vadību.
                        </p>
                    </section>

                    <section className="space-y-20">
                        {services.map((item, index) => (
                            <div
                                key={item.title}
                                className={`grid gap-6 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur md:grid-cols-2 ${
                                    index % 2 ? 'md:grid-flow-col-dense' : ''
                                } fade-in-up`}
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex flex-col justify-center space-y-3">
                                    <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                                        {item.title}
                                    </p>
                                    <p className="text-white/80">{item.body}</p>
                                </div>
                                <div className="overflow-hidden rounded-2xl border border-white/10">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="aspect-[4/3] w-full object-cover transition duration-500 hover:scale-105"
                                        loading="lazy"
                                    />
                                </div>
                            </div>
                        ))}
                    </section>

                    <footer className="mt-10 text-xs text-white/50">
                        © 2025 Barocco Art. Atvērta apskate visiem apmeklētājiem.
                    </footer>
                </div>
            </div>
        </>
    );
}
