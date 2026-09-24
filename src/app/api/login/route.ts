import { AuthController } from "@/shared/services/auth/AuthController";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    if (body) {
      const IS_MOVILE = body?.grant === "movile";
      if (body?.email === undefined || body?.password === undefined) {
        const res = NextResponse.json(
          {
            error: true,
            messages: "Parametros inválidos",
          },
          {
            status: 400,
          }
        );
        return res;
      }
      const authController = new AuthController();
      const { token, user } = await authController.loginUser(
        body.email,
        body.password
      );

      const res = NextResponse.json(
        {
          ok: user,
          token: token,
        },
        {
          status: 200,
        }
      );

      res.cookies.set("access_token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24,
      });

      return res;
    } else {
      const res = NextResponse.json(
        {
          error: true,
          messages: "Parametros inválidos",
        },
        {
          status: 400,
        }
      );
      return res;
    }
  } catch (e) {
    const res = NextResponse.json(
      {
        error: true,
        messages: "Hubo un error al invocar el servicio",
      },
      {
        status: 500,
      }
    );
    return res;
  }
}
