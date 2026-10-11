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
    .map((fileName, index) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const meta = matter(fileContents);
      const stats = readingTime(meta.content);
      const rawDate = meta.data.date ? meta.data.date.toString() : "";
      const baseSlug = fileName.replace(/\.md$/, "");

      // Derive smart defaults for expedition field log attributes
      const tags = meta.data.tags || (
        baseSlug.includes("web3") ? ["#WEB3", "#SOLIDITY", "#CRYPTO"] :
        baseSlug.includes("css") ? ["#FRONTEND", "#CSS", "#PERFORMANCE"] :
        baseSlug.includes("deno") ? ["#NODEJS", "#DENO", "#BACKEND"] :
        baseSlug.includes("trends") ? ["#TRENDS", "#SRE", "#DEV"] :
        ["#EXPEDITION", "#SRE", "#TECH"]
      );

      const elevations = ["5,364m", "4,800m", "4,300m", "3,600m", "2,900m"];
      const elevation = meta.data.elevation || elevations[index % elevations.length];
      const coordinates = meta.data.coordinates || "1.3521° N, 103.8198° E";
      const logNumber = meta.data.logNumber || (15 - index);
      const featured = meta.data.featured !== undefined ? meta.data.featured : index === 0;

      return {
        slug: baseSlug,
        title: meta.data.title || "",
        subtitle: meta.data.subtitle || "",
        readTime: stats.text.replace(" read", ""),
        date: rawDate,
        tags,
        elevation,
        coordinates,
        logNumber,
        featured,
        author: meta.data.author || { name: "Vishal" },
      };
    });

  // Sort by date descending
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPostBySlug(slug) {
  const realSlug = Array.isArray(slug) ? slug[0] : slug;
  const fullPath = path.join(postsDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  const meta = matter(fileContents);
  const stats = readingTime(meta.content);

  const tags = meta.data.tags || (
    realSlug.includes("web3") ? ["#WEB3", "#SOLIDITY", "#CRYPTO"] :
    realSlug.includes("css") ? ["#FRONTEND", "#CSS", "#PERFORMANCE"] :
    realSlug.includes("deno") ? ["#NODEJS", "#DENO", "#BACKEND"] :
    ["#EXPEDITION", "#SRE", "#TECH"]
  );

  return {
    title: meta.data.title || "",
    subtitle: meta.data.subtitle || "",
    content: meta.content,
    readTime: stats.text,
    author: meta.data.author || { name: "Vishal" },
    slug: realSlug,
    date: meta.data.date ? meta.data.date.toString() : "",
    tags,
    elevation: meta.data.elevation || "4,800m",
    coordinates: meta.data.coordinates || "1.3521° N, 103.8198° E",
    logNumber: meta.data.logNumber || 14,
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
