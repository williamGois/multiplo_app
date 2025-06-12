import { useState, useEffect, useCallback } from 'react';
import { Patient } from '../types/Patient';
import { PatientService } from '../services/PatientService';

interface UsePatientsState {
  patients: Patient[];
  loading: boolean;
  refreshing: boolean;
  loadingMore: boolean;
  hasMore: boolean;
  error: string | null;
}

interface UsePatientsActions {
  loadMore: () => Promise<void>;
  refresh: () => Promise<void>;
  search: (term: string) => Promise<void>;
  clearSearch: () => void;
}

export const usePatients = (): UsePatientsState & UsePatientsActions => {
  const [state, setState] = useState<UsePatientsState>({
    patients: [],
    loading: true,
    refreshing: false,
    loadingMore: false,
    hasMore: true,
    error: null,
  });

  const [lastDoc, setLastDoc] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const loadPatients = useCallback(async (
    isRefresh: boolean = false,
    isloadMore: boolean = false
  ) => {
    try {
      setState(prev => ({
        ...prev,
        loading: !isRefresh && !isloadMore && prev.patients.length === 0,
        refreshing: isRefresh,
        loadingMore: isloadMore,
        error: null,
      }));

      const currentLastDoc = isRefresh ? null : lastDoc;
      const response = await PatientService.getPatients(currentLastDoc, searchTerm);

      setState(prev => ({
        ...prev,
        patients: isRefresh || !isloadMore 
          ? response.data 
          : [...prev.patients, ...response.data],
        hasMore: response.hasMore,
        loading: false,
        refreshing: false,
        loadingMore: false,
      }));

      setLastDoc(response.lastDoc);
    } catch (error) {
      setState(prev => ({
        ...prev,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        loading: false,
        refreshing: false,
        loadingMore: false,
      }));
    }
  }, [lastDoc, searchTerm]);

  const loadMore = useCallback(async () => {
    if (state.loadingMore || !state.hasMore || state.loading) return;
    await loadPatients(false, true);
  }, [state.loadingMore, state.hasMore, state.loading, loadPatients]);

  const refresh = useCallback(async () => {
    setLastDoc(null);
    await loadPatients(true, false);
  }, [loadPatients]);

  const search = useCallback(async (term: string) => {
    setSearchTerm(term);
    setLastDoc(null);
    setState(prev => ({ ...prev, patients: [] }));
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
    setLastDoc(null);
    setState(prev => ({ ...prev, patients: [] }));
  }, []);

  useEffect(() => {
    loadPatients();
  }, [searchTerm]);

  return {
    ...state,
    loadMore,
    refresh,
    search,
    clearSearch,
  };
}; 