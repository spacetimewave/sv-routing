import { navigate } from "./history.js";
import { hostMatches, shouldNavigate } from "./utils";

/**
 * A link action that can be added to <a href=""> tags rather
 * than using the <Link> component.
 *
 * Example:
 * ```html
 * <a href="/post/{postId}" use:link>{post.title}</a>
 * ```
 */
const link = (node: HTMLElement): { destroy(): void } => {
    const onClick = (event: MouseEvent) => {
        const anchor = event.currentTarget as HTMLAnchorElement;

        if (
            (anchor.target === "" || anchor.target === "_self") &&
            hostMatches(anchor) &&
            shouldNavigate(event)
        ) {
            event.preventDefault();
            navigate(anchor.pathname + anchor.search, {
                replace: anchor.hasAttribute("replace"),
                preserveScroll: anchor.hasAttribute("preserveScroll"),
            });
        }
    };

    node.addEventListener("click", onClick);

    return {
        destroy() {
            node.removeEventListener("click", onClick);
        },
    };
};
/**
 * An action to be added at a root element of your application to
 * capture all relative links and push them onto the history stack.
 *
 * Example:
 * ```html
 * <div use:links>
 *   <Router>
 *     <Route path="/" component={Home} />
 *     <Route path="/p/:projectId/:docId?" component={ProjectScreen} />
 *     {#each projects as project}
 *       <a href="/p/{project.id}">{project.title}</a>
 *     {/each}
 *   </Router>
 * </div>
 * ```
 */
const links = (node: HTMLElement): { destroy(): void } => {
    const findClosest = (tagName: string, el:HTMLElement | null): HTMLElement | null  => {
        while (el && el.tagName !== tagName) {
            const parent = el.parentNode;
            el = (parent instanceof HTMLElement) ? parent : null;
        }
        return el;
    };

    const onClick = (event: MouseEvent) => {
        const target = event.target as HTMLElement | null;
        const anchor = findClosest("A", target) as HTMLAnchorElement | null;
        if (
            anchor &&
            (anchor.target === "" || anchor.target === "_self") &&
            hostMatches(anchor) &&
            shouldNavigate(event) &&
            !anchor.hasAttribute("noroute")
        ) {
            event.preventDefault();
            navigate(anchor.pathname + anchor.search, {
                replace: anchor.hasAttribute("replace"),
                preserveScroll: anchor.hasAttribute("preserveScroll"),
            });
        }
    };

    (node as HTMLElement).addEventListener("click", onClick);

    return {
        destroy() {
            (node as HTMLElement).removeEventListener("click", onClick);
        },
    };
};

export { link, links };
