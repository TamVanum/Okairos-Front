import create from 'zustand';
import axiosInstance from '../api/AxiosInstance'; // Adjust the path as needed

const usePlantMetricsStore = create((set) => ({
  plantMetricData: [],
  loading: false,
  error: null,

  fetchPlantMetricsData: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/plant-metric/me');
      const dataWithKeys = response.data.map((item, index) => ({
        ...item,
        key: index + 1,
      }));
      set({ plantMetricData: dataWithKeys, loading: false });
    } catch (error) {
      set({ error, loading: false });
    }
  },
}));

export default usePlantMetricsStore;