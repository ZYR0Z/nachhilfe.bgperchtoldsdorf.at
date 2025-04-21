import Link from "next/link";

export default function Footer() {
  return (
    <footer className="text-muted-foreground text-sm width-full flex items-center justify-between py-3 px-6 border-t">
      <Link href="/" className="flex items-center gap-2">
        Erstellt von Noah
      </Link>
      {/* NOTE: we dont want to change it automatically but rather only once the content updates?*/}
      <p>&copy; 2025</p>
    </footer>
  );
}
