"use client"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"

const validationSchema = Yup.object({
    identifier: Yup.string().required("Email ou nom d'utilisateur requis").min(3, "Minimum 3 caractères"),
    password: Yup.string().required("Mot de passe requis").min(6, "Minimum 6 caractères"),
})

interface LoginFormValues {
    identifier: string
    password: string
}

export default function LoginPage() {
    const initialValues: LoginFormValues = {
        identifier: "",
        password: "",
    }

    useEffect(() => {
        document.title = "CinéNote - Connexion";
        localStorage.removeItem("cinephileId")
        localStorage.removeItem("token")
    }, []);

    const router = useRouter();

    const handleSubmit = useCallback(async (
        values: LoginFormValues,
        { setSubmitting, setStatus }: { setSubmitting: (isSubmitting: boolean) => void; setStatus: (status: string | null) => void }
    ) => {
        try {
            setStatus(null)

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            })

            if (!response.ok) {
                setStatus("Identifiants incorrects")
                return
            }

            const data = await response.json()
            localStorage.setItem("token", data.token)
            localStorage.setItem("cinephileId", data.id)
            router.push(`/profile`);
        } catch (error) {
            console.error("Login error:", error)
            setStatus("Erreur de connexion")
        } finally {
            setSubmitting(false)
        }
    }, [router]);


    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 backdrop-blur">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Connexion</CardTitle>
                    <CardDescription className="text-slate-300">Connectez-vous à votre compte CineNote</CardDescription>
                </CardHeader>
                <CardContent>
                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                        {({ isSubmitting, status }) => (
                            <Form className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="identifier" className="text-slate-200">
                                        {"Email ou nom d'utilisateur"}
                                    </Label>
                                    <Field name="identifier">
                                        {({ field, meta }: any) => (
                                            <div>
                                                <Input
                                                    {...field}
                                                    id="identifier"
                                                    type="text"
                                                    className={`border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:border-blue-500 ${meta.touched && meta.error ? "border-red-500" : ""
                                                        }`}
                                                />
                                                <ErrorMessage name="identifier" component="div" className="text-red-400 text-sm mt-1" />
                                            </div>
                                        )}
                                    </Field>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-slate-200">
                                        Mot de passe
                                    </Label>
                                    <Field name="password">
                                        {({ field, meta }: any) => (
                                            <div>
                                                <Input
                                                    {...field}
                                                    id="password"
                                                    type="password"
                                                    className={`border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:border-blue-500 ${meta.touched && meta.error ? "border-red-500" : ""
                                                        }`}
                                                />
                                                <ErrorMessage name="password" component="div" className="text-red-400 text-sm mt-1" />
                                            </div>
                                        )}
                                    </Field>
                                </div>

                                {status && (
                                    <Alert className="border-red-500 bg-red-900/20 backdrop-blur">
                                        <AlertDescription className="text-red-400">{status}</AlertDescription>
                                    </Alert>
                                )}

                                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
                                    {isSubmitting ? "Connexion..." : "Se connecter"}
                                </Button>
                            </Form>
                        )}
                    </Formik>

                    <div className="mt-6 text-center">
                        <p className="text-slate-300">
                            Pas encore de compte ?{" "}
                            <Link href="/register" className="text-blue-400 hover:text-blue-300 hover:underline">
                                Créer un compte
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
