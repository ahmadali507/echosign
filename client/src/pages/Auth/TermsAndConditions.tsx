import { Link } from 'react-router-dom'

function TermsAndConditions() {


    return (
        <div className="w-full">

            <div className='ml-8 mt-10 text-7xl text-green-300 font-bold text-center'>
                <h1 className="">Terms and Conditions </h1>
            </div>

            <div className="flex justify-center mt-10">
            </div>
            <div className="mt-8 ml-16 mr-10 space-y-2">
                <p>Welcome to EchoSign, a website dedicated to facilitating communication by converting American Sign Language (ASL) into voice. Before using our services, please carefully read the following terms and conditions:</p>
                <ol className="list-decimal space-y-2">
                    <li className="font-bold text-lg">
                        Acceptance of Terms:
                        <span className="font-normal pl-1 text-base">By accessing or using EchoSign, you agree to be bound by these Terms and Conditions, our Privacy Policy, and any additional terms and conditions that may apply to specific features or services offered on the website.</span>
                    </li>
                    <li className="font-bold text-lg">
                        Use of Services:
                        <span className="font-normal pl-1 text-base">EchoSign provides a platform for converting ASL gestures into voice. You may use our services solely for lawful purposes and in compliance with all applicable laws and regulations.</span>
                    </li>
                    <li className="font-bold text-lg">
                        User Accounts:
                        <span className="font-normal pl-1 text-base">Some features of EchoSign may require you to create a user account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must promptly notify us of any unauthorized use of your account or any other security breach.</span>
                    </li>
                    <li className="font-bold text-lg">
                        Intellectual Property Rights:
                        <span className="font-normal pl-1 text-base">The content, features, and functionality of EchoSign, including but not limited to text, graphics, logos, button icons, images, audio clips, and software, are owned by EchoSign or its licensors and are protected by copyright, trademark, and other intellectual property laws.</span>
                    </li>
                    <li className="font-bold text-lg">
                        Prohibited Activities:
                        <span className="font-normal pl-1 text-base">You may not use EchoSign in any manner that could disable, overburden, damage, or impair the website or interfere with any other party's use of the website. You may not attempt to gain unauthorized access to any part of EchoSign or to any other systems or networks connected to EchoSign.</span>
                    </li>
                    <li className="font-bold">
                        Privacy Policy:
                        <span className="font-normal pl-1 text-base">Your use of EchoSign is subject to our Privacy Policy, which explains how we collect, use, and disclose information about you. By using EchoSign, you consent to the collection and use of your information as described in our Privacy Policy.</span>
                    </li>
                    <li className="font-bold text-lg">
                        Disclaimer of Warranties:
                        <span className="font-normal pl-1 text-base">EchoSign is provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. We do not warrant that EchoSign will be error-free or uninterrupted, or that any defects will be corrected.</span>
                    </li>
                    <li className="font-bold text-lg">
                        Limitation of Liability:
                        <span className="font-normal pl-1 text-base">In no event shall EchoSign, its affiliates, or their respective directors, officers, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages, arising out of or in connection with your use of EchoSign.</span>
                    </li>
                    <li className="font-bold text-lg">
                        Indemnification:
                        <span className="font-normal pl-1 text-base">You agree to indemnify and hold harmless EchoSign, its affiliates, and their respective directors, officers, employees, and agents from and against any claims, liabilities, damages, losses, and expenses arising out of or in connection with your use of EchoSign.</span>
                    </li>
                    <li className="font-bold text-lg">
                        Governing Law and Dispute Resolution:
                        <span className="font-normal pl-1 text-base">These Terms and Conditions shall be governed by and construed in accordance with the laws. Any dispute arising out of or relating to these Terms and Conditions shall be resolved exclusively in the state or federal courts located in [Your Jurisdiction].</span>
                    </li>
                    <li className="font-bold text-lg">
                        Changes to Terms and Conditions:
                        <span className="font-normal pl-1 text-base">We reserve the right to modify or update these Terms and Conditions at any time, without prior notice. It is your responsibility to review these Terms and Conditions periodically for changes. Your continued use of EchoSign following the posting of any changes constitutes acceptance of those changes.</span>
                    </li>
                    <li className="font-bold text-lg">
                        Contact Us:
                        <span className="font-normal pl-1 text-base">If you have any questions or concerns about these Terms and Conditions, please contact us at <Link to='/contact' className='text-blue-400 hover:text-green hover:underline cursor-pointer'>Contact Us</Link>.</span>
                    </li>
                </ol>
                <p>By using EchoSign, you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use EchoSign.</p>

            </div>
        </div>

    )
}

export default TermsAndConditions