"use client";
import { useState, useEffect } from "react";

interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;      // Thêm ảnh
  category: string;   // Thêm danh mục
  author: string;     // Thêm tác giả
  date: string;
}

export default function BlogAdminPage({ dark }: { dark: boolean }) {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentId, setCurrentId] = useState<number | null>(null);
  
  // State cho Form
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Thời trang");
  const [author, setAuthor] = useState("");

  useEffect(() => {
    const data = localStorage.getItem("outfitslab_full_storage");
    if (data) setBlogs(JSON.parse(data));
  }, []);

  const saveToLocal = (newList: Blog[]) => {
    localStorage.setItem("outfitslab_full_storage", JSON.stringify(newList));
    setBlogs(newList);
  };

  const handleSave = () => {
    if (!title || !content || !image) return alert("Vui lòng điền đủ thông tin và dán URL ảnh!");

    const blogData = {
      title,
      content,
      image,
      category,
      author: author || "Admin",
      date: new Date().toLocaleDateString('vi-VN', { day: '2-digit', month: 'short', year: 'numeric' })
    };

    if (currentId) {
      const updated = blogs.map(b => b.id === currentId ? { ...b, ...blogData } : b);
      saveToLocal(updated);
    } else {
      const newBlog = { id: Date.now(), ...blogData };
      saveToLocal([newBlog, ...blogs]);
    }
    setIsEditing(false);
  };

  const handleOpenEdit = (blog: Blog) => {
    setCurrentId(blog.id);
    setTitle(blog.title);
    setContent(blog.content);
    setImage(blog.image);
    setCategory(blog.category);
    setAuthor(blog.author);
    setIsEditing(true);
  };

  return (
    <div className="p-8">
      {isEditing ? (
        <div className="max-w-5xl space-y-6 animate-in fade-in duration-300">
          <h2 className="text-2xl font-bold text-purple-500 uppercase italic">Soạn thảo bài đăng mới</h2>
          
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
               <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Tiêu đề bài viết</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Gợi ý các phụ kiện..." className={`w-full p-3 rounded-xl border outline-none mt-1 ${dark ? "bg-gray-900 border-gray-800 text-white" : "bg-white"}`} />
              </div>
              
              <div>
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">URL Hình ảnh</label>
                <input value={image} onChange={(e) => setImage(e.target.value)} placeholder="Dán link ảnh tại đây..." className={`w-full p-3 rounded-xl border outline-none mt-1 ${dark ? "bg-gray-900 border-gray-800 text-white" : "bg-white"}`} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Danh mục</label>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className={`w-full p-3 rounded-xl border mt-1 outline-none ${dark ? "bg-gray-900 border-gray-800 text-white" : "bg-white"}`}>
                    <option>Thời trang</option>
                    <option>Thể thao</option>
                    <option>Xu hướng</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Tác giả</label>
                  <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="Tên tác giả..." className={`w-full p-3 rounded-xl border mt-1 outline-none ${dark ? "bg-gray-900 border-gray-800 text-white" : "bg-white"}`} />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Nội dung</label>
              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={9} className={`w-full p-3 rounded-xl border mt-1 outline-none resize-none ${dark ? "bg-gray-900 border-gray-800 text-white" : "bg-white"}`} />
            </div>
          </div>

          <div className="flex justify-end gap-4 border-t border-gray-800 pt-6">
            <button onClick={() => setIsEditing(false)} className="px-6 py-2 text-gray-500 font-bold uppercase text-xs tracking-widest">Hủy</button>
            <button onClick={handleSave} className="px-10 py-3 bg-purple-600 text-white rounded-xl font-bold hover:bg-purple-700 shadow-lg shadow-purple-500/20 transition-all">XUẤT BẢN BÀI VIẾT</button>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b border-gray-800 pb-5">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase italic">Blog Content</h2>
              <p className="text-gray-500 text-xs uppercase font-bold tracking-[0.3em]">Quản lý bài viết OutfitsLab</p>
            </div>
            <button onClick={() => {setCurrentId(null); setTitle(""); setContent(""); setImage(""); setAuthor(""); setIsEditing(true);}} className="bg-purple-600 px-8 py-3 rounded-full font-black text-xs text-white hover:scale-105 transition-transform shadow-lg shadow-purple-500/30">TẠO BÀI VIẾT MỚI +</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div key={blog.id} className={`group rounded-3xl border overflow-hidden transition-all hover:border-purple-500/50 ${dark ? "bg-gray-900/40 border-gray-800" : "bg-white border-gray-100 shadow-sm"}`}>
                <div className="h-48 overflow-hidden relative">
                  <img src={blog.image} alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  <span className="absolute top-4 left-4 bg-rose-500 text-white text-[10px] font-bold px-3 py-1 rounded-md uppercase tracking-widest">{blog.category}</span>
                </div>
                <div className="p-5 space-y-3">
                  <h3 className="font-bold text-lg leading-tight line-clamp-2 min-h-[3.5rem]">{blog.title}</h3>
                  <div className="flex items-center gap-2 pt-2 border-t border-gray-800/50">
                    <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-[10px] font-bold text-white uppercase">{blog.author[0]}</div>
                    <span className="text-xs text-gray-400 font-medium">{blog.author} • {blog.date}</span>
                  </div>
                  <div className="flex justify-between pt-2">
                    <button onClick={() => handleOpenEdit(blog)} className="text-[10px] font-black uppercase tracking-widest text-blue-400 hover:text-blue-300">Chỉnh sửa</button>
                    <button onClick={() => {if(confirm("Xóa bài này?")) saveToLocal(blogs.filter(b => b.id !== blog.id))}} className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:text-red-400">Gỡ bỏ</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}