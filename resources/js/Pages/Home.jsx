import React from 'react';

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-100 text-gray-900">
            <div className="max-w-4xl mx-auto py-16 px-6 text-center">
                <h1 className="text-4xl font-bold mb-6">Welcome to Baroccoart</h1>
                <p className="text-lg leading-relaxed mb-8">
                    Explore our collection and updates without needing an account. This simple landing page is here
                    so everyone can see what's happening right away.
                </p>
                <div className="grid gap-6 sm:grid-cols-2">
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Latest News</h2>
                        <p className="text-sm text-gray-700">
                            Stay tuned for upcoming exhibitions, featured artists, and community highlights.
                        </p>
                    </div>
                    <div className="p-6 bg-white rounded-lg shadow">
                        <h2 className="text-xl font-semibold mb-2">Get in Touch</h2>
                        <p className="text-sm text-gray-700">
                            Have questions or ideas? Reach out anytime—we would love to hear from you.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
