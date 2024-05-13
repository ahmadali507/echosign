import HowItWork from './HowItWork'
import About from './About'
import Header from './Header'
import Contact from './Contact'

const LandingPage = () => {

    ///////////////////////////////////////////////////////// VARIABLES ///////////////////////////////////////////////////////////

    return (
        <div className="flex flex-col w-full bg-inherit">
            <Header />
            <About />
            <HowItWork />
            <Contact />
        </div>
    )
}

export default LandingPage