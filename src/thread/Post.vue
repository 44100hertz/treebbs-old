<script setup lang="ts">
import { Post } from '../api/forum'
// declare props
const props = defineProps<{
    post: Post
    selected: boolean
    parent: boolean
}>();
</script>

<template>
    <article class="post" :class="{selected, parent}">
        <p class="author">{{ post.author }}</p>
        <p class="date">({{ post.createdAt.toLocaleString() }})</p>
        <p>{{ post.text }}</p>
        <p><button>Reply</button></p>
    </article>
</template>

<style scoped>
.post {
    width: 100%;
    padding: 1em;
    background: #fff4ee;
    box-sizing: border-box;
}
.post.parent {
    background: #ffb0b0;
}

.post.selected {
    border: 4px solid black;
    padding: calc(1em - 4px);
}

.post p {
    margin: 0.2em 0em;
}
.author {
    font-weight: bold;
}

.date {
    font-size: 0.8em;
    color: #555;
}
</style>