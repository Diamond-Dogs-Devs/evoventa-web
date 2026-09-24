import { AuthController } from "@/shared/services/auth/AuthController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        {
          error: true,
          messages: "Parámetros inválidos",
        },
        { status: 400 }
      );
    }

    const authController = new AuthController();

    const { token, user } = await authController.loginUser(email, password);

    const response = NextResponse.json(
      {
        user,
        token,
      },
      { status: 200 }
    );

    response.cookies.set({
      name: "access_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      {
        error: true,
        messages: "Hubo un error al invocar el servicio",
      },
      { status: 500 }
    );
  }
}
