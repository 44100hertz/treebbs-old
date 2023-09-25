export type PostId = number;

export type Post = {
  id: PostId,
  parentId: PostId | null,
  author: string,
  text: string,
  createdAt: Date,
}

export type PostCreate = Pick<Post, 'author' | 'text' | 'parentId'> & { parentId: PostId };

const forum: Post[] = [
    { 
        id: 0,
        parentId: null,
        author: "Admin",
        text: "Welcome to TreeBBS. No illegal content by US standards. Have fun :)",
        createdAt: new Date(),
     },
    { 
        id: 1,
        parentId: 0,
        author: "Admin",
        text: "This is a more serious thread.",
        createdAt: new Date(),
     },
    { 
        id: 2,
        parentId: 0,
        author: "Admin",
        text: "This is a less serious thread.",
        createdAt: new Date(),
     },
    { 
        id: 4,
        parentId: 1,
        author: "Admin",
        text: "POLITICS!!!!",
        createdAt: new Date(),
     },
    { 
        id: 5,
        parentId: 2,
        author: "Admin",
        text: "MEMES!!!!",
        createdAt: new Date(),
     },
]

export function getPost(targetId: PostId): Post {
    const post = forum.find(({id}) => targetId == id);
    if (!post) {
        throw new Error("Post not found");
    }
    return post;
}

export function getReplies(targetId: Post['parentId']): Post[] {
    return forum.filter(({parentId}) => parentId == targetId);
}

function generatePostId(): PostId {
    return Math.floor(Math.random() * (2 ** 48));
}

export function addPost(post: PostCreate): PostId {
    const postOut: Post = {
        id: generatePostId(),
        createdAt: new Date(),
        ...post,
    };
    forum.push(postOut);
    return postOut.id;
}