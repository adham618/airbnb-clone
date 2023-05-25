// handler.put(async (req, res) => {
//   try {
//     await db.connectDb();
//     const { user_id, password } = req.body;
//     const user = await User.findById(user_id);
//     if (!user) {
//       return res.status(400).json({ message: "Account does not exist." });
//     }
//     const hashedPassword = await bcrypt.hash(password, 12);
//     await user.updateOne({
//       password: hashedPassword,
//     });
//     res.status(200).json({ email: user.email });
//     // you should disconnect the db
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });
export function POST() {
  return null;
}
