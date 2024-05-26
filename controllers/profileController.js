import { prisma } from "../db.js";

export async function createProfile(req, res) {
  const { qualification, experience, subject, city, about } = req.body;

  try {
    const profile = await prisma.teacherProfile.create({
      data: {
        qualification,
        experience,
        subject,
        city,
        about,
        user_id: req.user.id,
      },
    });

    if (!profile) {
      return res.status(400).json({ message: "Bad Request" });
    }

    return res.status(201).json(profile);
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function getProfile(req, res) {
  const userId = +req.params.id;
  try {
    const profile = await prisma.teacherProfile.findUnique({
      where: { user_id: userId },
    });
    if (!profile) {
      return res.status(404).json({ message: "Not Found" });
    }
    return res.json(profile);
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

export async function searchProfile(req, res) {
  const { q: searchQuery } = req.query;

  const teachers = await prisma.teacherProfile.findMany({
    where: {
      OR: [
        { qualification: { contains: searchQuery } },
        { subject: { contains: searchQuery } },
        { about: { contains: searchQuery } },
        { city: { contains: searchQuery } },
      ],
    },
  });

  res.json({ teachers });
}
