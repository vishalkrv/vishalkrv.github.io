import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const postsDirectory = path.join(process.cwd(), "_posts");

export function getPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  const fileNames = fs.readdirSync(postsDirectory);
  const posts = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const meta = matter(fileContents);
      const stats = readingTime(meta.content);
      return {
        slug: fileName.replace(/\.md$/, ""),
        title: meta.data.title || "",
        subtitle: meta.data.subtitle || "",
        readTime: stats.text.replace(" read", ""),
        date: meta.data.date ? meta.data.date.toString() : "",
      };
    });
  return posts;
}

export function getPostBySlug(slug) {
  const realSlug = Array.isArray(slug) ? slug[0] : slug;
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const meta = matter(fileContents);
  const stats = readingTime(meta.content);
  return {
    title: meta.data.title || "",
    subtitle: meta.data.subtitle || "",
    content: meta.content,
    readTime: stats.text,
    author: meta.data.author || { name: "Vishal" },
    slug: realSlug,
    date: meta.data.date ? meta.data.date.toString() : "",
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
