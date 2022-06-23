const DEFAULT_GATEWAY = 'limo'


const getOriginGateway = (originUrl) => { 
    let choosenGateway = DEFAULT_GATEWAY;
    if (!originUrl){
        try{
            const url = new URL(originUrl);
            if (url?.hostname){
                const gateway_ending = url.hostname.toLowerCase().split('.').pop();
                switch (gateway_ending) {
                    case 'limo':
                    case 'link':
                        choosenGateway = gateway_ending;
                    break;
                    default:
                        choosenGateway = DEFAULT_GATEWAY;
                }
            }
        }catch{}
    }
    return '.' + choosenGateway;
}

const EnsSite = {
    getExternalLink: function(ens_name, originUrl){
        const gateway = getOriginGateway(originUrl)
        return 'https://'+ ens_name + '.eth' + gateway;
    },
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