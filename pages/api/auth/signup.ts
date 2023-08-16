import { NextApiRequest, NextApiResponse } from "next";
import validater from "validator";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import * as jose from "jose";
import { setCookie } from "cookies-next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { firstName, lastName, email, phone, city, password } = req.body;

    const errors: string[] = [];

    const validationSchema = [
      {
        valid: validater.isLength(firstName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "firstName is Invalid",
      },
      {
        valid: validater.isLength(lastName, {
          min: 1,
          max: 20,
        }),
        errorMessage: "lastName is Invalid",
      },
      {
        valid: validater.isEmail(email),
        errorMessage: "Email is Invalid",
      },
      {
        valid: validater.isMobilePhone(phone),
        errorMessage: "firstName is Invalid",
      },
      {
        valid: validater.isLength(city, {
          min: 1,
          max: 20,
        }),
        errorMessage: "city is Invalid",
      },
      {
        valid: validater.isStrongPassword(password),
        errorMessage: "password is Invalid",
      },
    ];

    validationSchema.forEach((check) => {
      if (!check.valid) {
        errors.push(check.errorMessage);
      }
    });

    if (errors.length) {
      return res.status(400).json({
        errorMessage: errors[0],
      });
    }

    const userWithEmail = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithEmail) {
      return res.status(400).json({ errorMessage: "Email already exists" });
    }

    const hashpassword: string = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        first_name: firstName,
        last_name: lastName,
        password: hashpassword,
        email,
        phone,
        city,
      },
    });
    const alg = "HS256";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const userToken = await new jose.SignJWT({
      email: user.email,
    })
      .setProtectedHeader({
        alg,
      })
      .setExpirationTime("24h")
      .sign(secret);

    setCookie("Jwt", userToken, { req, res, maxAge: 60 * 60 * 24 });
    return res.status(200).json({
      data: {
        firstName,
        lastName,
        hashpassword,
        email,
        phone,
        city,
      },
    });
  }
}
