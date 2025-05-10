import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-muted-foreground text-sm width-full flex items-center justify-between py-4 px-6 border-t">
      <div className="flex items-center gap-6 *:hover:underline">
        <Link href="/impressum" className="flex items-center gap-2">
          Impressum
        </Link>
        <Link href="/datenschutz" className="flex items-center gap-2">
          Datenschutz
        </Link>
        <Link href="/agb" className="flex items-center gap-2">
          AGB
        </Link>
      </div>
      <div className="flex items-center gap-2 opacity-70">
        <Link href="/" className="flex items-center gap-2 underline">
          Erstellt von Noah
        </Link>
        {/* NOTE: we dont want to change it automatically but rather only once the content updates?*/}
        <p>&copy; 2025</p>
      </div>
    </footer>
  );
}
