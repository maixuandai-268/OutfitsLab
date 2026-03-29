'use client';

import { Report } from '@/lib/api/reports';
import { reportAPI } from '@/lib/api/reports';
import { Modal, Form, Input, Select, Button, message } from 'antd';
import { useState } from 'react';

interface HandleReportModalProps {
    report: Report | null;
    open: boolean;
    onClose: () => void;
    onSuccess: () => void;
    token?: string;
}

export default function HandleReportModal({
    report,
    open,
    onClose,
    onSuccess,
    token,
}: HandleReportModalProps) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values: { action: string; note: string }) => {
        if (!report || !token) return;

        try {
            setLoading(true);
            await reportAPI.handleReport(report.id, values.action as 'resolved' | 'rejected', values.note, token);
            message.success('Xử lý báo cáo thành công');
            form.resetFields();
            onClose();
            onSuccess();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Lỗi khi xử lý báo cáo';
            message.error(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            title="Xử lý báo cáo"
            open={open}
            onCancel={handleCancel}
            centered
            footer={[
                <Button key="cancel" onClick={handleCancel}>
                    Hủy
                </Button>,
                <Button
                    key="submit"
                    type="primary"
                    loading={loading}
                    onClick={() => form.submit()}
                >
                    Xác nhận
                </Button>,
            ]}
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                autoComplete="off"
            >
                <Form.Item
                    label="Hành động"
                    name="action"
                    rules={[{ required: true, message: 'Vui lòng chọn hành động' }]}
                >
                    <Select
                        placeholder="Chọn hành động"
                        options={[
                            { label: '✅ Đã giải quyết', value: 'resolved' },
                            { label: '❌ Từ chối', value: 'rejected' },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="Ghi chú"
                    name="note"
                    rules={[
                        { required: true, message: 'Vui lòng nhập ghi chú' },
                        { min: 5, message: 'Ghi chú phải có ít nhất 5 ký tự' },
                    ]}
                >
                    <Input.TextArea
                        placeholder="Nhập ghi chú về quyết định xử lý..."
                        rows={4}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}
