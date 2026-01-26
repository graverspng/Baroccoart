import SiteHeader from '@/Components/SiteHeader';

export default function GuestLayout({ children }) {
    return (
        <div className="min-h-screen bg-[#050505] text-white">
            <div className="mx-auto flex min-h-screen max-w-6xl flex-col px-6 pb-12">
                <SiteHeader showAuth={false} showBack backHref="/" />

                <main className="flex flex-1 items-center justify-center">
                    {children}
                </main>
            </div>
        </div>
    );
}
