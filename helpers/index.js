import matter from "gray-matter";
import * as readingTime from "reading-time";

export async function getPosts() {
  const context = require.context("../_posts", false, /\.md$/);
  const files = context.keys();
  const posts = [];
  for (const key of files) {
    const post = key.slice(2);
    const content = await import(`../_posts/${post}`);
    const meta = matter(content.default);
    const stats = readingTime(meta.content);
    posts.push({
      slug: post.replace(".md", ""),
      title: meta.data.title,
      subtitle:meta.data.subtitle,
      readTime: stats.text.replace(" read", ""),
      date: meta.data.date.toString(),
    });
  }
  return posts;
}

export async function getPostBySlug(slug) {
  const fileContent = await import(`../_posts/${slug[0]}.md`);
  const meta = matter(fileContent.default);
  const stats = readingTime(meta.content);
  return {
    title: meta.data.title,
    subtitle:meta.data.subtitle,
    content: meta.content,
    readTime: stats.text,
    author: meta.data.author,
    slug:slug,
    date: meta.data.date.toString(),
  };
}

export function getOrdinalNum(number) {
  let selector;

  if (number <= 0) {
    selector = 4;
  } else if ((number > 3 && number < 21) || number % 10 > 3) {
    selector = 0;
  } else {
    selector = number % 10;
  }

  return number + ["th", "st", "nd", "rd", ""][selector];
}
