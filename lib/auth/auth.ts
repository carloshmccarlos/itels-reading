import { sendEmail } from "@/lib/auth/send-email";
import { prisma } from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";

export const auth = betterAuth({
	database: prismaAdapter(prisma, {
		provider: "postgresql",
	}),

	emailVerification: {
		sendVerificationEmail: async ({ user, url, token }, request) => {
			await sendEmail({
				to: user.email,
				subject: "Verify your email address",
				text: `Click the link to verify your email: ${url}, 
				this link will expire in 5 minutes.`,
			});
		},
		expiresIn: 300,
		autoSignInAfterVerification: true,
		sendOnSignUp: true,
	},

	// 邮箱密码认证配置
	emailAndPassword: {
		enabled: true,
		minPasswordLength: 8,
		maxPasswordLength: 16,
		requireEmailVerification: true,

		sendResetPassword: async ({ user, url, token }, request) => {
			await sendEmail({
				to: user.email,
				subject: "Reset your password",
				text: `Click the link to reset your password: ${url}, 
				this link will expire in 5 minutes.`,
			});
		},
	},

	// 会话配置
	session: {
		maxAge: 30 * 24 * 60 * 60, // 30天（秒）
		updateAge: 24 * 60 * 60, // 24小时（秒）
		cookieName: "auth.session",
		cookieOptions: {
			httpOnly: true,
			sameSite: "lax",
			path: "/",
			secure: process.env.NODE_ENV === "production",
		},
	},

	// 页面和路由配置
	pages: {
		signIn: "/auth/login",
		signUp: "/auth/register",
		error: "/auth/error",
		verifyEmail: "/auth/verify-email",
		resetPassword: "/auth/reset-password",
	},

	// Rate limiting configuration
	rateLimit: {
		enabled: true,
		window: 60,
		max: 100,
		storage: "database",
		modelName: "rateLimit",
	},

	// Add email OTP plugin
	plugins: [
		emailOTP({
			async sendVerificationOTP({ email, otp, type }) {
				await sendEmail({
					to: email,
					subject:
						type === "sign-in"
							? "Your login code for IELTS Reading"
							: type === "email-verification"
								? "Verify your email address"
								: "Reset your password",
					text: `Your verification code is: <strong>${otp}</strong><br><br>This code will expire in 5 minutes.`,
				});
			},
			otpLength: 6,
			expiresIn: 300, // 5 minutes
			allowedAttempts: 3,
		}),
	],
});
