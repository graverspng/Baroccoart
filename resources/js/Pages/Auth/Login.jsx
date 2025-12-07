import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Owner Login" />

            <div className="w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur">
                <div className="mb-6 space-y-2">
                    <p className="text-sm uppercase tracking-[0.2em] text-white/60">
                        Īpašnieka zona
                    </p>
                    <h1 className="text-3xl font-semibold">Owner Login</h1>
                    <p className="text-sm text-white/70">
                        Pieslēdzies, lai atjaunotu saturu vai pievienotu jaunus
                        projektus. Apmeklētāji lapu skatās brīvi.
                    </p>
                    {status && (
                        <div className="rounded-xl border border-green-400/30 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-100">
                            {status}
                        </div>
                    )}
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div className="space-y-2">
                        <label
                            htmlFor="email"
                            className="text-sm font-semibold text-white"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            value={data.email}
                            autoComplete="username"
                            onChange={(e) => setData('email', e.target.value)}
                            className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/50 focus:border-white focus:ring-2 focus:ring-white/30"
                        />
                        {errors.email && (
                            <p className="text-sm text-red-300">
                                {errors.email}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold text-white"
                        >
                            Parole
                        </label>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            value={data.password}
                            autoComplete="current-password"
                            onChange={(e) => setData('password', e.target.value)}
                            className="w-full rounded-2xl border border-white/15 bg-black/30 px-4 py-3 text-white placeholder:text-white/50 focus:border-white focus:ring-2 focus:ring-white/30"
                        />
                        {errors.password && (
                            <p className="text-sm text-red-300">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="flex items-center justify-between text-sm text-white/70">
                        <label className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                name="remember"
                                checked={data.remember}
                                onChange={(e) =>
                                    setData('remember', e.target.checked)
                                }
                                className="h-4 w-4 rounded border-white/40 bg-black/30 text-white focus:ring-white"
                            />
                            <span>Atcerēties mani</span>
                        </label>
                        {canResetPassword && (
                            <Link
                                href={route('password.request')}
                                className="font-semibold text-white hover:text-white/80"
                            >
                                Aizmirsi paroli?
                            </Link>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing}
                        className="w-full rounded-full bg-white px-5 py-3 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60"
                    >
                        Ienākt
                    </button>
                </form>
            </div>
        </GuestLayout>
    );
}
