<script lang="ts">
	import Logo from './iFrameLogo.svelte';
	export let portableText;
</script>

<br />
<div class="pt-4 relative">
	<span class="absolute top-3 md:top-4 left-0 p-2">
	  <Logo size={8} ignoreDarkMode={true}/>
	</span>
	<iframe 
	  class="rounded-md w-full h-96 border border-gray-100 dark:bg-white" 
	  frameborder="0" 
	  src={portableText?.value.url} 
	  title="Embedded visualisation" 
	/>
  </div>
{#if portableText?.value.caption}
	<slot name="caption"><p class="pt-2 pb-10 text-center text-gray-800 text-xs md:text-sm dark:text-slate-100 mx-[5%]">{portableText?.value.caption}</p></slot>
{/if}
