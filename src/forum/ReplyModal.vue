<script setup lang="ts">
import { ref, type Ref } from 'vue'
import { type Post, type PostCreate, type PostId } from '../api/forum'
import PostElem from './Post.vue'

const emit = defineEmits<{ (e: 'reply', post: PostCreate): void }>()

let replyTo: Ref<Post | null> = ref(null);
let replyModal = ref({ showModal: () => null, close: () => null });
let replyText = ref('');
let replyAuthor = ref('Anonymous');

function showModal(post: Post) {
    replyTo.value = post;
    replyModal.value.showModal();
}

function cancel() {
    replyTo.value = null;
    replyModal.value.close();
}

function doReply() {
    let post: PostCreate = {
        author: replyAuthor.value,
        text: replyText.value,
        parentId: replyTo.value?.id as PostId,
    }
    emit('reply', post);
    cancel();
}

defineExpose({ showModal });
</script>

<template>
    <dialog class="replyModal" ref="replyModal">
        <div v-if="replyTo">
            <div>
                <p>Replying to:</p>
                <PostElem :post="replyTo" />
            </div>
            <form>
                <input type="text" v-model="replyAuthor" placeholder="Anonymous" />
                <br>
                <textarea v-model="replyText"></textarea>
                <br>
                <button @click="doReply">Reply</button>
                <button @click="cancel">Cancel</button>
            </form>
        </div>
    </dialog>
</template>