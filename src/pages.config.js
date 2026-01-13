import Home from './pages/Home';
import Trips from './pages/Trips';
import Captains from './pages/Captains';
import Gallery from './pages/Gallery';
import Contact from './pages/Contact';
import Locations from './pages/Locations';
import __Layout from './Layout.jsx';


export const PAGES = {
    "Home": Home,
    "Trips": Trips,
    "Captains": Captains,
    "Gallery": Gallery,
    "Contact": Contact,
    "Locations": Locations,
}

export const pagesConfig = {
    mainPage: "Home",
    Pages: PAGES,
    Layout: __Layout,
};