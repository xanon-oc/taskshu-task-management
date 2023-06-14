import { Link } from "react-router-dom";

const HomeBanner = () => {
  return (
    <div>
      <section className="relative bg-[url(https://images.unsplash.com/photo-1608817618454-b0e9aef7a342?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=871&q=80)] bg-cover bg-center bg-no-repeat">
        <div className="relative mx-auto max-w-screen-xl px-4 py-32 sm:px-6 lg:flex lg:h-screen lg:items-center lg:px-8">
          <div className="max-w-xl text-start ltr:sm:text-left rtl:sm:text-right">
            <h1 className="text-3xl font-extrabold sm:text-5xl">
              Let us manage your
              <strong className="block font-extrabold text-rose-700">
                Task Forever .
              </strong>
            </h1>

            <p className="mt-4 max-w-lg text-base-100  sm:text-xl/relaxed">
              "Efficient task management made simple. Stay organized and
              productive with our user-friendly website."
            </p>

            <div className="mt-8 flex flex-wrap gap-4 text-center">
              <Link
                to="/login"
                className="block w-full rounded bg-rose-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-rose-700 focus:outline-none focus:ring active:bg-rose-500 sm:w-auto"
              >
                Get Started
              </Link>

              <p className="block w-full rounded cursor-pointer bg-white px-12 py-3 text-sm font-medium text-rose-600 shadow hover:text-rose-700 focus:outline-none focus:ring active:text-rose-500 sm:w-auto">
                Learn More
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeBanner;
