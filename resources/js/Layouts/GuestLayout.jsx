import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-12">
                <header className="flex items-center justify-between py-6">
                    <Link
                        href="/"
                        className="text-lg tracking-tight hover:text-white"
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
                        <Link
                            href="/"
                            className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                    >
                        Atpakaļ
                        </Link>
                    </nav>
                </header>

                <main className="flex flex-1 items-center justify-center">
                    {children}
                </main>
            </div>
        </div>
    );
}
