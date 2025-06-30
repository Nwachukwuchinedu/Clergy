import { ref } from "vue";
import axios from "axios";
import type { Teaching, CreateTeachingData } from "@/types";

const teachings = ref<Teaching[]>([]);
const loading = ref(false);
const error = ref<string | null>(null);

// Mock data for demo
const mockTeachings: Teaching[] = [
  {
    id: "1",
    title: "Walking in Faith During Difficult Times",
    body: '<p>In times of trial and uncertainty, our faith becomes our anchor. This teaching explores how we can maintain our trust in God even when circumstances seem overwhelming...</p><p>The Bible tells us in Hebrews 11:1 that "faith is confidence in what we hope for and assurance about what we do not see." This powerful verse reminds us that faith is not based on our current circumstances, but on God\'s unchanging character.</p>',
    excerpt:
      "Learn how to maintain faith during life's most challenging moments and find strength in God's promises.",
    image:
      "https://images.pexels.com/photos/1831234/pexels-photo-1831234.jpeg?auto=compress&cs=tinysrgb&w=800",
    youtubeUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    title: "The Power of Prayer in Daily Life",
    body: "<p>Prayer is not just a religious ritual, but a powerful conversation with our Creator. In this teaching, we explore how daily prayer can transform our hearts and minds...</p><p>Jesus taught us in Matthew 6:9-13 the Lord's Prayer, which serves as a model for our own conversations with God. This prayer encompasses worship, submission, petition, and forgiveness.</p>",
    excerpt:
      "Discover how to develop a meaningful prayer life that brings peace and guidance to your daily journey.",
    createdAt: "2024-01-10T14:20:00Z",
    updatedAt: "2024-01-10T14:20:00Z",
  },
  {
    id: "3",
    title: "Love Your Neighbor: Practical Christianity",
    body: "<p>The command to love our neighbors as ourselves is central to the Christian faith. But what does this look like in practice? This teaching provides concrete ways to show Christ's love...</p><p>In Matthew 22:39, Jesus said the second greatest commandment is to \"love your neighbor as yourself.\" This isn't just about being nice to people we like, but extending grace and compassion to all.</p>",
    excerpt:
      "Practical ways to demonstrate Christ's love in your community and relationships.",
    image:
      "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=800",
    createdAt: "2024-01-05T09:15:00Z",
    updatedAt: "2024-01-05T09:15:00Z",
  },
];

export const useTeachings = () => {
  const fetchTeachings = async () => {
    loading.value = true;
    error.value = null;

    try {
      // Use real API call
      const response = await axios.get("http://localhost:5000/api/teachings/");
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
        `http://localhost:5000/api/teachings/${id}`
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
        "http://localhost:5000/api/teachings/",
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
