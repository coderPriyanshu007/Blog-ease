import { updateUserProfile } from "../models/userModel.js";
import { findUserByEmail } from "../models/authModel.js";
import bcrypt from "bcrypt";

export const updateProfile = async (req, res) => {
  const { name, bio, password, newPassword } = req.body;
  const { id ,email } = req.user;
  const user = await findUserByEmail(email);
  console.log(user)
  try{
    if (password) {
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid email or password" });
    const newHashedPass = await bcrypt.hash(newPassword,10)
    await updateUserProfile(name, bio, newHashedPass, id);
    res.status(200).json({message:'Profile update successfully'})
  }else{
    await updateUserProfile(name, bio,'', id);
    res.status(200).json({message:'Profile update successfully'})
  }
  
  }catch(err){
    res.status(500).json({ message: 'Error updating profile', error: err });
    console.log(err);
  }

  
};


