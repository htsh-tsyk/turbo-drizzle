import "dotenv/config";

import { client, db } from "@/database";
import { comments, posts, users } from "@/schema";
import { eq } from "drizzle-orm";

const times = (v: number) =>
  Array(v)
    .fill(null)
    .map((_, i) => i + 1);

const main = async (): Promise<void> => {
  const res = await db.query.posts.findMany({
    with: {
      comments: {
        where: (comments, { eq }) => eq(comments.authorId, 1),
      },
    },
  });

  let n = 0;

  for (const i of times(10)) {
    await db.insert(users).values({ name: `Author ${i}` });
  }

  n = 0;
  for (const author of await db.query.users.findMany()) {
    for (const _ of times(5)) {
      n += 1;

      await db.insert(posts).values({
        authorId: author.id,
        title: `Article Title ${n}`,
        content: `Article content ${n}`,
      });
    }
  }

  n = 0;
  for (const post of await db.query.posts.findMany({
    with: { author: true },
  })) {
    for (const _ of times(5)) {
      n += 1;

      await db.insert(comments).values({
        authorId: post.id,
        postId: post.id,
        text: `comment ${n}`,
      });
    }
  }

  await client.end();
  process.exit(0);
};

void main();
