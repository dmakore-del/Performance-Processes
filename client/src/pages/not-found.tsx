import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useLanguage } from "@/hooks/use-language";

export default function NotFound() {
  const { language } = useLanguage();
  const fr = language === "fr";
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <h1 className="text-2xl font-bold text-gray-900">{fr ? "404 · Page introuvable" : "404 · Page not found"}</h1>
          </div>

          <p className="mt-4 text-sm text-gray-600">
            {fr ? "Cette page n’existe pas ou a été déplacée." : "This page does not exist or may have moved."}
          </p>
          <Link href="/" className="mt-6 inline-block border-b border-primary pb-1 text-sm text-primary">
            {fr ? "Retour à l’accueil" : "Return home"}
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
