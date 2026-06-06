"use client";

interface Props {
  onUploaded: (url: string) => void;
}

export default function ImageUpload({
  onUploaded,
}: Props) {
  async function handleUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];

    if (!file) return;

    const formData = new FormData();

    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    onUploaded(data.url);
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleUpload}
    />
  );
}