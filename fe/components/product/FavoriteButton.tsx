'use client';
import { useState, useCallback, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Heart } from 'lucide-react';

const API_BASE = 'https://outfitslab.onrender.com/api';

interface FavoriteButtonProps {
    targetId: number;
    type?: 'product' | 'shop';
    className?: string;
    onToggleFavourite?: (targetId: number, isFavourite: boolean) => void;
}

export function FavoriteButton({ 
    targetId, 
    type = 'product', 
    className, 
    onToggleFavourite 
}: FavoriteButtonProps) {
    const { token } = useAuth();
    const [isFavourite, setIsFavourite] = useState(false);
    const [loading, setLoading] = useState(false);

    const checkFavourite = useCallback(async () => {
        if (!token || !targetId) return;
        try {
            const res = await fetch(`${API_BASE}/favourite/${type}s/${targetId}/check`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setIsFavourite(data.isFavourite);
            }
        } catch { }
    }, [token, targetId, type]);

    useEffect(() => { checkFavourite(); }, [checkFavourite]);

    const handleToggle = async (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!token) return;
        setLoading(true);
        try {
            const res = await fetch(`${API_BASE}/favourite/${type}s/${targetId}/toggle`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` },
            });
            if (res.ok) {
                const data = await res.json();
                setIsFavourite(data.isFavourite);
                if (onToggleFavourite) {
                    onToggleFavourite(targetId, data.isFavourite);
                }
            }
        } catch { }
        finally { setLoading(false); }
    };

    return (
        <button
            onClick={handleToggle}
            disabled={!token || loading}
            type="button"
            title={!token ? 'Đăng nhập để thả tim' : isFavourite ? 'Bỏ tim' : 'Thả tim'}
            className={`p-2 rounded-full backdrop-blur-md bg-white/70 shadow-sm transition flex items-center justify-center ${
                !token ? 'opacity-50 cursor-not-allowed' : 'hover:bg-rose-50 cursor-pointer'
            } ${className || ''}`}
        >
            {loading ? (
                <div className="w-4 h-4 border-2 border-rose-400 border-t-transparent rounded-full animate-spin" />
            ) : (
                <Heart 
                   className={`w-4 h-4 transition-colors ${isFavourite ? 'fill-rose-500 text-rose-500' : 'text-gray-500'}`} 
                />
            )}
        </button>
    );
}
