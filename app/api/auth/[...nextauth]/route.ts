import nextAuth from "next-auth";

import { authOptions } from "@/config/session";

const handler = nextAuth(authOptions);

export { handler as GET, handler as POST };
