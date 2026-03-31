'use client';

import { Report } from '@/lib/api/reports';
import { reportAPI } from '@/lib/api/reports';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { message, Spin } from 'antd';
import { useState } from 'react';
import HandleReportModal from './HandleReportModal';

interface ReportListProps {
    report: Report[];
    loading: boolean;
    error?: Error | null;
    onRefresh?: () => void;
    dark?: boolean;
    token?: string;
    selectedStatus?: "ALL" | "pending" | "in_progress" | "resolved" | "rejected";
}

function getLevelColor(level: string): { bg: string; text: string; label: string } {
    const map: Record<string, { bg: string; text: string; label: string }> = {
        error: { bg: 'bg-red-100', text: 'text-red-700', label: 'Lỗi' },
        warning: { bg: 'bg-amber-100', text: 'text-amber-700', label: 'Cảnh báo' },
        info: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Thông báo' },
    };
    return map[level] || map.info;
}

function getStatusColor(status: string): { bg: string; text: string; label: string } {
    const map: Record<string, { bg: string; text: string; label: string }> = {
        pending: { bg: 'bg-yellow-100', text: 'text-yellow-700', label: 'Chờ xử lý' },
        in_progress: { bg: 'bg-blue-100', text: 'text-blue-700', label: 'Đang xử lý' },
        resolved: { bg: 'bg-green-100', text: 'text-green-700', label: 'Đã giải quyết' },
        rejected: { bg: 'bg-red-100', text: 'text-red-700', label: 'Từ chối' },
    };
    return map[status] || map.pending;
}

function getTargetLabel(target: string, targetId?: string | null): string {
    const map: Record<string, string> = {
        all: '🌐 Toàn hệ thống',
        shop: '🏪 Cửa hàng',
        user: '👤 Người dùng',
    };
    const label = map[target] || target;
    return targetId ? `${label} (ID: ${targetId})` : label;
}

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Vừa xong';
    if (diffMins < 60) return `${diffMins} phút trước`;
    if (diffHours < 24) return `${diffHours} giờ trước`;
    if (diffDays < 7) return `${diffDays} ngày trước`;

    return date.toLocaleDateString('vi-VN');
}

