const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  UserId: { type: String, required: true},
  PostId: { type: String, required: true},
  content: { type: String, required: true},
  timestamp: { type: String, required: true}
});

const Post = mongoose.model("Post", postSchema);

async function newPost(UserId, PostId, content, timestamp) {

  const newPost = await Post.create({
    UserId: UserId,
    PostId: PostId,
    content: content,
    timestamp: timestamp
  });

  return newPost;
}

async function viewPost(pid) {
    return await Post.find({"UserId": pid});
}

async function updatePost(pid, newcontent) {
  const post = await Post.updateOne({"_id": pid}, {$set: { content: newcontent}});
  return post;
}
async function deletePost(pid) {
  await Post.deleteOne({"_id": pid});
};

module.exports = { 
    newPost, viewPost, updatePost, deletePost 
};