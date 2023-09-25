<script setup lang="ts">
import { ref, reactive, watch } from 'vue'
import { type Post, type PostCreate, getPost, getReplies, addPost } from '../api/forum'
import PostElem from './Post.vue'
import ReplyModal from './ReplyModal.vue'

type Thread = Post[]
const threads: Thread[] = reactive([getReplies(null)])
var selection = reactive({ thread: 0, post: 0 })
var parents = reactive([0])

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

let replyModal = ref({ showModal: (post: Post) => null });
function showReply(post: Post) {
    replyModal.value.showModal(post);
}

function addReply(post: PostCreate) {
    const id = addPost(post);
    threads[selection.thread + 1].push(getPost(id));
}
</script>

<template>
    <ReplyModal ref="replyModal" @reply="addReply"></ReplyModal>
    <div class="board">
        <div v-for="(thread, threadIndex) in threads" class="thread"
            :key="threadIndex === threads[threadIndex - 1]?.[parents[threadIndex - 1]]?.id">
            <div v-for="(post, postIndex) in thread" class="postSlot" :key="post.id"
                @click="selection.thread = threadIndex; selection.post = postIndex">
                <PostElem :post=post :parent="parents[threadIndex] !== undefined && parents[threadIndex] === postIndex"
                    :selected="selection.thread === threadIndex && selection.post === postIndex"
                    :show-reply-button="true"
                    @reply="showReply(post)" />
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

.thread {
    width: 18em;
    display: flex;
    padding: 0 0.5em;
    flex-direction: column;
}

.postSlot {
    width: 100%;
    padding: 0.5em 0;
}
</style>
