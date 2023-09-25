<script setup lang="ts">
import type { Post } from '../api/forum'
// declare props
const props = defineProps<{
    post: Post
    selected?: boolean
    parent?: boolean
    showReplyButton?: boolean
}>();

</script>

<template>
    <article class="post" :class="{selected, parent}">
        <p class="author">{{ post.author }}</p>
        <p class="date">({{ post.createdAt.toLocaleString() }})</p>
        <p>{{ post.text }}</p>
        <p v-if="showReplyButton"><button v-on:click="$emit('reply')">Reply</button></p>
    </article>
</template>

<style scoped>
.post {
    width: 100%;
    padding: 1em;
    background: #efe8e0;
    transition: background 0.2s;
    box-sizing: border-box;
    border-radius: 0.5em;
}
.post.parent {
    background: #efc8a8;
    transition: background 0.2s;
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