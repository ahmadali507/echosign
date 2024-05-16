import { Link } from 'react-router-dom'

const PrivacyPolicy = () => {
    return (
        <div className="w-full">

            <div className='ml-8 mt-10 mb-14 text-7xl text-green-300 font-bold text-center'>
                <h1 className="">Privacy Policy </h1>
            </div>
        <div className="w-full mx-auto py-8 px-4">
            <h1 className="text-2xl font-bold mb-4">What We Collect:</h1>
            <ul className="list-disc ml-8 mb-4">
                <li>Username (for account identification)</li>
                <li>First & Last Name (for personalization)</li>
                <li>Email Address (for account access and communication)</li>
                <li>Password (securely stored for account access)</li>
            </ul>

            <h1 className="text-2xl font-bold mb-4">How We Use Your Information:</h1>
            <ul className="list-disc ml-8 mb-4">
                <li>Manage your account and provide the service smoothly.</li>
                <li>Send important updates, security alerts, and support info.</li>
                <li>Respond to your questions and requests effectively.</li>
                <li>Improve the service based on your usage patterns (anonymous data).</li>
                <li>Send promotional communications (only with your consent).</li>
            </ul>

            <h1 className="text-2xl font-bold mb-4">We Don't Share Your Data (Except When We Do):</h1>
            <p className="mb-4">We generally keep your information confidential. We only share it with:</p>
            <ul className="list-disc ml-8 mb-4">
                <li>Trusted service providers who help us run EchoSign (they keep your data secure too).</li>
                <li>Legal authorities when required by law (e.g., court orders).</li>
                <li>New owners in case of a merger or acquisition.</li>
            </ul>

            <h1 className="text-2xl font-bold mb-4">Your Privacy Choices:</h1>
            <p className="mb-4">You control your information:</p>
            <ul className="list-disc ml-8 mb-4">
                <li>Access and update your account details.</li>
                <li>Unsubscribe from promotional emails.</li>
                <li>Delete your account (may limit service functionality).</li>
            </ul>

            <h1 className="text-2xl font-bold mb-4">Children's Privacy:</h1>
            <p className="mb-4">EchoSign is a friendly platform and can use it with complete assurity of their privacy and protection.</p>

            <h1 className="text-2xl font-bold mb-4">Changes & Contact:</h1>
            <p>We may update this policy. We'll notify you and post the updated version here.</p>
            <p className="mb-8">Have questions? <Link to='/contact' className='text-blue-400 hover:text-green hover:underline cursor-pointer'>Contact Us</Link>.</p>

            <p className="mb-4">We at EchoSign are committed to transparency and user trust. By using our service, you acknowledge this Privacy Policy. If you have any concerns, please don't hesitate to reach out.</p>
            <p className="font-bold">Sincerely,</p>
            <p>The EchoSign Team</p>
        </div>
        </div>
    );
};

export default PrivacyPolicy;

