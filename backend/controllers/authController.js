import supabase from "../config/supabase.js";

// Login existing admin
export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  return res.json({ token: data.session.access_token });
};

// Register new admin
export const registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.FRONTEND_URL}/b13-junction-f38`, // Optional: set redirect after email confirmation
    },
  });

  if (error) {
    return res.status(400).json({ error: error.message });
  }

  return res.json({
    message: "Registration successful. Check email for confirmation.",
    user: data.user,
  });
};

export const getAdminProfile = async (req, res) => {
  const userId = req.user.id;

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    return res.status(404).json({ error: "Profile not found" });
  }

  return res.json(data);
};