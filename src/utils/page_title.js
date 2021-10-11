
const TITLE_ENDING = 'Esteroids: Decentralized web front page';
const DEFAULT_TITLE = TITLE_ENDING;

const ROUTE_TITLES = {
    '/': { pageTitle: TITLE_ENDING},
    '/new': { pageTitle: 'Browse newely created dWebsites - ' + TITLE_ENDING},
    '/popular': { pageTitle: 'Browse popular dWebsites - ' + TITLE_ENDING},
    '/recent': { pageTitle: 'Browse recently updated dWebsites - ' + TITLE_ENDING},
    '/all': { pageTitle: 'Browse dWebsites - ' + TITLE_ENDING},
    '/search': { pageTitle: 'Search Results - ' + TITLE_ENDING },
    '/about': { pageTitle: 'About - ' + TITLE_ENDING},
    '/privacy': { pageTitle: 'Privacy Policy - ' + TITLE_ENDING }
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