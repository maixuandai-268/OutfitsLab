"use client";
import { useState, useEffect } from "react";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  date?: string;
  createdAt?: string;
}

const categoryColors: Record<string, string> = {
  "Thời trang": "bg-rose-500",
  "Thể thao": "bg-emerald-500",
  "Xu hướng": "bg-amber-500",
  "Công nghệ": "bg-blue-500",
  "Đời sống": "bg-purple-500",
  "Làm đẹp": "bg-pink-500",
};

export default function BlogAdminPage({ dark }: { dark: boolean }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Thời trang");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");

  // ── BE / API – GIỮ NGUYÊN ─────────────────────────────────────────
  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/blog");
      if (res.ok) {
        const data = await res.json();
        setBlogs(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleSave = async () => {
    if (!title || !content || !image)
      return alert("Vui lòng điền đủ thông tin và dán URL ảnh!");

    const blogData = {
      title,
      content,
      image,
      category,
      author: author || "Admin",
      excerpt
    };

    try {
      if (currentId) {
        const res = await fetch(`http://localhost:3000/api/blog/${currentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blogData),
        });
        if (res.ok) { fetchBlogs(); setIsEditing(false); }
        else alert("Lỗi khi cập nhật!");
      } else {
        const res = await fetch(`http://localhost:3000/api/blog`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blogData),
        });
        if (res.ok) { fetchBlogs(); setIsEditing(false); }
        else { const err = await res.json(); alert("Lỗi: " + JSON.stringify(err.message)); }
      }
    } catch (error) {
      console.error(error);
      alert("Đã xảy ra lỗi hệ thống!");
    }
  };

  const handleOpenEdit = (blog: Blog) => {
    setCurrentId(blog.id);
    setTitle(blog.title);
    setContent(blog.content);
    setImage(blog.image);
    setCategory(blog.category);
    setAuthor(blog.author);
    setExcerpt(blog.excerpt || "");
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Xóa bài này?")) return;
    try {
      const res = await fetch(`http://localhost:3000/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) fetchBlogs();
    } catch (e) { console.error(e); }
  };
  // ──────────────────────────────────────────────────────────────────

  const base = dark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900";
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const input = dark
    ? "bg-gray-900 border-gray-800 text-white placeholder-gray-600"
    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400";

  // ── FORM VIEW ────────────────────────────────────────────────────
  if (isEditing) return (
    <div className={`min-h-screen ${base} p-8`}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-gray-800">
          <button
            onClick={() => setIsEditing(false)}
            className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-all"
          >
            ←
          </button>
          <div>
            <h2 className="text-xl font-black uppercase italic tracking-tight text-purple-400">
              {currentId ? "Chỉnh sửa bài viết" : "Soạn bài viết mới"}
            </h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">OutfitsLab Blog Editor</p>
          </div>
        </div>

        {/* Fields – vertical stack */}
        <div className="space-y-5">
          <Field label="Tiêu đề bài viết">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Gợi ý các phụ kiện..."
              className={`w-full p-3 rounded-xl border outline-none text-sm ${input}`}
            />
          </Field>

          <Field label="URL Hình ảnh">
            <input
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="Dán link ảnh tại đây..."
              className={`w-full p-3 rounded-xl border outline-none text-sm ${input}`}
            />
            {image && (
              <div className="mt-2 h-40 rounded-xl overflow-hidden border border-gray-800">
                <img src={image} alt="preview" className="w-full h-full object-cover" />
              </div>
            )}
          </Field>

          <div className="grid grid-cols-2 gap-4">
            <Field label="Danh mục">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full p-3 rounded-xl border outline-none text-sm ${input}`}
              >
                <option>Thời trang</option>
                <option>Thể thao</option>
                <option>Xu hướng</option>
                <option>Công nghệ</option>
                <option>Đời sống</option>
                <option>Làm đẹp</option>
              </select>
            </Field>
            <Field label="Tác giả">
              <input
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Tên tác giả..."
                className={`w-full p-3 rounded-xl border outline-none text-sm ${input}`}
              />
            </Field>
          </div>

          <Field label="Đoạn tóm tắt nổi bật">
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              rows={3}
              placeholder="Nhập đoạn tóm tắt ngắn, gây chú ý..."
              className={`w-full p-3 rounded-xl border outline-none resize-none text-sm ${input}`}
            />
          </Field>

          <Field label="Nội dung">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={8}
              className={`w-full p-3 rounded-xl border outline-none resize-none text-sm ${input}`}
            />
          </Field>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2.5 text-gray-500 font-bold uppercase text-xs tracking-widest hover:text-gray-300 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2.5 bg-purple-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-purple-500 shadow-lg shadow-purple-500/20 transition-all"
          >
            {currentId ? "Lưu thay đổi" : "Xuất bản"}
          </button>
        </div>
      </div>
    </div>
  );

  // ── LIST VIEW ────────────────────────────────────────────────────
  return (
    <div className={`min-h-screen ${base} p-8`}>
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Page header */}
        <div className="flex items-end justify-between pb-5 border-b border-gray-800">
          <div>
            <h1 className="text-3xl font-black uppercase italic tracking-tighter text-white">Blog Content</h1>
            <p className="text-[10px] text-gray-500 uppercase font-bold tracking-[0.3em] mt-0.5">Quản lý bài viết OutfitsLab</p>
          </div>
          <button
            onClick={() => {
              setCurrentId(null);
              setTitle("");
              setContent("");
              setImage("");
              setAuthor("");
              setExcerpt("");
              setIsEditing(true);
            }}
            className="bg-purple-600 px-6 py-2.5 rounded-full font-black text-[10px] text-white uppercase tracking-widest hover:scale-105 hover:bg-purple-500 transition-all shadow-lg shadow-purple-500/30"
          >
            + Tạo mới
          </button>
        </div>

        {/* Stats strip */}
        <div className={`flex items-center gap-6 px-5 py-3 rounded-2xl border ${card} text-xs font-bold uppercase tracking-widest`}>
          <span className="text-gray-500">{blogs.length} bài viết</span>
          <span className="text-gray-700">|</span>
          {["Thời trang", "Thể thao", "Xu hướng"].map(c => (
            <span key={c} className="text-gray-500">
              {blogs.filter(b => b.category === c).length} <span className="text-gray-600">{c}</span>
            </span>
          ))}
        </div>

        {/* Vertical list */}
        <div className="space-y-4">
          {blogs.map((blog, i) => (
            <div
              key={blog.id}
              className={`group flex gap-4 rounded-2xl border overflow-hidden transition-all hover:border-purple-500/50 ${card}`}
            >
              {/* Thumbnail */}
              <div className="w-36 flex-shrink-0 overflow-hidden relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className={`absolute top-2 left-2 ${categoryColors[blog.category] ?? "bg-gray-500"} text-white text-[9px] font-black px-2 py-0.5 rounded uppercase tracking-widest`}>
                  {blog.category}
                </span>
              </div>

              {/* Body */}
              <div className="flex-1 py-4 pr-5 flex flex-col justify-between min-w-0">
                <div className="space-y-1">
                  {/* index */}
                  <span className="text-[10px] font-black text-gray-600 uppercase tracking-widest">#{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="font-bold text-base leading-snug line-clamp-2">{blog.title}</h3>
                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {blog.excerpt || blog.content}
                  </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-800/50">
                  {/* Author */}
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-purple-600 flex items-center justify-center text-[9px] font-black text-white uppercase">
                      {blog.author?.[0] || "A"}
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium">
                      {blog.author || "Admin"} &bull;{" "}
                      {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString("vi-VN") : blog.date}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => handleOpenEdit(blog)}
                      className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300 transition"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400 transition"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {blogs.length === 0 && (
            <div className={`text-center py-16 rounded-2xl border border-dashed ${dark ? "border-gray-800 text-gray-600" : "border-gray-200 text-gray-400"}`}>
              <p className="text-xs font-black uppercase tracking-widest">Chưa có bài viết nào</p>
              <p className="text-xs mt-1">Bấm "+ Tạo mới" để bắt đầu</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Helper ─────────────────────────────────────────────────────────
function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>
      {children}
    </div>
  );
}