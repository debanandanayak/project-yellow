import type { Metadata } from "next"
import { DM_Sans, Epilogue, Geist, Geist_Mono, Work_Sans } from "next/font/google"
import "./globals.css"
import { Toaster } from '@/components/ui/sonner'

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
})

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
})
const workSans = Work_Sans({
	variable: "--font-work-sans",
	subsets: ["latin"],
})
export const metadata: Metadata = {
	title: "Better email",
	description: "Email for developers",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} ${workSans.variable} antialiased dark`}
			>
				{children}
				<Toaster closeButton={true} richColors={true} />
			</body>
		</html>
	)
}
