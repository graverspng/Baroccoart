import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function SiteHeader({
    className = '',
    showAuth = true,
    showBack = false,
    backHref = '/',
}) {
    const { auth } = usePage().props;
    const [menuOpen, setMenuOpen] = useState(false);
    const isOwner = auth?.user?.is_owner;
    const navLinks = [
        { href: `${route('services')}#celtnieciba`, label: 'Celtniecība' },
        { href: `${route('services')}#projektesana`, label: 'Projektēšana' },
        { href: `${route('services')}#interjera-dizains`, label: 'Interjera dizains' },
        { href: `${route('services')}#mebeles`, label: 'Mēbeles' },
        { href: route('contact'), label: 'Kontakti' },
    ];
    const ownerLinks = isOwner
        ? [{ href: route('owner.guide'), label: 'Īpašnieka ceļvedis' }]
        : [];

    const closeMenu = () => setMenuOpen(false);

    const renderNavLinks = (linkClassName) =>
        [...navLinks, ...ownerLinks].map((item) => (
            <Link
                key={item.label}
                href={item.href}
                onClick={closeMenu}
                className={linkClassName}
            >
                {item.label}
            </Link>
        ));

    return (
        <header className={`flex flex-col gap-4 py-6 ${className}`}>
            <div className="flex items-center justify-between">
                <Link
                    href="/"
                    onClick={closeMenu}
                    className="text-lg font-semibold tracking-tight hover:text-white"
                >
                    Barocco Art
                </Link>
                <nav className="hidden items-center gap-4 text-sm text-white/80 md:flex md:gap-8">
                    {renderNavLinks('transition hover:text-white')}
                    {showAuth && !auth?.user && (
                        <Link
                            href={route('login')}
                            className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                        >
                            Owner Login
                        </Link>
                    )}
                    {showAuth && auth?.user && (
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                        >
                            Izrakstīties
                        </Link>
                    )}
                    {showBack && (
                        <Link
                            href={backHref}
                            className="rounded-full border border-white/30 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                        >
                            Atpakaļ
                        </Link>
                    )}
                </nav>
                <button
                    type="button"
                    onClick={() => setMenuOpen((open) => !open)}
                    aria-expanded={menuOpen}
                    aria-controls="site-nav"
                    className="inline-flex items-center justify-center rounded-full border border-white/30 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10 md:hidden"
                >
                    Menu
                </button>
            </div>
            <div
                id="site-nav"
                className={`${menuOpen ? 'block' : 'hidden'} md:hidden`}
            >
                <nav className="flex flex-col gap-3 rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/80">
                    {renderNavLinks('transition hover:text-white')}
                    {showAuth && !auth?.user && (
                        <Link
                            href={route('login')}
                            onClick={closeMenu}
                            className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                        >
                            Owner Login
                        </Link>
                    )}
                    {showAuth && auth?.user && (
                        <Link
                            href={route('logout')}
                            method="post"
                            as="button"
                            onClick={closeMenu}
                            className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                        >
                            Izrakstīties
                        </Link>
                    )}
                    {showBack && (
                        <Link
                            href={backHref}
                            onClick={closeMenu}
                            className="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] transition hover:border-white hover:bg-white/10"
                        >
                            Atpakaļ
                        </Link>
                    )}
                </nav>
            </div>
        </header>
    );
}
