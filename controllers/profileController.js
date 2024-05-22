import { prisma } from "../db.js";

export async function createProfile(req, res) {
  const { qualification, experience, subject, city, about, userId } = req.body;

  try {
    const profile = await prisma.teacherProfile.create({
      data: {
        qualification,
        experience,
        subject,
        city,
        about,
        user_id: userId,
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
  console.log(userId);
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
