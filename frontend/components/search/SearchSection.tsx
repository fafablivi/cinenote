import { Movie } from "@/model/movie";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Formik, Form, Field } from "formik";
import { Search } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import * as Yup from "yup";

interface SearchFormValues {
    searchedTitle: string
}

const searchSchema = Yup.object({
    searchedTitle: Yup.string().required("Veuillez saisir un titre de film").min(2, "Minimum 2 caractères"),
})

interface SearchSectionProps {
    isLoading: boolean
    setIsLoading: Dispatch<SetStateAction<boolean>>
    setError: Dispatch<SetStateAction<string>>
    setMovies: Dispatch<SetStateAction<Movie[]>>
}

export default function SearchSection({ isLoading, setIsLoading, setError, setMovies }: SearchSectionProps) {
    const handleSearch = async (values: SearchFormValues) => {
        setIsLoading(true)
        setError("")
        setMovies([])

        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/movie/search?searchedTitle=${encodeURIComponent(values.searchedTitle)}`,
            )

            if (response.ok) {
                const data = await response.json()
                setMovies(data.results || [])
            } else {
                setError("Aucun film trouvé pour cette recherche")
            }
        } catch {
            setError("Erreur de connexion au serveur")
        } finally {
            setIsLoading(false)
        }
    }

    const initialValues: SearchFormValues = {
        searchedTitle: "",
    }

    return (
        <div className="max-w-2xl mx-auto">
            <Card className="border-slate-700/50 bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm shadow-xl">
                <CardContent>
                    <Formik initialValues={initialValues} validationSchema={searchSchema} onSubmit={handleSearch}>
                        {({ isSubmitting, errors, touched }) => (
                            <Form className="space-y-4">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                                    <Field name="searchedTitle">
                                        {({ field }: any) => (
                                            <Input
                                                {...field}
                                                placeholder="Rechercher un film..."
                                                className={`pl-10 h-12 border-slate-600/50 bg-slate-700/50 text-white placeholder:text-slate-400 focus:border-blue-500/50 focus:ring-2 focus:ring-blue-500/20 transition-all ${touched.searchedTitle && errors.searchedTitle ? "border-red-500/50" : ""
                                                    }`}
                                            />
                                        )}
                                    </Field>
                                    {touched.searchedTitle && errors.searchedTitle && (
                                        <div className="text-red-400 text-sm mt-2">{errors.searchedTitle}</div>
                                    )}
                                </div>
                                <Button
                                    type="submit"
                                    disabled={isSubmitting || isLoading}
                                    className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium transition-all duration-200 shadow-lg hover:shadow-blue-500/25"
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Recherche en cours...
                                        </div>
                                    ) : (
                                        <>
                                            <Search className="w-4 h-4 mr-2" />
                                            Rechercher
                                        </>
                                    )}
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </CardContent>
            </Card>
        </div>
    )
}