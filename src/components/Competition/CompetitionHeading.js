const CompetitionHeading = (props) => {
    return (
<div className="jumbotron bg-cover competition-heading text-white d-flex justify-content-between">
    <div className="py-5 d-flex-column w-50 d-block d-md-none">
        <div  className="text-center d-flex align-self-center justify-content-center">
            <div>
                <img src="/images/competition/ens-logo-small.png" alt="ENS Logo" />
            </div>
        </div>

        <div className="text-center d-flex align-self-center justify-content-center">
            <div>
                <img src="/images/competition/esteroids-logo.svg" alt="Esteroids Logo" width={100} height={100} />
            </div>
        </div>
    </div>
    <div className="py-5 w-50 d-none d-md-flex d-flex-row justify-content-center">
        <div className="align-self-center">
            <img src="/images/competition/ens-logo-small.png"  alt="ENS Logo" />
        </div>

        <div className="competition-vertical-line text-center d-flex align-self-center justify-content-center">
            <div>
                <img src="/images/competition/esteroids-logo.svg"  alt="Esteroids Logo" width={100} height={100} />
            </div>
        </div>
    </div>
    <div className="py-5 w-50 d-flex flex-column align-items-center">
        <div>
            <h1 className="display-4 font-weight-bold">.eth Website Competition March 2022</h1>
        </div>
        <div className="d-flex align-items-start flex-column">
            <p className="font-italic mb-0">Promote your site on <a href="https://discord.gg/9c2EWzjFzY">Esteroids Discord</a> (#eth-websites-subgroup)</p>
            <p className="font-italic mb-0">Get info about <a href="https://github.com/Esteroids/eth-websites-competition">competition and rules</a></p>
            {props.proposalId && (<p className="font-italic mb-0">See results on <a href={"https://snapshot.org/#/esteroids.eth/proposal/" + props.proposalId}>snapshot</a></p>)}
            {/* <p className="font-italic mb-0">Your March 2022 website is missing? <a href="https://discord.gg/9c2EWzjFzY">Tell us!</a></p> */}
            
        </div>
    </div>
</div>)
}

export default CompetitionHeading;