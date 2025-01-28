<script lang="ts">
	import BlockQuote from '../Blog/PortableText/BlockQuote.svelte';
	import AnimatedElement from './AnimatedElement.svelte';

	const src = '/hk-about.jpg';
	const alt = 'A profile of Harry Kelleher';
</script>

<section class="flex flex-col items-center justify-center px-1">
	<div class="mx-6 mt-8 w-16 h-0.5 bg-gray-300 md:mx-auto md:relative md:-left-24" />
	<h1 class="font-customHeading text-center font-medium text-4xl py-12">
		<AnimatedElement text={"Learn like you're going to live forever."} />
	</h1>
	<div class="mx-6 mt-1 w-16 h-0.5 bg-gray-300 md:mx-auto md:relative md:-left-24" />
	<div class="md:container grid md:grid-cols-3 gap-8 pt-5 md:pt-10">
		<div class="md:col-span-2 items-start">
			<h2
				class="inline-block bg-yellow-400 dark:text-gray-900 py-2 px-4 md:-ml-4 mb-2 rounded-sm text-lg font-bold font-customHeading uppercase"
			>
				About Me
			</h2>

			<div class="py-3">
				<BlockQuote
					>"I believe that life is about learning. Through learning, we can change the world. So
					it's my mission to learn and grow every day."</BlockQuote
				>
			</div>
			<p class="ml-px py-1">Hi, I'm Harry. I'm a Data Developer from the U.K.</p>
			<p class="ml-px py-1">
				I have a background in <b>Tableau,</b>
				<b>Python</b>
				and <b>SQL</b>. Lately, I've been exploring <b>Typescript</b> and <b>Svelte.</b>
			</p>
			<p class="ml-px py-1">
				My greatest skill is that I am highly versatile. I am in my element within and in the
				intersections between technical and business teams. As a consequence, I deliver projects
				end-to-end: from requirements elicitation and data engineering; through to analysis and
				visualisation.
			</p>

			<p class="ml-px py-1">
				I lead development units to create products which empower users with critical insights to
				improve outcomes. In data, it's easy to get lost in the technical 'How?'. I focus
				on the strategic 'Why?' to bring people with me to
				discover the story behind the data.
			</p>
			<p class="ml-px py-1">
				In my free time (aside from coding or blogging), I am a cricket nut, a piano lover and
				suffer a mild chess addiction.
			</p>
		</div>
		<div class="md:order-first md:col-span-1 items-center justify-center flex">
			<img class="rounded-xl max-h-[500px] md:h-80" {src} {alt} />
		</div>
	</div>
	<div class="mx-6 mt-8 w-16 h-0.5 bg-gray-300 md:mx-auto md:relative md:-left-24" />
</section>
