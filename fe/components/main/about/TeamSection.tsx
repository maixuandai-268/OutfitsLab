'use client';
import React from 'react';

const TeamSection: React.FC = () => {
  const team = [
    { name: "Mai Xuân Đại", role: "Nhà Sáng Lập / CEO", desc: "Định hướng sản phẩm và phát triển đối tác chiến lược hệ sinh thái." },
    { name: "Trần Ngọc Tú", role: "Cố vấn Kỹ Thuật 3D", desc: "Chịu trách nhiệm quy trình quét mẫu, đổ bóng, mô phỏng vật lý." },
    { name: "Nguyễn Văn Công", role: "Trưởng nhóm Frontend", desc: "Tối ưu hóa nền tảng web, hiệu suất 3D realtime mượt mà." },
    { name: "Nguyễn Đức Duyệt", role: "Trưởng phòng Đối ngoại", desc: "Kết nối thương hiệu nhà thiết kế và cộng đồng sáng tạo KOLs." },
    { name: "Phạm Quang Trung", role: "Nghệ sĩ 3D Nội bộ", desc: "Tiến hành gia công chi tiết từng thước vải, kỹ thuật số hóa trang phục." },
  ];

  return (
    <section className="text-white">
      <div className="bg-gray-900 px-20 py-15 rounded-4xl max-w-6xl mx-auto">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4">Đội ngũ</h2>
        <h3 className="text-4xl font-extrabold mb-16">Những người cùng kiến tạo</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {team.map((member, idx) => (
            <div key={idx} className="py-6 border-b border-gray-800">
              <h4 className="text-2xl font-bold mb-2">{member.name}</h4>
              <p className="text-gray-400 font-bold mb-4 uppercase tracking-wider text-xs">{member.role}</p>
              <p className="text-gray-300 leading-relaxed font-medium">{member.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default TeamSection;
