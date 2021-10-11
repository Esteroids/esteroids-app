const DEFAULT_GATEWAY = '.link'


const getOriginGateway = (originUrl) => { 
    if (!originUrl) return DEFAULT_GATEWAY;
    
    try{
        const url = new URL(originUrl);
        if (url?.hostname&&url.hostname.toLowerCase().endsWith('.eth.limo')){
            return '.limo'
        }
    }catch{}
    return DEFAULT_GATEWAY;
}

const EnsSite = {
    getExternalLink: function(ens_name, originUrl){
        const gateway = getOriginGateway(originUrl)
        return 'https://'+ ens_name + '.eth'+gateway;
    },
    getDisplaySiteName: function(ens_name){
        return ens_name+'.eth'
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