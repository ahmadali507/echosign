
const NotFound = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-lighter-gray">
            <div className="max-w-md w-full space-y-8 p-10 rounded-xl shadow-box">
                <div>
                    <h1 className="mx-auto text-9xl font-bold text-main-blue">
                        Oops!
                    </h1>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-main-blue">
                        404 - Page Not Found
                    </h2>
                    <p className="mt-2 text-center text-sm text-light-gray">
                        Sorry, the page you are looking for does not exist.
                    </p>
                </div>
                <div>
                    <a href="/" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-main-blue hover:bg-dark-blue-main">
                        Go back home
                    </a>
                </div>
            </div>
        </div>
    );
};

export default NotFound;