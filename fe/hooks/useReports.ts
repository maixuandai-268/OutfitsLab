'use client';

import { useCallback, useEffect, useState } from 'react';
import { reportAPI, Report } from '@/lib/api/reports';

interface UseReportsOptions {
    autoFetch?: boolean;
    userId?: number;
}

interface UseReportsReturn {
    reports: Report[];
    loading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
    isRefetching: boolean;
}

/**
 * Hook để fetch và quản lý danh sách reports
 * @param options - Cấu hình hook
 * @returns Reports data, loading state, error, và refetch function
 */
export const useReports = (
    token: string | null | undefined,
    options: UseReportsOptions = { autoFetch: true }
): UseReportsReturn => {
    const [reports, setReports] = useState<Report[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const [isRefetching, setIsRefetching] = useState(false);

    const fetchReports = useCallback(async () => {
        if (!token) {
            setReports([]);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            const data = options.userId
                ? await reportAPI.getReportsByUser(options.userId, token)
                : await reportAPI.getReports(token);

            setReports(data);
        } catch (err) {
            const error = err instanceof Error ? err : new Error('Unknown error');
            setError(error);
            console.error('Failed to fetch reports:', error);
        } finally {
            setLoading(false);
        }
    }, [token, options.userId]);

    const refetch = useCallback(async () => {
        try {
            setIsRefetching(true);
            await fetchReports();
        } finally {
            setIsRefetching(false);
        }
    }, [fetchReports]);

    // Auto fetch khi component mount hoặc token thay đổi
    useEffect(() => {
        if (options.autoFetch) {
            fetchReports();
        }
    }, [fetchReports, options.autoFetch]);

    return {
        reports,
        loading,
        error,
        refetch,
        isRefetching,
    };
};
