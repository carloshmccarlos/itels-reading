import { prisma } from "@/lib/prisma";
import { sendEmail } from "@/lib/send-email";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { emailOTP } from "better-auth/plugins";

// 创建认证处理程序
export const auth = betterAuth({
	// 数据库适配器
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
		verification: {
			required: true,
			expiresIn: 86400, // 24小时（秒）
		},
		requireEmailVerification: true,
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
});
