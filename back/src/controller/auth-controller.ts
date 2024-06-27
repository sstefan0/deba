import { Request, Response, NextFunction } from "express";
import { prisma } from "../util/prisma-client";
import {
  ForgotPasswordDto,
  LoginDto,
  RegisterDto,
  ResetPasswordDto,
} from "../dto/auth-dto";
import HttpException from "../util/http-exception";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { generateHTMLResetMessage, sendEmail } from "../util/mail-sender";

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const loginData = req.body as LoginDto;
    const user = await prisma.user.findFirst({
      where: { email: loginData.email },
    });

    if (!user) throw new HttpException(404, "User not found.");

    const passwordMatch = await bcrypt.compare(
      loginData.password,
      user.password
    );

    if (!passwordMatch) throw new HttpException(401, "Unauthorized");

    const accesstoken = jwt.sign(
      {
        id: user.id,
        role: user.role,
        email: user.email,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({ accessToken: accesstoken });
  } catch (e) {
    next(e);
  }
};

export const registerController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body as RegisterDto;

    const hashedPasswrod: string = await bcrypt.hash(userData.password, 10);

    const available: boolean = !(await prisma.user.findFirst({
      where: { email: userData.email },
    }));

    if (!available) throw new HttpException(409, "Email Unavailable");

    const newUser = await prisma.user.create({
      data: { ...userData, password: hashedPasswrod },
    });

    res.status(200).json(newUser);
  } catch (e) {
    next(e);
  }
};

export const forgotPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = (req.body as ForgotPasswordDto).email;

    const user = await prisma.user.findFirst({ where: { email: email } });

    if (!user) throw new HttpException(404, "Not found");

    const resetToken = crypto.randomBytes(64).toString("hex");

    const expirationTime = new Date();
    expirationTime.setHours(expirationTime.getHours() + 2);

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken: resetToken, expiresAt: expirationTime },
    });

    const mail = await sendEmail({
      from: "turizamvisegrad@gmail.com",
      to: user.email,
      subject: "test",
      html: generateHTMLResetMessage(user.firstName, resetToken),
    });
    res.status(200).json({ message: "Check your email for further details." });
  } catch (e) {
    next(e);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userData = req.body as ResetPasswordDto;
    const user = await prisma.user.findFirst({
      where: { resetToken: userData.token },
    });

    if (!user) throw new HttpException(498, "Token expired/invalid");

    const currentTime = new Date();
    if (currentTime > user.expiresAt!)
      throw new HttpException(498, "Token expired/invalid");

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, expiresAt: new Date() },
    });

    res.status(200).json({ message: "Password changed successfully" });
  } catch (e) {
    next(e);
  }
};
