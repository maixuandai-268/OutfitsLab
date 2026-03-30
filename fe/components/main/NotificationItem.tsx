'use client';

import React from 'react';
import { 
  CheckCircleFilled, 
  InfoCircleFilled, 
  ExclamationCircleFilled, 
  CloseCircleFilled 
} from '@ant-design/icons';

interface NotificationItemProps {
  notification: {
    id: number;
    message: string;
    type: 'success' | 'info' | 'warning' | 'error';
    isRead: boolean;
    createdAt: string;
  };
  onRead: (id: number) => void;
}

export default function NotificationItem({ notification, onRead }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'success': return <CheckCircleFilled className="text-green-500 text-lg" />;
      case 'warning': return <ExclamationCircleFilled className="text-orange-500 text-lg" />;
      case 'error': return <CloseCircleFilled className="text-red-500 text-lg" />;
      default: return <InfoCircleFilled className="text-blue-500 text-lg" />;
    }
  };

  // Helper đơn giản định dạng thời gian
  const timeAgo = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diff < 60) return 'Vừa xong';
    if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
    if (diff < 2592000) return `${Math.floor(diff / 86400)} ngày trước`;
    return date.toLocaleDateString('vi-VN');
  };

  return (
    <div 
      onClick={() => !notification.isRead && onRead(notification.id)}
      className={`p-4 border-b border-gray-50 flex gap-3 cursor-pointer transition-colors ${
        notification.isRead ? 'bg-white' : 'bg-blue-50/30 font-medium hover:bg-blue-50/50'
      }`}
    >
      <div className="mt-1 flex-shrink-0">
        {getIcon()}
      </div>
      <div className="flex-1">
        <p className={`text-sm leading-relaxed ${notification.isRead ? 'text-gray-600' : 'text-gray-900'}`}>
          {notification.message}
        </p>
        <p className="text-[11px] text-gray-400 mt-1 uppercase tracking-wider">
          {timeAgo(notification.createdAt)}
        </p>
      </div>
      {!notification.isRead && (
        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 self-start flex-shrink-0" />
      )}
    </div>
  );
}
