"use client";
import { useState } from "react";
import { SettingOutlined } from "@ant-design/icons";

interface SettingsPageProps {
  dark: boolean;
}

type SystemSettings = {
  maintenanceMode: boolean;
  emailNotifications: boolean;
  autoApproveSeller: boolean;
};

type CommissionSettings = {
  standardRate: string; // lưu dạng string để dễ nhập liệu (%, số thập phân)
  premiumDiscount: string;
};

export default function SettingsPage({ dark }: SettingsPageProps) {
  const [sys, setSys] = useState<SystemSettings>({
    maintenanceMode: false,
    emailNotifications: true,
    autoApproveSeller: false,
  });

  const [com, setCom] = useState<CommissionSettings>({
    standardRate: "10",
    premiumDiscount: "2.5",
  });

  const onToggle = (key: keyof SystemSettings) =>
    setSys((prev) => ({ ...prev, [key]: !prev[key] }));

  const onChangeCommission = (key: keyof CommissionSettings, val: string) => {
    // chỉ cho phép số, dấu chấm, rỗng
    if (/^\d*\.?\d*$/.test(val)) {
      setCom((prev) => ({ ...prev, [key]: val }));
    }
  };

  const onSave = async () => {
    // Giả lập lưu (call API tuỳ bạn)
    const payload = { system: sys, commission: com };
    console.log("Save Settings:", payload);
    // Show toast đơn giản
    alert("Settings saved!");
  };

  const cardBase = `rounded-2xl border ${dark ? "bg-gray-800 border-gray-700" : "bg-white border-amber-200"}`;
  const sectionTitle = `text-sm font-semibold flex items-center gap-2 ${dark ? "text-gray-100" : "text-amber-900"}`;
  const hintText = "text-xs text-gray-400";
  const divider = `${dark ? "border-gray-700/60" : "border-amber-200"}`;

  return (
    <main className="flex-1 overflow-y-auto p-6">
      {/* Header */}
      <div className="mb-4">
        <h1 className={`text-xl font-bold ${dark ? "text-gray-50" : "text-gray-900"}`}>
          <SettingOutlined className="mr-2" />
          Settings
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">System configuration and commission rules.</p>
      </div>

      {/* System Settings */}
      <section className={`${cardBase} p-4 mb-4`}>
        <h2 className={sectionTitle}>
          <span>⚙️ System Settings</span>
        </h2>

        <div className={`mt-3 flex flex-col gap-3`}>
          {/* Row item */}
          <div className={`${dark ? "bg-gray-900" : "bg-amber-50"} rounded-xl p-3 border ${divider}`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className={`text-[13px] font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>
                  Maintenance Mode
                </p>
                <p className={hintText}>Disable user access for system updates</p>
              </div>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-amber-500"
                  checked={sys.maintenanceMode}
                  onChange={() => onToggle("maintenanceMode")}
                  title="Maintenance Mode"
                />
              </label>
            </div>
          </div>

          <div className={`${dark ? "bg-gray-900" : "bg-amber-50"} rounded-xl p-3 border ${divider}`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className={`text-[13px] font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>
                  Email Notifications
                </p>
                <p className={hintText}>Send alerts for critical issues</p>
              </div>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-amber-500"
                  checked={sys.emailNotifications}
                  onChange={() => onToggle("emailNotifications")}
                  title="Email Notifications"
                />
              </label>
            </div>
          </div>

          <div className={`${dark ? "bg-gray-900" : "bg-amber-50"} rounded-xl p-3 border ${divider}`}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className={`text-[13px] font-semibold ${dark ? "text-gray-100" : "text-gray-800"}`}>
                  New Seller Auto-Approval
                </p>
                <p className={hintText}>Auto-approve sellers meeting requirements</p>
              </div>
              <label className="inline-flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 accent-amber-500"
                  checked={sys.autoApproveSeller}
                  onChange={() => onToggle("autoApproveSeller")}
                  title="New Seller Auto-Approval"
                />
              </label>
            </div>
          </div>
        </div>
      </section>

      {/* Commission Settings */}
      <section className={`${cardBase} p-4`}>
        <h2 className={sectionTitle}>💰 Commission Settings</h2>

        <div className="mt-3 grid grid-cols-1 gap-3">
          <div>
            <label className={`block text-xs mb-1 ${dark ? "text-gray-300" : "text-amber-800"}`}>
              Standard Commission Rate (%)
            </label>
            <input
              inputMode="decimal"
              value={com.standardRate}
              onChange={(e) => onChangeCommission("standardRate", e.target.value)}
              placeholder="e.g., 10"
              className={`w-full px-3 py-2 rounded-xl outline-none border text-sm transition-colors
                ${dark
                  ? "bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-indigo-500"
                  : "bg-white border-amber-200 text-gray-700 placeholder-slate-400 focus:border-amber-300"}
              `}
            />
          </div>

          <div>
            <label className={`block text-xs mb-1 ${dark ? "text-gray-300" : "text-amber-800"}`}>
              Premium Seller Discount (%)
            </label>
            <input
              inputMode="decimal"
              value={com.premiumDiscount}
              onChange={(e) => onChangeCommission("premiumDiscount", e.target.value)}
              placeholder="e.g., 2.5"
              className={`w-full px-3 py-2 rounded-xl outline-none border text-sm transition-colors
                ${dark
                  ? "bg-gray-900 border-gray-700 text-gray-200 placeholder-gray-500 focus:border-indigo-500"
                  : "bg-white border-amber-200 text-gray-700 placeholder-slate-400 focus:border-amber-300"}
              `}
            />
          </div>
        </div>
      </section>

      {/* Save button */}
      <div className="mt-4">
        <button
          onClick={onSave}
          className={`w-full md:w-auto px-4 py-2.5 rounded-xl text-sm font-semibold text-white
            bg-gradient-to-r from-amber-400 to-amber-700 hover:from-amber-500 hover:to-amber-800
            shadow-sm active:translate-y-[1px]`}
        >
          Save Settings
        </button>
      </div>
    </main>
  );
}