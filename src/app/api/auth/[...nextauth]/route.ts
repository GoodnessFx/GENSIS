import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Spotify from "next-auth/providers/spotify";

const handler = NextAuth({
  providers: [
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    Spotify({
      clientId: process.env.SPOTIFY_CLIENT_ID || process.env.NEXT_PUBLIC_SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account }) {
      if (account?.provider === "github") {
        token.githubAccessToken = account.access_token;
      }
      if (account?.provider === "spotify") {
        token.spotifyAccessToken = account.access_token;
      }
      return token;
    },
  },
});

export { handler as GET, handler as POST };

