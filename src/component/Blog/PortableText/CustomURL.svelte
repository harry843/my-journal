<script lang="ts">
  import type {MarkComponentProps} from '@portabletext/svelte'

  // Property custom marks receive from @portabletext/svelte when rendered
  export let portableText: MarkComponentProps<{
    href?: string
    openInNewTab?: boolean
  }>

  const link = portableText.value
  const newWindow = link.openInNewTab || false

</script>

{#if link.href}
  <a class="text-blue-600 dark:text-sky-300 underline" href={link.href} rel="noreferrer" target={newWindow ? '_blank' : undefined}>
    <slot />
  </a>
{:else}
  <slot />
{/if}