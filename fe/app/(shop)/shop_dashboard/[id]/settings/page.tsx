'use client'

import { 
  SettingOutlined,
  DockerOutlined, 
} from "@ant-design/icons";
import { useParams } from 'next/navigation';
import { SHOPS } from '../../../shopData';

export default function SettingsPage() {
  const params = useParams();
  const shopId = Number(params.id);
  const shop = SHOPS.find((s) => s.id === shopId);

  return (
    <div className="">
      <h2 className="text-2xl font-bold mb-5">Cài Đặt Cửa Hàng</h2>
      <div className="bg-white border border-[#d19f42] rounded-4xl px-7 py-10 gap-7">
        <p className="text-lg font-bold mb-5"><SettingOutlined /> Thông Tin Cơ Bản</p>
        <p>Tên cửa hàng</p>
        <input 
            type="text"  
            className="w-full rounded-xl border border-[#d19f42] mb-5 mt-2 py-2 pl-7 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e2cca5]"
          />

        <p>Mô tả cửa hàng</p>
        <textarea 
          className="w-full rounded-xl border border-[#d19f42] mb-5 mt-2 h-40 p-3 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e2cca5]"
        />
        <p>Email</p>
        <input 
          type="text" 
          className="w-full rounded-xl border border-[#d19f42] mt-2 py-2 pl-7 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#e2cca5]"
        />
      </div>

      <div className="bg-white border border-[#d19f42] rounded-4xl my-7 px-7 py-10 gap-7">
         <h2 className="text-2xl font-bold mb-5"><DockerOutlined /> Giao Hàng & Chính Sách</h2>
         <p className="text-lg font-bold mb-2">Khu vực giao hàng</p>
         <input type="checkbox" name="hobby" value="vietnam"/> Việt Nam <br></br>
         <input type="checkbox" name="hobby" value="asia"/> Châu Á <br></br>
         <input type="checkbox" name="hobby" value="worldwide"/> Toàn cầu
      </div>

      <div className="flex gap-5">
        <button className="text-white bg-[#d19f42] px-5 py-2.5 rounded-xl font-bold flex items-center hover:bg-orange-50 hover:text-[#d19f42] border border-[#d19f42] transition-colors">Save Changes</button>
        <button className="text-[#d19f42] bg-white px-5 py-2.5 rounded-xl font-bold flex items-center hover:bg-orange-50 hover:text-[#d19f42] border border-[#d19f42] transition-colors">Cancel</button>
      </div>

    </div>

  );
}