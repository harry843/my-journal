<script lang="ts">
	import Email from '../../CV/Header/Contact/icons/Email.svelte';

	export let title: string;
	export let slug: string;
</script>
{#if slug !== undefined}
<section class="mx-2 sm:mx-5 md:mx-[15%] lg:mx-[18%] xl:mx-[22%] py-2 md:py-4">
	<div class="mx-6 mt-8 w-[75%] h-0.5 bg-gray-300 md:mx-auto md:relative" />
	<h2 class="font-customHeading text-2xl font-medium text-left py-3 pt-10">Spread the word!</h2>
	<div
		class="inline items-center justify-between xs:flex xs:flex-row xs:justify-center sm:gap-x-2 md:gap-x-3 lg:justify-start"
	>
		<a
			href="https://www.linkedin.com/shareArticle?url=https://harrykelleher.com/blog/{slug}&title={title.replace(
				/ /g,
				'%20'
			)}"
			rel="noreferrer nofollow"
		>
			<div
				class="text-white bg-[#0077b5] hover:bg-[#0077b5]/90 font-medium rounded-lg text-sm px-3 sm:px-5 py-2.5 text-center inline-flex justify-center items-center me-2 mb-2 gap-x-2.5"
			>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					class="h-4 w-4"
					fill="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"
					/>
				</svg>
				LinkedIn
			</div>
		</a>
		<a
			href="https://twitter.com/intent/tweet?url=https://harrykelleher.com/blog/{slug}&text={title.replace(
				/ /g,
				'%20'
			)}&via="
			target="_blank"
			rel="nofollow noopener"
		>
			<div
				class="text-white bg-[#1da1f2] hover:bg-[#1da1f2]/90 focus:ring-4 focus:outline-none focus:ring-[#1da1f2]/50 font-medium rounded-lg text-sm px-3 sm:px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#1da1f2]/55 me-2 mb-2"
			>
				<svg
					class="w-4 h-4 me-2"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 20 17"
				>
					<path
						fill-rule="evenodd"
						d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z"
						clip-rule="evenodd"
					/>
				</svg>
				Twitter
			</div>
		</a>
		<a
			href="https://www.facebook.com/sharer/sharer.php?u=https://harrykelleher.com/blog/{slug}"
			target="_blank"
			rel="nofollow noopener"
		>
			<div
				class="text-white bg-[#3b5998] hover:bg-[#3b5998]/90 focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-3 sm:px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
			>
				<svg
					class="w-4 h-4 me-2"
					aria-hidden="true"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					viewBox="0 0 8 19"
				>
					<path
						fill-rule="evenodd"
						d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z"
						clip-rule="evenodd"
					/>
				</svg>
				Facebook
			</div>
		</a>
		<a
			href="mailto:%7Bemail_address%7D?subject={title.replace(
				/ /g,
				'%20'
			)}&body=https://harrykelleher.com/blog/{slug}%20"
			target="_blank"
			rel="nofollow noopener"
		>
			<div
				class="text-white bg-[#db4437] hover:bg-[#db4437]/90 focus:ring-4 focus:outline-none focus:ring-[#24292F]/50 font-medium rounded-lg text-sm px-3 sm:px-5 py-2.5 text-center inline-flex justify-center items-center dark:focus:ring-gray-500 dark:hover:bg-[#050708]/30 me-2 mb-2 gap-x-2"
			>
				<Email />
				Email
			</div>
		</a>
	</div>
</section>
{/if}