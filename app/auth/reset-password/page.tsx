"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function ResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // 如果有令牌，显示重置密码表单，否则显示请求重置密码表单
  const isResetForm = !!token;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (isResetForm) {
        if (password !== confirmPassword) {
          setStatus("error");
          setMessage("两次输入的密码不匹配");
          return;
        }
        
        // 这里添加重置密码的逻辑
        // 使用 token 和 password
        
        setStatus("success");
        setMessage("密码已成功重置！");
      } else {
        // 这里添加发送重置密码邮件的逻辑
        // 使用 email
        
        setStatus("success");
        setMessage("重置密码链接已发送到您的邮箱！");
      }
    } catch (error) {
      setStatus("error");
      setMessage("操作失败，请稍后重试");
      console.error("重置密码失败:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight">
            {isResetForm ? "重置您的密码" : "找回密码"}
          </h2>
        </div>
        
        {status === "success" ? (
          <div className="text-center">
            <p className="text-green-600 font-semibold">{message}</p>
            <div className="mt-4">
              <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                返回登录
              </Link>
            </div>
          </div>
        ) : (
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            {status === "error" && (
              <div className="text-red-600 text-center font-semibold">{message}</div>
            )}
            
            {!isResetForm && (
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  电子邮箱
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                  placeholder="请输入您的邮箱"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            )}
            
            {isResetForm && (
              <>
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    新密码
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    placeholder="请输入新密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    确认新密码
                  </label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm py-1.5 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    placeholder="请再次输入新密码"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400"
              >
                {loading ? "处理中..." : isResetForm ? "重置密码" : "发送重置链接"}
              </button>
            </div>
            
            <div className="text-center">
              <Link href="/auth/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                返回登录
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
} 