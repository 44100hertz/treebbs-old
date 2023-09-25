<script setup lang="ts">
import { reactive, watch } from 'vue'
import { type Post, getReplies, addPost } from '../api/forum'
type Thread = Post[]
const threads: Thread[] = reactive([getReplies(null)])
var selection = reactive({ thread: 0, post: 0 })
var parents = reactive([0])

// TODO: replace replyBox with reply button that opens a modal that isolates which post is actually being replied to.

watch(
    selection,
    async () => {
        const post = threads[selection.thread][selection.post]
        const replies: Thread = await getReplies(post.id as any)
        parents[selection.thread] = selection.post
        parents.length = selection.thread + 1
        threads[selection.thread + 1] = replies
        threads.length = selection.thread + 2
    },
    { deep: true, immediate: true }
)

window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        if (selection.thread > 0) selection.thread--
        selection.post = parents[selection.thread]
    } else if (e.key === 'ArrowRight') {
        if (threads[selection.thread + 1]?.length) selection.thread++
        selection.post = 0
    } else if (e.key === 'ArrowUp') {
        if (selection.post > 0) selection.post--
    } else if (e.key === 'ArrowDown') {
        if (selection.post < threads[selection.thread].length - 1) selection.post++
    }
})
</script>

<template>
    <div class="board">
        <div v-for="(thread, threadIndex) in threads" class="postColumn"
            :key="threadIndex === threads[threadIndex - 1]?.[parents[threadIndex - 1]]?.id">
            <div v-for="(post, postIndex) in thread" class="post" :class="{
                parent: parents[threadIndex] !== undefined && parents[threadIndex] === postIndex,
                selected: selection.thread === threadIndex && selection.post === postIndex
            }" :key="post.id" v-on:click="selection.thread = threadIndex; selection.post = postIndex">
                <article>
                    <p class="author">{{ post.author }}</p>
                    <p class="date">({{ post.createdAt.toLocaleString() }})</p>
                    <p>{{ post.text }}</p>
                </article>
            </div>
        </div>
    </div>
</template>

<style scoped>
.board {
    display: flex;
    flex-direction: row;
    justify-content: start;
}

.postColumn {
    width: 15em;
    display: flex;
    padding: 0 1.5em;
    flex-direction: column;
    align-items: center;
}

.post {
    width: 100%;
    margin: 0.5em 0;
    padding: 1em;
    background: #fff4ee;
}

.author {
    font-weight: bold;
}

.date {
    font-size: 0.8em;
    color: #555;
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
</style>
