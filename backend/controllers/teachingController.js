import supabase from "../config/supabase.js";

export const getTeachings = async (req, res) => {
  const { data, error } = await supabase.from("teachings").select("*");

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
};

export const getTeachingById = async (req, res) => {
  const { id } = req.params;
  const { data, error } = await supabase
    .from("teachings")
    .select("*")
    .eq("id", id)
    .single();

  if (error) return res.status(404).json({ error: "Teaching not found" });

  res.json(data);
};

export const createTeaching = async (req, res) => {
  const { title, body, youtubeUrl } = req.body;
  const imageUrl = req.fileUrl || null;

  const { data, error } = await supabase
    .from("teachings")
    .insert([
      {
        title,
        body,
        image: imageUrl,
        youtube_url: youtubeUrl,
      },
    ])
    .select()
    .single();

  if (error) return res.status(500).json({ error: error.message });

  res.status(201).json(data);
};
