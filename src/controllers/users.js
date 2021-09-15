const publicContent = (req, res) => {
  res.status(200).send("Public content.");
};

const userContent = (req, res) => {
  res.status(200).send("User content.");
};

const moderatorContent = (req, res) => {
  res.status(200).send("Moderator content.");
};

const adminContent = (req, res) => {
  res.status(200).send("Admin content.");
};

export default {
  publicContent,
  userContent,
  moderatorContent,
  adminContent,
};
