const ShowSelectedCandidates = (props) => {


    const selectedCandidates = props.selectedCandidates;
    const candidateNames = Object.keys(selectedCandidates);

    const showSection = candidateNames.length>0;

    return (
<>
    <div className="border py-2 px-3 mx-3 my-3">
        <div>
            <span className="px-2 font-weight-bold display-6">Selected Candidates</span> (up to {props.maxCandidates} candidates)
        </div>
        <div className="d-flex  flex-column flex-md-row justify-content-between py-1">
            <div className="d-flex flex-column flex-md-row fs-3">
                {candidateNames.map((name, index)=> (
                <div key={index} className="d-flex flex-column px-4">
                    <div>{name}</div>
                </div>
                ))}
            </div>
            <div className="w-50">
                <div className="d-flex justify-content-start" >
                    <button type="button" className="btn btn-success btn-lg px-5" disabled={!showSection} onClick={props.handleVote}>Connect & Vote</button>
                </div>
            </div>
        </div>
    </div> 
</>);

}

export default ShowSelectedCandidates;