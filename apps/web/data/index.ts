"use server";

import { db } from "@repo/database";

export const fetchPosts = async () => {
  return db.query.posts.findMany();
};
