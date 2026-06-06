"use client";

import { useState } from "react";
import TiptapEditor from "@/components/editor/tiptap-editor";
import ImageUpload from "@/components/editor/image-upload";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");

  const [excerpt, setExcerpt] = useState("");

  const [content, setContent] = useState("");

  const [featuredImage, setFeaturedImage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  async function savePost() {
    try {
      setLoading(true);

      const res = await fetch(
        "/api/posts",
        {
          method: "POST",

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
          }),
        }
      );

      if (!res.ok) {
        throw new Error(
          "Save failed"
        );
      }

      alert("Post saved");

      setTitle("");
      setExcerpt("");
      setContent("");
      setFeaturedImage("");

    } catch (error) {
      console.error(error);

      alert("Error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-8">

      <h1 className="text-3xl font-bold mb-8">
        Create Post
      </h1>

      {/* TITLE */}

      <input
        type="text"
        placeholder="Post Title"
        className="border p-3 w-full rounded mb-4"
        value={title}
        onChange={(e) =>
          setTitle(
            e.target.value
          )
        }
      />

      {/* EXCERPT */}

      <textarea
        placeholder="Short description"
        className="border p-3 w-full rounded mb-4"
        rows={4}
        value={excerpt}
        onChange={(e) =>
          setExcerpt(
            e.target.value
          )
        }
      />

      {/* FEATURED IMAGE */}

      <div className="mb-6">

        <h3 className="mb-2">
          Featured Image
        </h3>

        <ImageUpload
          onUploaded={(url) =>
            setFeaturedImage(
              url
            )
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

      {/* CONTENT */}

      <TiptapEditor
        value={content}
        onChange={setContent}
      />

      <button
        onClick={savePost}
        disabled={loading}
        className="bg-black text-white px-6 py-3 rounded mt-6"
      >
        {loading
          ? "Saving..."
          : "Save Post"}
      </button>

    </div>
  );
}