<script>
    import classNames from 'classnames';
    import handleAnchorClick from "../utils/handleAnchorClick";
    import ArrowLeft from "../../Icons/ArrowLeft.svelte";
    import ArrowRight from "../../Icons/ArrowRight.svelte";
    import { onMount, onDestroy } from 'svelte';

    export let content = null;
    export let screenWidth = 0;

    let modalRef;
    let buttonRef;
    let hidden = true;

    function extractHeadings(contents) {
        let headings = [];
        contents.forEach((heading) => {
            if (heading.style === 'h3') {
                headings.push({ key: heading._key, text: heading.children[0].text });
            }
        });
        return headings;
    }

    function onClick() {
        hidden = !hidden;
    }

    function handleClickOutside(event) {
        if (!document) return; // Ensure document is defined
        const { clientX, clientY } = event;
        const modalRect = modalRef?.getBoundingClientRect();
        
        if (
            modalRect &&
            (clientX < modalRect.left || clientX > modalRect.right || 
            clientY < modalRect.top || clientY > modalRect.bottom)
        ) {
            hidden = true;
            console.log('Setting hidden to true due to outside click');
        }
    }

    function handleButtonClick(event) {
        event.stopPropagation(); // Prevent the click event from propagating to the document
        onClick();
    }

    onMount(() => {
        if (!document) return; // Ensure document is defined
        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        }
    });
</script>

{#if screenWidth >= 768}
    <aside>
        {#if !hidden}
            <section
                class={classNames('fixed max-width-[280px] -translate-y-1/2 top-[50%] left-10 z-20', {
                    '-left-full': hidden,
                    '': !hidden
                })}
                bind:this={modalRef}
            >
                <div
                    class="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 px-4 py-3 rounded-lg shadow-sm"
                >
                    <div class="translate-x-[85%] px-4 pb-3 z-10">
                        <button aria-label="Hide table of contents" class="" on:click={handleButtonClick}
                            ><ArrowLeft /></button>
                    </div>
                    <div class="-translate-y-[7.5%]">
                        <h2 class="leading-5 font-medium font-customHeading text-xl pb-5">Table of contents</h2>
                        <ul>
                            <li class="py-1.5">
                                <a href="#top" class="hover:text-indigo-700 hover:underline dark:hover:text-sky-300"
                                    >Top of page</a>
                            </li>
                            {#each extractHeadings(content) as { key, text }}
                                <li class="py-1.5">
                                    <a
                                        href="#section-{key}"
                                        class="hover:text-indigo-700 hover:underline dark:hover:text-sky-300"
                                        on:click={handleAnchorClick}
                                    >{text}</a>
                                </li>
                            {/each}
                        </ul>
                    </div>
                </div>
            </section>
        {/if}
        {#if hidden}
            <section class="fixed -translate-y-1/2 top-[50%] left-10 z-20">
                <div
                    class="bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 p-3 rounded-lg shadow-sm"
                >
                    <div class="flex flex-col items-center justify-center">
                        <button bind:this={buttonRef} aria-label="Show table of contents" class="translate-x-0.5" on:click={handleButtonClick}
                            ><ArrowRight /></button>
                    </div>
                </div>
            </section>
        {/if}
    </aside>
{/if}
