import { ADLaM_Display } from 'next/font/google'

const adlam = ADLaM_Display({
    subsets: ['latin'],
    weight: '400'
})
export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen flex flex-col">

            <main className="flex-1 flex justify-center">
                {children}
            </main>
        </div>
    );
}
