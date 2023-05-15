export { default } from "next-auth/middleware";

//Below routes will be protected
export const config = {
  matcher: ["/trips", "/reservations", "/properties", "/favorites"],
};
