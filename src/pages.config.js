import Captains from './pages/Captains';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Home from './pages/Home';
import Locations from './pages/Locations';
import Trips from './pages/Trips';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Captains": Captains,
    "Contact": Contact,
    "Gallery": Gallery,
    "Home": Home,
    "Locations": Locations,
    "Trips": Trips,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};