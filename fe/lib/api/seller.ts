// Seller API service - reusable across components

export interface Shop {
    id: number;
    shop_name: string;
    contact_email: string;
    status: "pending" | "approved" | "Blocked";
    description: string;
    created_at: string;
    ownerId: number;
}

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'https://outfitslab.onrender.com';

export const sellerAPI = {

    getShops: async (): Promise<Shop[]> => {
        try {
            const res = await fetch(`${API_BASE}/api/shops`);
            if (!res.ok) {
                throw new Error(`Failed to fetch shops: ${res.statusText}`);
            }
            const data = await res.json();
            return Array.isArray(data) ? data : [];
        } catch (error) {
            console.error('Error fetching shops:', error);
            return [];
        }
    },


    getApprovedShopsCount: async (): Promise<number> => {
        const shops = await sellerAPI.getShops();
        return shops.filter((shop) => shop.status === 'approved').length;
    },


    getApprovedShopsWithGrowth: async (): Promise<{ currentCount: number; percentChange: number }> => {
        const shops = await sellerAPI.getShops();
        const approvedShops = shops.filter((shop) => shop.status === 'approved');

        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
        const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

        const currentCount = approvedShops.filter((shop) => {
            const createdDate = new Date(shop.created_at);
            return createdDate.getMonth() === currentMonth && createdDate.getFullYear() === currentYear;
        }).length;

        const prevCount = approvedShops.filter((shop) => {
            const createdDate = new Date(shop.created_at);
            return createdDate.getMonth() === prevMonth && createdDate.getFullYear() === prevYear;
        }).length;

        let percentChange = 0;
        if (prevCount === 0) {
            percentChange = currentCount > 0 ? 100 : 0;
        } else {
            percentChange = ((currentCount - prevCount) / prevCount) * 100;
        }

        console.log(`Approved shops - Current: ${currentCount}, Previous: ${prevCount}, Change: ${percentChange.toFixed(1)}%`);

        return {
            currentCount,
            percentChange: Math.round(percentChange),
        };
    },

    getShopsCountByStatus: async (status: 'pending' | 'approved' | 'Blocked'): Promise<number> => {
        const shops = await sellerAPI.getShops();
        return shops.filter((shop) => shop.status === status).length;
    },

    approveShop: async (id: number): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE}/api/shops/${id}/approve`, {
                method: 'PATCH',
            });
            return res.ok;
        } catch (error) {
            console.error('Error approving shop:', error);
            return false;
        }
    },

    rejectShop: async (id: number): Promise<boolean> => {
        try {
            const res = await fetch(`${API_BASE}/api/shops/${id}/reject`, {
                method: 'PATCH',
            });
            return res.ok;
        } catch (error) {
            console.error('Error rejecting shop:', error);
            return false;
        }
    },
};
