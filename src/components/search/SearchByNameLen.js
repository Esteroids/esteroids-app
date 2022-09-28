import EnsSite from "../../utils/ens_sites";

const nameLenSearchRE = /name-length\s*:\s*(\d+)/i;

const searchByNameLength = (sites, nameLength) => {

    const nameLengthInt = parseInt(nameLength);

    const results = sites.reduce(function(result, site, siteIndex) {
        const siteName = site[EnsSite['NAME']]
        if (siteName.length === nameLengthInt) {
          return result.concat(siteIndex);
        }
        return result;
      }, []);

    return results;
}

const isNameLengthSearch = searchTerm => nameLenSearchRE.test(searchTerm)

const getNameLengthSearched = searchTerm => {
    const res = searchTerm.match(nameLenSearchRE)
    if (res && res.length>1){
        return res[1]
    }
}


export {searchByNameLength, isNameLengthSearch, getNameLengthSearched }