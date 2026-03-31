// Report API Types
export interface CreateReportPayload {
    title: string;
    description: string;
    level: 'error' | 'warning' | 'info';
    target: 'all' | 'shop' | 'user';
    targetId?: string | null;
    userId?: number;
}

export interface Report extends CreateReportPayload {
    id: number;
    userId: number;
    status: 'pending' | 'in_progress' | 'resolved' | 'rejected';
    createdAt: string;
    handledBy?: number;
    handledAt?: string;
    note?: string;
}

export interface ReportListResponse {
    data: Report[];
    total: number;
    page: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://outfitslab.onrender.com';

export const reportAPI = {
    /**
     * Tạo report mới
     */
    createReport: async (payload: CreateReportPayload, token?: string): Promise<Report> => {
        const response = await fetch(`${API_BASE}/api/reports`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify(payload),
        });

        if (!response.ok) {
            throw new Error(`Failed to create report: ${response.statusText}`);
        }

        return response.json();
    },

    /**
     * Lấy tất cả reports
     */
    getReports: async (token?: string): Promise<Report[]> => {
        const response = await fetch(`${API_BASE}/api/reports`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch reports: ${response.statusText}`);
        }

        const data = await response.json();
        // Nếu API trả về array trực tiếp
        return Array.isArray(data) ? data : data.data || [];
    },

    /**
     * Lấy reports của user cụ thể
     */
    getReportsByUser: async (userId: number, token?: string): Promise<Report[]> => {
        const response = await fetch(`${API_BASE}/api/reports/user/${userId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch user reports: ${response.statusText}`);
        }

        const data = await response.json();
        return Array.isArray(data) ? data : data.data || [];
    },

    /**
     * Lấy report theo ID
     */
    getReportById: async (id: number, token?: string): Promise<Report> => {
        const response = await fetch(`${API_BASE}/api/reports/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch report: ${response.statusText}`);
        }

        return response.json();
    },

    /**
     * Cập nhật status của report
     */
    updateReportStatus: async (
        id: number,
        status: 'pending' | 'resolved' | 'rejected',
        token?: string
    ): Promise<Report> => {
        const response = await fetch(`${API_BASE}/api/reports/${id}/status`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ status }),
        });

        if (!response.ok) {
            throw new Error(`Failed to update report status: ${response.statusText}`);
        }

        return response.json();
    },

    /**
     * Xóa report
     */
    deleteReport: async (id: number, token?: string): Promise<void> => {
        const response = await fetch(`${API_BASE}/api/reports/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
        });

        if (!response.ok) {
            throw new Error(`Failed to delete report: ${response.statusText}`);
        }
    },

    /**
     * Nhận xử lý report (PENDING -> IN_PROGRESS)
     */
    takeReport: async (id: number, token: string): Promise<Report> => {
        if (!token) {
            throw new Error('No token provided');
        }

        const url = `${API_BASE}/api/reports/${id}/take`;

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`, // 🔥 luôn luôn gửi
            },
        });

        if (!response.ok) {
            let errorMessage = `Failed to take report: ${response.statusText}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch { }

            throw new Error(errorMessage);
        }

        return response.json();
    },

    /**
     * Xử lý report (IN_PROGRESS -> RESOLVED/REJECTED)
     */
    handleReport: async (
        id: number,
        action: 'resolved' | 'rejected',
        note: string,
        token?: string
    ): Promise<Report> => {
        const url = `${API_BASE}/api/reports/${id}/handle`;
        console.log('Handling report:', { id, action, note: note.substring(0, 50) + '...', url });

        const response = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                ...(token && { Authorization: `Bearer ${token}` }),
            },
            body: JSON.stringify({ action, note }),
        });

        console.log('Handle report response:', { status: response.status, ok: response.ok });

        if (!response.ok) {
            let errorMessage = `Failed to handle report: ${response.statusText}`;
            try {
                const errorData = await response.json();
                errorMessage = errorData.message || errorMessage;
            } catch {
                // Fallback to status text if response is not JSON
            }
            console.error('Handle report error:', errorMessage);
            throw new Error(errorMessage);
        }

        return response.json();
    },
};
