import { Head, Link } from '@inertiajs/react';
import SiteHeader from '@/Components/SiteHeader';

export default function OwnerGuide() {
    return (
        <>
            <Head title="Īpašnieka ceļvedis" />
            <div className="min-h-screen bg-[#050505] text-white">
                <div className="mx-auto flex max-w-6xl flex-col px-6 pb-16 md:pb-24">
                    <SiteHeader />

                    <section className="py-6 text-center md:py-10 slide-pop">
                        <p className="text-sm uppercase tracking-[0.2em] text-white/60 fade-in-up">
                            Tikai īpašniekam
                        </p>
                        <h1 className="mt-2 text-4xl font-semibold tracking-tight md:text-5xl fade-in-up">
                            Īpašnieka ceļvedis
                        </h1>
                        <p className="mx-auto mt-4 max-w-3xl text-white/70 fade-in-up-delayed">
                            Īss atgādinājums par visām vietām, kur var mainīt saturu,
                            attēlus un kontaktus.
                        </p>
                    </section>

                    <section className="grid gap-6 md:grid-cols-2">
                        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur slide-pop">
                            <h2 className="text-xl font-semibold">Sākumlapa</h2>
                            <ul className="mt-3 space-y-2 text-white/75">
                                <li>
                                    Spied <strong>Mainīt izkārtojumu</strong>, lai izvēlētos galvenās galerijas skatu.
                                </li>
                                <li>
                                    Izvēlies režģi/sadalījumu/izceltu/rindas un spied
                                    <strong> Saglabāt</strong>.
                                </li>
                                <li>
                                    <strong>Atcelt</strong> atgriež pēdējo saglabāto izkārtojumu.
                                </li>
                            </ul>
                        </article>

                        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur slide-pop">
                            <h2 className="text-xl font-semibold">Pakalpojumu teksts</h2>
                            <ul className="mt-3 space-y-2 text-white/75">
                                <li>
                                    Atver <strong>Pakalpojumi</strong> un izvēlies konkrētu lapu.
                                </li>
                                <li>
                                    Spied <strong>Rediģēt</strong>, lai mainītu nosaukumus un aprakstus.
                                </li>
                                <li>
                                    Lai pirmā daļa būtu treknrakstā, raksti piemēram
                                    <code className="mx-1 rounded bg-white/10 px-2 py-0.5 text-sm text-white">
                                        Virsraksts - pārējais teksts
                                    </code>
                                    vai ar garo domuzīmi.
                                </li>
                            </ul>
                        </article>

                        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur slide-pop">
                            <h2 className="text-xl font-semibold">Foto pievienošana</h2>
                            <ul className="mt-3 space-y-2 text-white/75">
                                <li>
                                    Galvenajam attēlam vari ielīmēt URL vai spiest <strong>Augšupielādēt</strong>.
                                </li>
                                <li>
                                    Papildu bildes vari pievienot ar URL vai vairākus failus uzreiz.
                                </li>
                                <li>
                                    Dzēst bildi var ar <strong>🗑</strong> ikonu.
                                </li>
                                <li>
                                    Izvēlies <strong>Foto izkārtojumu</strong>: režģis, mozaīka vai izceltā.
                                </li>
                            </ul>
                        </article>

                        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur slide-pop">
                            <h2 className="text-xl font-semibold">Kontakti + profila foto</h2>
                            <ul className="mt-3 space-y-2 text-white/75">
                                <li>
                                    Atver <strong>Kontakti</strong> un spied <strong>Rediģēt</strong>.
                                </li>
                                <li>
                                    Maini vārdu, e-pastu, telefonu, tagu un citus laukus.
                                </li>
                                <li>
                                    Spied <strong>Nomainīt foto</strong>, lai ielādētu jaunu profila bildi.
                                </li>
                                <li>
                                    Beigās spied <strong>Saglabāt</strong>.
                                </li>
                            </ul>
                        </article>

                        <article className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur slide-pop">
                            <h2 className="text-xl font-semibold">Parole (īpašniekam)</h2>
                            <ul className="mt-3 space-y-2 text-white/75">
                                <li>
                                    Pirmajā ielogošanās reizē parādās modālis paroles maiņai.
                                </li>
                                <li>
                                    Pēc saglabāšanas parole vairs nav maināma.
                                </li>
                            </ul>
                        </article>
                    </section>

                    <section className="mt-10 flex flex-wrap gap-3">
                        <Link
                            href={route('services')}
                            className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10"
                        >
                            Atvērt pakalpojumus
                        </Link>
                        <Link
                            href={route('contact')}
                            className="rounded-full border border-white/30 px-4 py-2 text-sm font-semibold transition hover:border-white hover:bg-white/10"
                        >
                            Atvērt kontaktus
                        </Link>
                        <Link
                            href="/"
                            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-white/90"
                        >
                            Doties uz sākumlapu
                        </Link>
                    </section>

                    <footer className="mt-10 text-xs text-white/50">
                        © 2025 Barocco Art.
                    </footer>
                </div>
            </div>
        </>
    );
}
