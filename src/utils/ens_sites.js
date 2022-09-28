const DEFAULT_GATEWAY = 'limo'

const getOriginGateway = (originUrl) => { 
    let choosenGateway = DEFAULT_GATEWAY;
    if (originUrl){
        try{
            const url = new URL(originUrl);
            if (url?.hostname){
                const domainParts = url.hostname.toLowerCase().split('.')
                const gateway_ending = (domainParts.length>2 && domainParts.slice(-2).join('.')) || '';
                switch (gateway_ending) {
                    case 'eth.limo':
                        choosenGateway = 'limo';
                        break;
                    case 'eth.link':
                        choosenGateway = 'link';
                        break;
                    default:
                        choosenGateway = DEFAULT_GATEWAY;
                }
            }
        }catch{}
    }

    return  choosenGateway;
}



const EnsSite = {
    getExternalLink: function(ens_name, gateway){
        return 'https://'+ ens_name + '.eth.' + gateway;
    },
    getGateway: (originUrl) => getOriginGateway(originUrl),
    getDisplaySiteName: function(ens_name){
        return ens_name + '.eth'
    },
    getScreenshotUrl: function(ens_site){
        if (ens_site[this.HAS_SCREENSHOT]!==undefined && ens_site[this.NAME]!==undefined){
            return './images/ext/screenshots/' + ens_site[this.NAME] + '_screenshot.jpg';

        }else{
            return '';
        }
    },
    NAME: 'n',
    DESCRIPTION: 'd',
    TITLE: 't',
    HAS_SCREENSHOT: 'sc'

}


export default EnsSite