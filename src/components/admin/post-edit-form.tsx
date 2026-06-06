"use client";

import { useState } from "react";

import TiptapEditor
  from "@/components/editor/tiptap-editor";

import ImageUpload
  from "@/components/editor/image-upload";

export default function PostEditForm({
  post,
}: {
  post: any;
}) {

  const [title, setTitle] =
    useState(post.title);

  const [excerpt, setExcerpt] =
    useState(post.excerpt || "");

  const [content, setContent] =
    useState(post.content || "");

  const [
    featuredImage,
    setFeaturedImage,
  ] = useState(
    post.featured_image || ""
  );

  const [status, setStatus] =
    useState(post.status);

  const [loading, setLoading] =
    useState(false);

  async function updatePost() {

    try {

      setLoading(true);

      const res = await fetch(
        `/api/posts/${post.id}`,
        {
          method: "PUT",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            title,
            excerpt,
            content,
            featured_image:
              featuredImage,
            status,
          }),
        }
      );

      if (!res.ok) {
        throw new Error();
      }

      alert("Updated");

    } catch (error) {

      console.error(error);

      alert("Update failed");

    } finally {

      setLoading(false);

    }
  }

  return (
    <div className="space-y-6">

      <input
        className="border p-3 w-full rounded"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <textarea
        className="border p-3 w-full rounded"
        rows={4}
        value={excerpt}
        onChange={(e) =>
          setExcerpt(e.target.value)
        }
      />

      <div>

        <ImageUpload
          onUploaded={(url) =>
            setFeaturedImage(url)
          }
        />

        {featuredImage && (
          <img
            src={featuredImage}
            alt=""
            className="w-64 mt-4 rounded"
          />
        )}

      </div>

      <select
        value={status}
        onChange={(e) =>
          setStatus(e.target.value)
        }
        className="border p-3 rounded"
      >
        <option value="draft">
          Draft
        </option>

        <option value="published">
          Published
        </option>

        <option value="archived">
          Archived
        </option>
      </select>

      <TiptapEditor
        value={content}
        onChange={setContent}
      />

      <button
        onClick={updatePost}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded"
      >
        {loading
          ? "Saving..."
          : "Update Post"}
      </button>

    </div>
  );
}