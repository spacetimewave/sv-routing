<script lang="ts">
    let { id, ...rest } = $props();
    console.log(id);
    console.log(rest);
</script>

<main>
    <h1>Blog</h1>
    <p>By Spacetimewave</p>
    {#if id}
        <p>Post ID: {id}</p>
    {/if}
</main>