export default function ReportList({
    report,
    loading,
    error,
    onRefresh,
    dark = false,
    token,
    selectedStatus = "ALL",
}: ReportListProps) {
    const [expandedId, setExpandedId] = useState<number | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedReport, setSelectedReport] = useState<Report | null>(null);
    const [takingReportId, setTakingReportId] = useState<number | null>(null);

    const filteredReports = selectedStatus === "ALL"
        ? report
        : report.filter(r => r.status === selectedStatus);

    const handleTakeReport = async (reportId: number) => {
        if (!token) {
            message.error('Vui lòng đăng nhập');
            return;
        }

        try {
            console.log(`Attempting to take report ${reportId}, token: ${token ? '✓' : '✗'}`);
            setTakingReportId(reportId);
            await reportAPI.takeReport(reportId, token);
            message.success('Nhận xử lý báo cáo thành công');
            onRefresh?.();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Lỗi khi nhận xử lý báo cáo';
            console.error('Take report failed:', errorMessage);
            message.error(errorMessage);
        } finally {
            setTakingReportId(null);
        }
    };

    const handleOpenModal = (r: Report) => {
        if (r.status !== 'in_progress') {
            message.error('Chỉ có thể xử lý báo cáo đang được xử lý');
            return;
        }
        setSelectedReport(r);
        setModalOpen(true);
    };

    const handleModalClose = () => {
        setModalOpen(false);
        setSelectedReport(null);
    };

    const handleModalSuccess = () => {
        handleModalClose();
        onRefresh?.();
    };

    if (loading && report.length === 0) {
        return (
            <div className={`rounded-2xl border ${dark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-6`}>
                <div className="flex items-center justify-center gap-3">
                    <svg className="animate-spin w-5 h-5 text-indigo-600" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    <p className={dark ? 'text-gray-400' : 'text-gray-600'}>Đang tải báo cáo...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className={`rounded-2xl border border-red-200 ${dark ? 'bg-red-950' : 'bg-red-50'} p-6`}>
                <div className="flex items-start gap-3">
                    <ExclamationCircleOutlined className={dark ? 'text-red-400' : 'text-red-600'} />
                    <div>
                        <p className={`font-semibold ${dark ? 'text-red-400' : 'text-red-700'}`}>Lỗi tải dữ liệu</p>
                        <p className={`text-sm ${dark ? 'text-red-300' : 'text-red-600'}`}>{error.message}</p>
                        {onRefresh && (
                            <button
                                onClick={onRefresh}
                                className={`mt-2 text-sm font-semibold underline ${dark ? 'text-red-400 hover:text-red-300' : 'text-red-600 hover:text-red-700'}`}
                            >
                                Thử lại
                            </button>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    if (filteredReports.length === 0) {
        return (
            <div className={`rounded-2xl border ${dark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'} p-12 text-center`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className={`w-12 h-12 mx-auto mb-3 ${dark ? 'text-gray-500' : 'text-gray-400'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className={`text-sm font-semibold ${dark ? 'text-gray-400' : 'text-gray-600'}`}>Không có báo cáo</p>
                <p className={`text-xs ${dark ? 'text-gray-500' : 'text-gray-500'} mt-1`}>Hiện tại không có báo cáo nào phù hợp với lựa chọn của bạn</p>
            </div>
        );
    }

    return (
        <div className="space-y-3">
            {filteredReports.map((report) => {
                const levelColor = getLevelColor(report.level);
                const statusColor = getStatusColor(report.status);
                const isExpanded = expandedId === report.id;

                return (
                    <div
                        key={report.id}
                        className={`rounded-xl border transition-all ${dark
                            ? isExpanded
                                ? 'border-indigo-500 bg-gray-750'
                                : 'border-gray-700 bg-gray-800 hover:border-gray-600'
                            : isExpanded
                                ? 'border-indigo-300 bg-indigo-50'
                                : 'border-gray-200 bg-white hover:border-gray-300'
                            }`}
                    >
                        <button
                            onClick={() => setExpandedId(isExpanded ? null : report.id)}
                            className="w-full p-4 flex items-start gap-3 text-left"
                        >
                            <div className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-bold ${levelColor.bg} ${levelColor.text}`}>
                                {levelColor.label}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between gap-3">
                                    <div>
                                        <h3 className={`font-bold text-sm ${dark ? 'text-gray-100' : 'text-gray-900'}`}>
                                            {report.title}
                                        </h3>
                                        <p className={`text-xs mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                                            {getTargetLabel(report.target, report.targetId)}
                                        </p>
                                    </div>

                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${statusColor.bg} ${statusColor.text}`}>
                                            {statusColor.label}
                                        </span>
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                            className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''} ${dark ? 'text-gray-500' : 'text-gray-400'}`}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </button>
                        {isExpanded && (
                            <div className={`border-t ${dark ? 'border-gray-700 px-4 py-3' : 'border-gray-200 px-4 py-3'} bg-opacity-50`}>
                                <div className="space-y-3">
                                    <div>
                                        <p className={`text-xs font-bold uppercase tracking-wide ${dark ? 'text-gray-500' : 'text-gray-600'}`}>
                                            Mô tả
                                        </p>
                                        <p className={`text-sm mt-1 leading-relaxed ${dark ? 'text-gray-300' : 'text-gray-700'}`}>
                                            {report.description}
                                        </p>
                                    </div>

                                    <div className="grid grid-cols-2 gap-3 pt-2">
                                        <div>
                                            <p className={`text-xs font-bold uppercase tracking-wide ${dark ? 'text-gray-500' : 'text-gray-600'}`}>
                                                ID
                                            </p>
                                            <p className={`text-xs font-mono mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                #{report.id}
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-xs font-bold uppercase tracking-wide ${dark ? 'text-gray-500' : 'text-gray-600'}`}>
                                                Người gửi
                                            </p>
                                            <p className={`text-xs font-mono mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                User #{report.userId}
                                            </p>
                                        </div>
                                        <div>
                                            <p className={`text-xs font-bold uppercase tracking-wide ${dark ? 'text-gray-500' : 'text-gray-600'}`}>
                                                Gửi lúc
                                            </p>
                                            <p className={`text-xs mt-1 ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                                                {formatDate(report.createdAt)}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex gap-2 pt-3 border-t border-gray-200">
                                    {report.status === 'pending' && (
                                        <button
                                            onClick={() => handleTakeReport(report.id)}
                                            disabled={takingReportId === report.id}
                                            className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${takingReportId === report.id
                                                ? 'opacity-50 cursor-not-allowed'
                                                : dark
                                                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                                                    : 'bg-blue-600 text-white hover:bg-blue-700'
                                                }`}
                                        >
                                            {takingReportId === report.id ? (
                                                <span className="inline-flex items-center gap-1">
                                                    <Spin size="small" /> Đang xử lý...
                                                </span>
                                            ) : (
                                                '📥 Nhận xử lý'
                                            )}
                                        </button>
                                    )}

                                    {report.status === 'in_progress' && (
                                        <button
                                            onClick={() => handleOpenModal(report)}
                                            className={`flex-1 px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${dark
                                                ? 'bg-green-600 text-white hover:bg-green-700'
                                                : 'bg-green-600 text-white hover:bg-green-700'
                                                }`}
                                        >
                                            ✓ Xử lý
                                        </button>
                                    )}

                                    {(report.status === 'resolved' || report.status === 'rejected') && (
                                        <div className="flex-1 px-3 py-2 rounded-lg text-xs font-semibold bg-gray-200 text-gray-600 text-center">
                                            ✓ Đã xử lý xong
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                );
            })}

            <HandleReportModal
                report={selectedReport}
                open={modalOpen}
                onClose={handleModalClose}
                onSuccess={handleModalSuccess}
                token={token}
            />

            {onRefresh && (
                <div className="flex justify-center pt-2">
                    <button
                        onClick={onRefresh}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition-colors ${dark
                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                            : 'bg-indigo-600 text-white hover:bg-indigo-700'
                            }`}
                    >
                        Refresh
                    </button>
                </div>
            )}
        </div>
    );
}
