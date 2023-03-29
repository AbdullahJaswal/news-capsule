import { useRef, useState } from "react";
import { signIn } from "next-auth/react";

function Login() {
  const [loading, setLoading] = useState(false);

  const email = useRef("");
  const password = useRef("");

  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col gap-x-10 lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Newscapsule: Get the News You Need, Faster!</h1>
          <p className="py-6">
            Discover the most efficient way to stay informed with Newscapsule&apos;s AI-powered news summarization
            platform.
          </p>
        </div>

        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-300">
          <div className="card-body">
            <form
              method="post"
              action="/manage"
              onSubmit={(e) => {
                e.preventDefault();

                setLoading(true);

                signIn("credentials", {
                  email: email.current,
                  password: password.current,
                });
              }}
            >
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  placeholder="email"
                  className="input input-bordered"
                  onChange={(e) => (email.current = e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="password"
                  className="input input-bordered"
                  onChange={(e) => (password.current = e.target.value)}
                />
              </div>

              <div className="form-control mt-6">
                <button type="submit" className={loading ? "btn btn-primary loading" : "btn btn-primary"}>
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
