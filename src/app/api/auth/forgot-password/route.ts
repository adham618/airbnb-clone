// import jwt from "jsonwebtoken";

// export async function POST(req: Request) { try {
//     await db.connectDb();
//     const { email } = req.body;
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({ message: "Email does not exist." });
//     }
//    // create token with jwt
//     const user_token =jwt.sign(user._id, process.env.RESET_TOKEN_SECRET, {
// expiresIn: "1h",
// });
//     // you should create "pages/reset/[token].js" dynamic page
//     const url = `${process.env.BASE_URL}/reset/${user_id}`;
//     // you need to implement sedning email maybe using `nodemailer`
//     // create this function for your case
//     sendEmail(email, url, "Reset your password.");
//     // you should disconnect the db here
//     res.json({
//       message: "An email has been sent to you to reset your password.",
//     });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

export function POST() {
  return null;
}
