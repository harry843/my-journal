<script>
	export let height = 1;
	export let progress = 50;

</script>

<div class="w-full bg-white rounded-full h-{height} dark:bg-slate-900">
	<div class="bg-indigo-600 dark:bg-sky-300 h-{height} rounded-full z-10" style="width: {progress}%" />
</div>
