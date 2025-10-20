<!-- @migration-task Error while migrating Svelte code: Cannot use `$$props` in runes mode -->
<script>
    import { getContext, onDestroy } from "svelte";
    import { ROUTER } from "./contexts.js";
    import { canUseDOM } from "./utils.js";

    let { path = "", component = null, ...rest } = $props();

    let routeParams = $state({});
    let routeProps = $state({});

    const { registerRoute, unregisterRoute, activeRoute } = getContext(ROUTER);

    const route = {
        path,
        // If no path prop is given, this Route will act as the default Route
        // that is rendered if no other Route in the Router is a match.
        default: path === "",
    };

    $effect(() => {
        if ($activeRoute && $activeRoute.route === route) {
            routeParams = $activeRoute.params;

            routeProps = rest;

            // if (component) {
            //     if (component.toString().startsWith("class ")) component = c;
            //     else component = c();
            // }

            canUseDOM() &&
                !$activeRoute.preserveScroll &&
                window?.scrollTo(0, 0);
        }
    });

    registerRoute(route);

    onDestroy(() => {
        unregisterRoute(route);
    });
</script>

{#if $activeRoute && $activeRoute.route === route}
    {#if component}
        {#await component then resolvedComponent}
            <svelte:component
                this={resolvedComponent?.default || resolvedComponent}
                {...routeParams}
                {...routeProps}
            />
        {/await}
    {:else}
        <slot params={routeParams} />
    {/if}
{/if}
