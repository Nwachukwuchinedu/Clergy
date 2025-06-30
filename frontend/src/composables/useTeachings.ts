import { ref } from "vue";
import axios from "axios";
import type { Teaching, CreateTeachingData } from "@/types";

const teachings = ref<Teaching[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

export const useTeachings = () => {
  const fetchTeachings = async () => {
    loading.value = true;
    error.value = null;

    try {
      // Use real API call
      const response = await axios.get(
        "https://rev-thomas.onrender.com/api/teachings/"
      );
      // Map _id to id for frontend compatibility
      teachings.value = response.data.map((t: any) => ({ ...t, id: t._id }));
    } catch (err) {
      error.value = "Failed to fetch teachings";
      console.error("Error fetching teachings:", err);
    } finally {
      loading.value = false;
    }
  };

  const getTeaching = async (id: string): Promise<Teaching | null> => {
    try {
      // Use real API call
      const response = await axios.get(
        `https://rev-thomas.onrender.com/api/teachings/${id}`
      );
      // Map _id to id
      const teaching = { ...response.data, id: response.data._id };
      return teaching;
    } catch (err) {
      error.value = "Failed to fetch teaching";
      console.error("Error fetching teaching:", err);
      return null;
    }
  };

  const createTeaching = async (data: CreateTeachingData): Promise<boolean> => {
    loading.value = true;
    error.value = null;
    try {
      // Use real API call
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("body", data.body);
      if (data.image instanceof File) formData.append("image", data.image);
      if (data.youtubeUrl) formData.append("youtubeUrl", data.youtubeUrl);

      const response = await axios.post(
        "https://rev-thomas.onrender.com/api/teachings/",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      // Optionally, update teachings list with new teaching from response
      if (response.data && response.data.data) {
        teachings.value.unshift(response.data.data);
      }
      return true;
    } catch (err) {
      error.value = "Failed to create teaching";
      console.error("Error creating teaching:", err);
      return false;
    } finally {
      loading.value = false;
    }
  };

  const searchTeachings = (query: string) => {
    if (!query.trim()) return teachings.value;

    const lowercaseQuery = query.toLowerCase();
    return teachings.value.filter(
      (teaching) =>
        teaching.title.toLowerCase().includes(lowercaseQuery) ||
        teaching.body.toLowerCase().includes(lowercaseQuery)
    );
  };

  return {
    teachings,
    loading,
    error,
    fetchTeachings,
    getTeaching,
    createTeaching,
    searchTeachings,
  };
};
