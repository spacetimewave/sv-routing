<script>
    import { run } from 'svelte/legacy';

    import { createEventDispatcher, getContext } from "svelte";
    import { HISTORY, LOCATION, ROUTER } from "./contexts.js";
    import { resolve, shouldNavigate } from "./utils.js";

    /** @type {{to?: string, replace?: boolean, stateInput?: any, getProps?: any, preserveScroll?: boolean, children?: import('svelte').Snippet<[any]>, [key: string]: any}} */
    let {
        to = "#",
        replace = false,
        stateInput = {},
        getProps = () => ({}),
        preserveScroll = false,
        children,
        ...rest
    } = $props();

    const location = getContext(LOCATION);
    const { base } = getContext(ROUTER);
    const { navigate } = getContext(HISTORY);
    const dispatch = createEventDispatcher();

    let href = $state(), isPartiallyCurrent = $state(), isCurrent = $state(), props = $derived(getProps({
        location: $location,
        href,
        isPartiallyCurrent,
        isCurrent,
        existingProps: rest,
    }));
    run(() => {
        href = resolve(to, $base.uri);
    });
    run(() => {
        isPartiallyCurrent = $location.pathname.startsWith(href);
    });
    run(() => {
        isCurrent = href === $location.pathname;
    });
    let ariaCurrent = $derived(isCurrent ? "page" : undefined);
    

    const onClick = (event) => {
        dispatch("click", event);
        if (shouldNavigate(event)) {
            event.preventDefault();
            // Don't push another entry to the history stack when the user
            // clicks on a Link to the page they are currently on.
            const shouldReplace = $location.pathname === href || replace;
            navigate(href, { stateInput, replace: shouldReplace, preserveScroll });
        }
    };
</script>

<a
    {href}
    aria-current={ariaCurrent}
    onclick={onClick}
    {...props}
    {...rest}
>
    {@render children?.({ active: !!ariaCurrent, })}
</a>
