<script lang="ts">
    import { Router, Link, Route } from "../../src";
    import Home from "./pages/Home.svelte";
    import About from "./pages/About.svelte";
    import Blog from "./pages/Blog.svelte";
    import BlogPost from "./pages/BlogPost.svelte";

    export let url = "";
</script>

<Router {url}>
    <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/blog">Blog</Link>
        <Link to="/blog/1">Post 1</Link>
        <Link to="/blog/2">Post 2</Link>
    </nav>
    <div>
        <Route path="/blog/:id" component={BlogPost as any} />
        <Route path="/blog" component={Blog} />
        <Route path="/about" component={About} />
        <Route path="/"><Home /></Route>
    </div>
</Router>
