import { NextApiRequest, NextApiResponse } from "next";

import { createTransport } from "nodemailer";
import { v4 } from "uuid";
import { ValidationError } from "yup";

import { rateLimiterApi } from "@/utility/rate-limiter";
import { mailValidationSchema } from "@/components/contact-form/contact-form";

const REQUEST_PER_HOUR = 5 as const;
const RATELIMIT_DURATION = 3600000 as const;
const MAX_USER_PER_SECOND = 100 as const;

const limiter = rateLimiterApi({
  interval: RATELIMIT_DURATION,
  uniqueTokenPerInterval: MAX_USER_PER_SECOND,
  getUserId: (req: NextApiRequest, res: NextApiResponse) => {
    const userIp =
      req.headers["x-forwarded-for"] || req.socket.remoteAddress || "";
    const userAgent = req.headers["user-agent"] || "";
    if (!userIp || !userAgent) {
      let userUuidToken = req.cookies.userUuid;
      if (userUuidToken) {
        const cookieExpiration = req.cookies.userUuid_expires;
        if (cookieExpiration) {
          const expirationDate = new Date(cookieExpiration);
          if (expirationDate && expirationDate <= new Date()) {
            // Cookie has expired, generate a new UUID
            const newUuidToken = v4();
            res.setHeader(
              "Set-Cookie",
              `userUuid=${newUuidToken}; Max-Age=${
                60 * 60 * 24
              }; SameSite=Strict`,
            );

            // Set a new expiration date (e.g., 24 hours from now)
            const newExpirationDate = new Date();
            newExpirationDate.setSeconds(
              newExpirationDate.getSeconds() + 60 * 60 * 24,
            );
            res.setHeader(
              "Set-Cookie",
              `userUuid_expires=${newExpirationDate.toUTCString()}; Max-Age=${
                60 * 60 * 24
              }; SameSite=Strict`,
            );

            return newUuidToken;
          }
          return userUuidToken;
        }
        userUuidToken = v4();
        res.setHeader(
          "Set-Cookie",
          `userUuid=${userUuidToken}; Max-Age=${60 * 60 * 24}; SameSite=Strict`,
        );
        const newExpirationDate = new Date();
        newExpirationDate.setSeconds(
          newExpirationDate.getSeconds() + 60 * 60 * 24,
        );
        res.setHeader(
          "Set-Cookie",
          `userUuid_expires=${newExpirationDate.toUTCString()}; Max-Age=${
            60 * 60 * 24
          }; SameSite=Strict`,
        );
        return userUuidToken;
      } else {
        userUuidToken = v4();
        res.setHeader(
          "Set-Cookie",
          `userUuid=${userUuidToken}; Max-Age=${60 * 60 * 24}; SameSite=Strict`,
        );
        const newExpirationDate = new Date();
        newExpirationDate.setSeconds(
          newExpirationDate.getSeconds() + 60 * 60 * 24,
        );
        res.setHeader(
          "Set-Cookie",
          `userUuid_expires=${newExpirationDate.toUTCString()}; Max-Age=${
            60 * 60 * 24
          }; SameSite=Strict`,
        );
        return userUuidToken;
      }
    }
    const userId = `${userIp}-${userAgent}`;
    return userId;
  },
});

type MailRequestBody = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const sendMail = async function (
  name: string,
  email: string | "SELF",
  subject: string,
  message: string,
): Promise<{ status: number; message: string }> {
  const user = process.env.NODEMAILER_USER;
  const pass = process.env.NODEMAILER_PASS;

  if (!user && !pass) {
    return new Promise((resolve) =>
      resolve({ status: 500, message: "Internal server error" }),
    );
  }

  const transporter = createTransport({
    service: "gmail",
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: process.env.NODEMAILER_USER,
    to: process.env.NODEMAILER_USER,
    subject: "Portfolio: [" + subject + " ]",
    text: `${name}: <${email}>\n${message}`,
  };

  return new Promise((resolve) => {
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        resolve({ status: 500, message: "Failed to send mail" });
      } else {
        resolve({ status: 200, message: "Mail send successfully" });
      }
    });
  });
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<{ status: number; message: string | string[] }>,
) => {
  try {
    const { method } = req;
    if (method !== "POST") {
      res.status(400).json({
        status: 405,
        message: `[${method}] is not allowed`,
      });
      return;
    }
    const body: MailRequestBody = req.body;

    const isRateLimited = await limiter.check(res, req, REQUEST_PER_HOUR);
    if (isRateLimited.status !== 200) return;

    try {
      await mailValidationSchema.validate(body, { abortEarly: false });
    } catch (validationError) {
      if (validationError instanceof ValidationError) {
        res.status(422).json({
          status: 422,
          message: validationError.errors,
        });
      } else {
        res.status(500).json({
          status: 500,
          message: "Internal server error",
        });
      }
      return;
    }

    const { name, email, subject, message } = body;

    const response = await sendMail(name, email, subject, message);
    res.status(response.status).send(response);
  } catch (error: any) {
    if (error?.status === 429) {
      res.status(429).json({ status: 429, message: "Rate limit exceeded" });
    } else {
      res.status(error.status || 500).json({
        status: 500,
        message: error.message || "Internal server error",
      });
    }
  }
};

export default handler;
