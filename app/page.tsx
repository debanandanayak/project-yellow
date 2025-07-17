import DotGrid from '@/components/landing-page/dot-grid'
import Silk from '@/components/landing-page/silk'
import { Button } from '@/components/ui/button'
import { GotoApp } from '@/components/users/goto-app'
import { SignoutButton } from '@/components/users/logout'
import Image from 'next/image'
import { Suspense } from 'react'

export default function Home() {
	return (
		<div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
			<header className='h-15 flex flex-row border-b justify-between items-center px-40 p-2 m-auto'>
				<div>Some</div>
				<div className='flex flex-row space-x-0.5'>
					<SignoutButton />
					<GotoApp />
				</div>
			</header>
			{/* <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
				<div className="text-sm/6 text-center sm:text-left font-[family-name:var(--font-work-sans)]">
					<h1 className="mb-2 tracking-[-.01em] text-4xl w-lg">
						Email Api that just work - no headaches,
						<div className="rounded font-[family-name:var(--font-work-sans)] font-semibold">
							No limits.
						</div>
					</h1>
					<p className="tracking-[-.01em]">
						The best way to reach humans instead of spam folders. Deliver transactional and marketing emails at scale.
					</p>
				</div>

				<div className="flex gap-4 items-center flex-col sm:flex-row">
					<a
						className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:w-auto"
						href="/login"
						rel="noopener noreferrer"
					>
						<Image
							className="dark:invert"
							src="/vercel.svg"
							alt="Vercel logomark"
							width={20}
							height={20}
						/>
						Login
					</a>
					<a
						className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 w-full sm:w-auto md:w-[158px]"
						href="/signup"
						rel="noopener noreferrer"
					>
						Sign up
					</a>
				</div>
			</main> */}
			<footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">


				@project-yellow
			</footer>
		</div>
	)
}