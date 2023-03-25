import NextAuth from "next-auth";
import jwt_decode from "jwt-decode";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshAccessToken(token: any) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PRIVATE_API_URL}/auth/token/refresh/`,
      {
        method: "POST",
        body: JSON.stringify({ refresh: token.refresh_token }),
        headers: { "Content-Type": "application/json" },
      },
    );

    const refreshedToken = await res.json();

    if (res.status !== 200) throw refreshedToken;

    const decoded: any = jwt_decode(refreshedToken.access);

    return {
      ...token,
      access_token: refreshedToken.access,
      access_token_expiration: decoded.exp * 1000,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: any = {
  // https://next-auth.js.org/configuration/providers/oauth
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "password",
        },
      },
      async authorize(credentials, req) {
        try {
          const res = await fetch(
            `${process.env.NEXT_PRIVATE_API_URL}/auth/login/`,
            {
              method: "POST",
              body: JSON.stringify(credentials),
              headers: { "Content-Type": "application/json" },
            },
          );
          const token = await res.json();

          // if (res.status !== 200) throw user;

          // If no error and we have user data, return it
          if (res.ok && token) {
            const decoded: any = jwt_decode(token.access_token);
            token.access_token_expiration = decoded.exp * 1000;
            return token;
          }

          // Return null if user data could not be retrieved
          return null;
        } catch (error) {
          console.log(error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async redirect({ url, baseUrl }: any) {
      return url.startsWith(baseUrl)
        ? Promise.resolve("/")
        : Promise.resolve(baseUrl);
    },
    async jwt({ token, user, account, profile, isNewUser }: any) {
      if (token && token.user) {
        token.role =
          token.user.is_staff && token.user.is_superuser ? "admin" : "user";
      }

      // initial signin
      if (user) {
        return user;
      }

      // Return previous token if the access token has not expired
      if (Date.now() < token.access_token_expiration) {
        return token;
      }

      // refresh token
      return refreshAccessToken(token);
    },
    async session({ session, user, token }: any) {
      session.user = token.user;
      session.access = token.access_token;
      session.refresh = token.refresh_token;
      session.access_token_expiration = token.access_token_expiration;
      session.role = token.role;

      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 3, // 3 hours (if user is inactive/idle for {maxAge}, they will be logged out)
  },
  events: {
    async signOut({ message }: any) {
      try {
        const res = await fetch(
          `${process.env.NEXT_PRIVATE_API_URL}/auth/logout/`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
          },
        );

        if (res.status !== 200) throw res;

        return null;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
  },
  pages: {
    signIn: "/",
  },
};

export default NextAuth(authOptions);
