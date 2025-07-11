"use client"

import { useEffect, useState } from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"

const validationSchema = Yup.object({
    name: Yup.string().required("Nom requis").min(2, "Minimum 2 caractères").max(50, "Maximum 50 caractères"),
    email: Yup.string().email("Email invalide").required("Email requis"),
    password: Yup.string()
        .required("Mot de passe requis")
        .min(8, "Minimum 8 caractères")
        .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            "Le mot de passe doit contenir au moins une minuscule, une majuscule et un chiffre",
        ),
    confirmPassword: Yup.string()
        .required("Confirmation du mot de passe requise")
        .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
})

interface RegisterFormValues {
    name: string
    email: string
    password: string
    confirmPassword: string
}

export default function RegisterPage() {
    const [success, setSuccess] = useState(false)
    const router = useRouter()

    const initialValues: RegisterFormValues = {
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    useEffect(() => {
        document.title = "CinéNote - Inscription";
    }, []);

    const handleSubmit = async (values: RegisterFormValues, { setSubmitting, setStatus }: any) => {
        try {
            setStatus(null)

            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: values.name,
                    email: values.email,
                    password: values.password,
                }),
            })

            
            if (response.ok) {
                setSuccess(true)
                const data = await response.json()
                localStorage.setItem("token", data.token)
                localStorage.setItem("cinephileId", data.id)

                setTimeout(() => {
                    router.push(`/profile/${data.id}`)
                }, 2000)
            } else {
                const errorData = await response.json()
                setStatus(errorData.message || "Erreur lors de la création du compte")
            }
        } catch {
            setStatus("Erreur de connexion")
        } finally {
            setSubmitting(false)
        }
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
            <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 backdrop-blur">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl text-white">Inscription</CardTitle>
                    <CardDescription className="text-slate-300">Créez votre compte CineNote</CardDescription>
                </CardHeader>
                <CardContent>
                    {success ? (
                        <Alert className="border-green-500 bg-green-900/20 backdrop-blur">
                            <AlertDescription className="text-green-400">
                                Compte créé avec succès ! Redirection vers votre profil...
                            </AlertDescription>
                        </Alert>
                    ) : (
                        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                            {({ isSubmitting, status }) => (
                                <Form className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name" className="text-slate-200">
                                            Nom
                                        </Label>
                                        <Field name="name">
                                            {({ field, meta }: any) => (
                                                <div>
                                                    <Input
                                                        {...field}
                                                        id="name"
                                                        type="text"
                                                        className={`border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:border-blue-500 ${meta.touched && meta.error ? "border-red-500" : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage name="name" component="div" className="text-red-400 text-sm mt-1" />
                                                </div>
                                            )}
                                        </Field>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-slate-200">
                                            Email
                                        </Label>
                                        <Field name="email">
                                            {({ field, meta }: any) => (
                                                <div>
                                                    <Input
                                                        {...field}
                                                        id="email"
                                                        type="email"
                                                        className={`border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:border-blue-500 ${meta.touched && meta.error ? "border-red-500" : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage name="email" component="div" className="text-red-400 text-sm mt-1" />
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

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword" className="text-slate-200">
                                            Confirmation du mot de passe
                                        </Label>
                                        <Field name="confirmPassword">
                                            {({ field, meta }: any) => (
                                                <div>
                                                    <Input
                                                        {...field}
                                                        id="confirmPassword"
                                                        type="password"
                                                        className={`border-slate-600 bg-slate-700 text-white placeholder:text-slate-400 focus:border-blue-500 ${meta.touched && meta.error ? "border-red-500" : ""
                                                            }`}
                                                    />
                                                    <ErrorMessage name="confirmPassword" component="div" className="text-red-400 text-sm mt-1" />
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
                                        {isSubmitting ? "Création..." : "Créer un compte"}
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    )}

                    <div className="mt-6 text-center">
                        <p className="text-slate-300">
                            Déjà un compte ?{" "}
                            <Link href="/login" className="text-blue-400 hover:text-blue-300 hover:underline">
                                Se connecter
                            </Link>
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
