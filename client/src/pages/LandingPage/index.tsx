import HowItWork from './HowItWork'
import AboutAI from './About'
import Header from './Header'
import Contact from './Contact'

const LandingPage = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////

    return (
        <div className="flex flex-col w-full bg-white">
            <Header />
            <AboutAI />
            <HowItWork />
            <Contact />
        </div>
    )
}

export default LandingPage