// to reset the session on every request
export { auth as middleware } from "@/auth"
export const config = {
    matcher: [
        "/nachhilfe-anbieten/:path*",
        "/admin/:path*",
    ],
}
