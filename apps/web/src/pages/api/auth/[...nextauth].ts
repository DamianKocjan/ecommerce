import NextAuth from "next-auth";

import { authOptions } from "@ecommerce/auth";

// @ts-ignore
export default NextAuth(authOptions);
