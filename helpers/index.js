import matter from "gray-matter";

export async function getPosts() {
  const context = require.context("../_posts", false, /\.md$/);
  const files = context.keys();
  const posts = [];
  for (const key of files) {
    const post = key.slice(2);
    const content = await import(`../_posts/${post}`);
    const meta = matter(content.default);
    posts.push({
      slug: post.replace(".md", ""),
      title: meta.data.title,
    });
  }
  return posts;
}

export async function getPostBySlug(slug) {
  const fileContent = await import(`../_posts/${slug}.md`);
  const meta = matter(fileContent.default);
  console.log(meta)
  return {
    title: meta.data.title,
    content: meta.content,
  };
}
