"use client";
import { Formik, Form } from "formik";
import { useAuth } from "@/shared/providers";
import { Button, InputFormik, Card } from "@/shared/ui";
import { loginSchema } from "./schemas/login";

export default function LoginPage() {
  const { login, isLoading } = useAuth();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      <div className="bg-black hidden md:block"></div>
      <div className="relative h-screen w-full">
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={loginSchema}
          onSubmit={login}
        >
          {() => (
            <Form
              className="flex justify-center items-center h-screen"
              id="form-login"
            >
              <Card className="w-full max-w-md rounded" semiTransparent={true}>
                <div className="flex justify-center">
                  {/* <Image
                  src="/auth/asset/logo.JPEG"
                  alt="Logo Top"
                  width={100}
                  height={100}
                  priority
                  className="rounded-xl mb-6"
                /> */}
                </div>
                <div className="flex flex-col gap-6" id="inputs-login">
                  <InputFormik
                    name="email"
                    label="Email"
                    type="email"
                    id="email-login"
                  />
                  <InputFormik
                    name="password"
                    label="Password"
                    type="password"
                    id="password-login"
                  />
                </div>
                <div className="flex justify-center mt-10" id="login-button">
                  <Button
                    className="cursor-pointer"
                    type="submit"
                    color="primary"
                    variant="fill"
                    disabled={isLoading}
                    id="button"
                  >
                    Iniciar sesión
                  </Button>
                </div>
              </Card>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
