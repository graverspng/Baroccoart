import { useForm, usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

export default function OwnerPasswordModal() {
    const { auth, ownerPassword } = usePage().props;
    const shouldShow =
        auth?.user?.is_owner && ownerPassword && ownerPassword.needsSet;
    const [open, setOpen] = useState(shouldShow);

    useEffect(() => {
        setOpen(shouldShow);
    }, [shouldShow]);

    const { data, setData, put, processing, errors, reset, recentlySuccessful } =
        useForm({
            current_password: '',
            password: '',
            password_confirmation: '',
        });

    const submit = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                setOpen(false);
            },
        });
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
            <div className="w-full max-w-lg rounded-3xl border border-white/15 bg-[#0c0c0c] p-8 text-white shadow-2xl">
                <div className="space-y-2">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/60">
                        Īpašnieka konts
                    </p>
                    <h2 className="text-2xl font-semibold">
                        Iestatiet jaunu paroli (vienreiz)
                    </h2>
                    <p className="text-sm text-white/70">
                        Drošības nolūkos īpašnieks var nomainīt paroli tikai
                        vienu reizi. Lūdzu, ievadiet pašreizējo un jauno paroli
                        tagad.
                    </p>
                </div>

                <form onSubmit={submit} className="mt-6 space-y-4">
                    <div className="space-y-1">
                        <label className="text-sm font-medium">
                            Pašreizējā parole
                        </label>
                        <input
                            type="password"
                            className="w-full rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                            value={data.current_password}
                            onChange={(e) =>
                                setData('current_password', e.target.value)
                            }
                            autoComplete="current-password"
                            required
                        />
                        {errors.current_password && (
                            <p className="text-sm text-red-300">
                                {errors.current_password}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">
                            Jaunā parole
                        </label>
                        <input
                            type="password"
                            className="w-full rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            autoComplete="new-password"
                            required
                        />
                        {errors.password && (
                            <p className="text-sm text-red-300">
                                {errors.password}
                            </p>
                        )}
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-medium">
                            Apstipriniet jauno paroli
                        </label>
                        <input
                            type="password"
                            className="w-full rounded-xl border border-white/20 bg-black/40 px-3 py-2 text-white placeholder:text-white/40 focus:border-white focus:ring-2 focus:ring-white/30"
                            value={data.password_confirmation}
                            onChange={(e) =>
                                setData('password_confirmation', e.target.value)
                            }
                            autoComplete="new-password"
                            required
                        />
                        {errors.password_confirmation && (
                            <p className="text-sm text-red-300">
                                {errors.password_confirmation}
                            </p>
                        )}
                    </div>

                    {errors.password && (
                        <p className="text-sm text-red-300">{errors.password}</p>
                    )}

                    <div className="flex items-center justify-between">
                        <div className="text-sm text-white/60">
                            Pēc saglabāšanas parole vairs nebūs maināma.
                        </div>
                        <button
                            type="submit"
                            disabled={processing}
                            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-white/90 disabled:opacity-60"
                        >
                            Saglabāt
                        </button>
                    </div>

                    {recentlySuccessful && (
                        <p className="text-sm text-green-300">
                            Parole atjaunota.
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
}
