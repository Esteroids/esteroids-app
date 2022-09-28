
const TITLE_ENDING = 'Esteroids: Decentralized web front page';
const DEFAULT_TITLE = TITLE_ENDING;

const ROUTE_TITLES = {
    '/': { pageTitle: TITLE_ENDING},
    '/new': { pageTitle: 'Newely created dWebsites - ' + TITLE_ENDING},
    '/popular': { pageTitle: 'Popular dWebsites - ' + TITLE_ENDING},
    '/recent': { pageTitle: 'Recently updated dWebsites - ' + TITLE_ENDING},
    '/all': { pageTitle: 'Browse dWebsites - ' + TITLE_ENDING},
    '/search': { pageTitle: 'Search Results - ' + TITLE_ENDING },
    '/about': { pageTitle: 'About - ' + TITLE_ENDING},
    '/privacy': { pageTitle: 'Privacy Policy - ' + TITLE_ENDING },
    '/competition': { pageTitle: 'Esteroids .eth Websites Competition' }
}

const titleHandler = {
    getTitle: function(location){
        return (location?.pathname&&ROUTE_TITLES[location.pathname]&&ROUTE_TITLES[location.pathname]['pageTitle'])||DEFAULT_TITLE;
    },
    getSearchTitle: function(searchTerm){
        return 'Search Results for "' + searchTerm + '" - ' + TITLE_ENDING;
    }

}

export default titleHandler;