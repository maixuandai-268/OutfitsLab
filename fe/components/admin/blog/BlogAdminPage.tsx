"use client";
import { useState, useEffect } from "react";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  category: string;
  author: string;
  excerpt?: string;
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

  const fetchBlogs = async () => {
    try {
      const res = await fetch("https://outfitslab.onrender.com/api/blog");
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
        const res = await fetch(`https://outfitslab.onrender.com/api/blog/${currentId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(blogData),
        });
        if (res.ok) { fetchBlogs(); setIsEditing(false); }
        else alert("Lỗi khi cập nhật!");
      } else {
        const res = await fetch(`https://outfitslab.onrender.com/api/blog`, {
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
      const res = await fetch(`https://outfitslab.onrender.com/api/blog/${id}`, { method: "DELETE" });
      if (res.ok) fetchBlogs();
    } catch (e) { console.error(e); }
  };

  const base = dark ? "bg-gray-950 text-white" : "bg-gray-50 text-gray-900";
  const card = dark ? "bg-gray-900 border-gray-800" : "bg-white border-gray-200";
  const input = dark
    ? "bg-gray-900 border-gray-800 text-white placeholder-gray-600"
    : "bg-white border-gray-200 text-gray-900 placeholder-gray-400";

  if (isEditing) return (
    <div className={`min-h-screen ${base} p-8`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4 pb-6 border-b border-gray-800">
          <button
            onClick={() => setIsEditing(false)}
            className="w-9 h-9 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-all"
          >
            ←
          </button>
          <div>
            <h2 className="text-3xl font-bold">
              {currentId ? "CHỈNH SỬA BÀI VIẾT" : "SOẠN BÀI VIẾT MỚI"}
            </h2>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Hãy cùng tạo nên những nội dung hấp dẫn!</p>
          </div>
        </div>

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

        <div className="flex justify-end gap-3 pt-4 border-t border-gray-800">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2.5 text-gray-500 font-bold uppercase text-xs tracking-widest hover:text-gray-300 transition"
          >
            Hủy
          </button>
          <button
            onClick={handleSave}
            className="px-8 py-2.5 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-blue-500 shadow-lg shadow-blue-500/20 transition-all"
          >
            {currentId ? "Lưu thay đổi" : "Xuất bản"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen ${base} p-8`}>
      <div className="max-w-5xl mx-auto space-y-6">

        <div className="flex items-end justify-between pb-5 border-b border-gray-800">
          <div>
            <h1 className={`text-4xl font-black tracking-tighter ${dark ? "text-white" : "text-gray-900"}`}>
              BLOG CONTENT
            </h1>
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
            className="bg-blue-600 px-6 py-2.5 rounded-full font-bold text-[10px] text-white uppercase tracking-widest hover:scale-105 hover:bg-blue-500 transition-all shadow-lg shadow-purple-500/30"
          >
            + Tạo mới
          </button>
        </div>

        <div className={`flex items-center gap-6 px-5 py-3 rounded-2xl border ${card} text-xs font-bold uppercase tracking-widest`}>
          <span className="text-gray-500">{blogs.length} bài viết</span>
          <span className="text-gray-700">|</span>
          {["Thời trang", "Thể thao", "Xu hướng"].map(c => (
            <span key={c} className="text-gray-500">
              {blogs.filter(b => b.category === c).length} <span className="text-gray-600">{c}</span>
            </span>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <div
              key={blog.id}
              className={`group rounded-2xl overflow-hidden border transition-all hover:shadow-lg hover:-translate-y-1 ${card}`}
            >
              <div className="h-48 overflow-hidden relative">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <span className={`absolute top-3 left-3 ${categoryColors[blog.category] ?? "bg-gray-500"} text-white text-[10px] font-bold px-2 py-1 rounded`}>
                  {blog.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-bold text-base line-clamp-2">
                  {blog.title}
                </h3>

                <p className="text-sm text-gray-500 line-clamp-3">
                  {blog.excerpt || blog.content}
                </p>

                <div className="flex items-center justify-between pt-3 border-gray-200 text-xs">
                  <span className="text-gray-400">
                    {blog.author || "Admin"}
                  </span>

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleOpenEdit(blog)}
                      className="text-blue-400 hover:text-blue-300"
                    >
                      Sửa
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-500 hover:text-red-400"
                    >
                      Xóa
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-1.5">
      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">{label}</label>
      {children}
    </div>
  );
}