function About() {

    return (
        <div className="container info-page">
      
            <div className="position-absolute about-image-xxl d-none d-xxl-block"> 
                <img src="./images/about_image.png" alt=""/>
            </div>

            <div className="row py-3 px-3 info-body"> 
                <div className="mw-640px">
                    <h2> About </h2>
                    <p>Esteroids is a dWebsites (decentralized websites) hub, the front page of the decentralized web</p>

                    <p>We build a tool for the community to discover what's happening in the Web3 ecosphere.</p>

                    <p>With Esteroids you are always updated with the latest development of dWebsites. Come to discover which dWebsites are new, which are active or which are popular.</p>

                    <p>We currently focus on the popular combination of ENS+IPFS websites but intend to cover more technologies in the future.</p>

                    <p>This website is in the alpha version. It has lots of raw stuff, but we decided to already release it, because why not? What you see here is just the tip of the iceberg, we wrote powerful tools in the background to crawl and gather data on the dWebsites world.</p>

                    <p>Join us in a journey to see how the dWebsite ecosystem is being built site-by-site, dApp by dApp, NFT by NFT.</p>

                    <p className="text-success"> <img src="../images/twitter.svg" alt="Twitter"/> Follow us in <a href="https://twitter.com/e_steroids">Twitter</a> to get more dWebsites new</p>

                    <p  className="text-success">✉️ write us in <a href="mailto:contact@esteroids.xyz">contact@esteroids.xyz</a>.</p>
                </div>
            </div>
        </div>
    )

}


export default About;