'use client';

import { useState } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

type AlertLevel = 'error' | 'warning' | 'info';
type AlertTarget = 'all' | 'shop' | 'user';

interface AlertForm {
    title: string;
    level: AlertLevel;
    description: string;
    target: AlertTarget;
    targetId: string;
}

const INITIAL_FORM: AlertForm = {
    title: '',
    level: 'warning',
    description: '',
    target: 'all',
    targetId: '',
};

// ─── Config ───────────────────────────────────────────────────────────────────

const LEVEL_CONFIG = {
    error: {
        label: 'Lỗi nghiêm trọng',
        color: '#ef4444',
        bg: '#fef2f2',
        border: '#fecaca',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
            </svg>
        ),
    },
    warning: {
        label: 'Cảnh báo',
        color: '#f59e0b',
        bg: '#fffbeb',
        border: '#fde68a',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
        ),
    },
    info: {
        label: 'Thông báo',
        color: '#3b82f6',
        bg: '#eff6ff',
        border: '#bfdbfe',
        icon: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
            </svg>
        ),
    },
};

const TARGET_CONFIG = {
    all: { label: 'Toàn hệ thống', icon: '🌐' },
    shop: { label: 'Cửa hàng cụ thể', icon: '🏪' },
    user: { label: 'Người dùng cụ thể', icon: '👤' },
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function AlertButton() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<AlertForm>(INITIAL_FORM);
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!form.title.trim() || !form.description.trim()) return;
        setLoading(true);

        // ── Wire API tại đây ──────────────────────────────────────────
        // await fetch('http://localhost:3000/api/alerts', {
        //   method: 'POST',
        //   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
        //   body: JSON.stringify(form),
        // });
        // ─────────────────────────────────────────────────────────────

        await new Promise(r => setTimeout(r, 800)); // giả lập delay
        setLoading(false);
        setSubmitted(true);
        setTimeout(() => {
            setSubmitted(false);
            setOpen(false);
            setForm(INITIAL_FORM);
        }, 1800);
    };

    const cfg = LEVEL_CONFIG[form.level];

    return (
        <>
            {/* ── Overlay ── */}
            {open && (
                <div
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]"
                    onClick={() => setOpen(false)}
                />
            )}

            {/* ── Floating Panel ── */}
            <div
                className="fixed bottom-24 right-6 z-50 transition-all duration-300"
                style={{
                    opacity: open ? 1 : 0,
                    transform: open ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.97)',
                    pointerEvents: open ? 'auto' : 'none',
                }}
            >
                <div className="w-[380px] rounded-2xl shadow-2xl overflow-hidden"
                    style={{ border: '1.5px solid #e5e7eb', background: '#fff' }}>

                    {/* Header */}
                    <div className="px-5 py-4 flex items-center justify-between"
                        style={{ background: cfg.bg, borderBottom: `1.5px solid ${cfg.border}` }}>
                        <div className="flex items-center gap-2">
                            <span style={{ color: cfg.color }}>{cfg.icon}</span>
                            <span className="font-bold text-sm" style={{ color: cfg.color }}>
                                Tạo cảnh báo hệ thống
                            </span>
                        </div>
                        <button onClick={() => setOpen(false)}
                            className="text-gray-400 hover:text-gray-600 transition-colors">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {submitted ? (
                        // ── Success State ──
                        <div className="px-5 py-10 flex flex-col items-center gap-3">
                            <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center">
                                <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth={2.5} className="w-7 h-7">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                                </svg>
                            </div>
                            <p className="font-bold text-slate-700">Đã gửi cảnh báo!</p>
                            <p className="text-xs text-gray-400">Hệ thống đang xử lý...</p>
                        </div>
                    ) : (
                        // ── Form ──
                        <div className="px-5 py-4 space-y-4">

                            {/* Tiêu đề */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    Tiêu đề cảnh báo <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Nhập tiêu đề..."
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none transition-all"
                                    style={{
                                        border: `1.5px solid ${form.title ? cfg.color + '66' : '#e5e7eb'}`,
                                        background: form.title ? cfg.bg : '#f9fafb',
                                    }}
                                />
                            </div>

                            {/* Mức độ */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    Mức độ
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(Object.keys(LEVEL_CONFIG) as AlertLevel[]).map(level => {
                                        const lc = LEVEL_CONFIG[level];
                                        const active = form.level === level;
                                        return (
                                            <button
                                                key={level}
                                                onClick={() => setForm(f => ({ ...f, level }))}
                                                className="flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-bold transition-all"
                                                style={{
                                                    background: active ? lc.bg : '#f9fafb',
                                                    border: `1.5px solid ${active ? lc.color : '#e5e7eb'}`,
                                                    color: active ? lc.color : '#6b7280',
                                                }}
                                            >
                                                <span style={{ color: lc.color }}>{lc.icon}</span>
                                                {lc.label}
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Đối tượng nhận */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    Đối tượng nhận
                                </label>
                                <div className="grid grid-cols-3 gap-2">
                                    {(Object.keys(TARGET_CONFIG) as AlertTarget[]).map(target => {
                                        const tc = TARGET_CONFIG[target];
                                        const active = form.target === target;
                                        return (
                                            <button
                                                key={target}
                                                onClick={() => setForm(f => ({ ...f, target, targetId: '' }))}
                                                className="flex flex-col items-center gap-1 py-2.5 rounded-xl text-xs font-bold transition-all"
                                                style={{
                                                    background: active ? cfg.bg : '#f9fafb',
                                                    border: `1.5px solid ${active ? cfg.color : '#e5e7eb'}`,
                                                    color: active ? cfg.color : '#6b7280',
                                                }}
                                            >
                                                <span className="text-base">{tc.icon}</span>
                                                {tc.label}
                                            </button>
                                        );
                                    })}
                                </div>

                                {/* Input ID nếu chọn shop/user */}
                                {form.target !== 'all' && (
                                    <input
                                        type="text"
                                        placeholder={form.target === 'shop' ? 'Nhập Shop ID...' : 'Nhập User ID...'}
                                        value={form.targetId}
                                        onChange={e => setForm(f => ({ ...f, targetId: e.target.value }))}
                                        className="mt-2 w-full px-3 py-2.5 rounded-xl text-sm outline-none"
                                        style={{ border: `1.5px solid #e5e7eb`, background: '#f9fafb' }}
                                    />
                                )}
                            </div>

                            {/* Nội dung */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase tracking-wide">
                                    Nội dung mô tả <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    rows={3}
                                    placeholder="Mô tả chi tiết cảnh báo..."
                                    value={form.description}
                                    onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                                    className="w-full px-3 py-2.5 rounded-xl text-sm outline-none resize-none transition-all"
                                    style={{
                                        border: `1.5px solid ${form.description ? cfg.color + '66' : '#e5e7eb'}`,
                                        background: form.description ? cfg.bg : '#f9fafb',
                                    }}
                                />
                            </div>

                            {/* Submit */}
                            <button
                                onClick={handleSubmit}
                                disabled={loading || !form.title.trim() || !form.description.trim()}
                                className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all flex items-center justify-center gap-2"
                                style={{
                                    background: (!form.title.trim() || !form.description.trim())
                                        ? '#d1d5db'
                                        : cfg.color,
                                    cursor: (!form.title.trim() || !form.description.trim()) ? 'not-allowed' : 'pointer',
                                }}
                            >
                                {loading ? (
                                    <>
                                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                                        </svg>
                                        Đang gửi...
                                    </>
                                ) : (
                                    <>
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                                        </svg>
                                        Gửi cảnh báo
                                    </>
                                )}
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* ── Floating Button ── */}
            <button
                onClick={() => setOpen(o => !o)}
                className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95"
                style={{
                    background: open ? '#1e293b' : '#f59e0b',
                    boxShadow: open
                        ? '0 8px 32px rgba(30,41,59,0.35)'
                        : '0 8px 32px rgba(245,158,11,0.45)',
                }}
                title="Tạo cảnh báo hệ thống"
            >
                {open ? (
                    <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2.5} className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                        <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003zM12 8.25a.75.75 0 01.75.75v3.75a.75.75 0 01-1.5 0V9a.75.75 0 01.75-.75zm0 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                    </svg>
                )}
            </button>
        </>
    );
}