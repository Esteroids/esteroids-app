import Browse from "../browse";
import { useState } from "react";
import CompetitionHeading from "./CompetitionHeading";
import ShowSelectedCandidates from "./ShowSelectedCandidates";

import ProposalData from "../snapshot/ProposalData";
import Nominees from "./Nominees";
import { siteNameToIndexes } from "../utils/DwebsiteUtils";
import Winner from "./Winner";


const comptition_data = require("../../data/competition/2022_march.json")
const COMPETITION_SITES = comptition_data.candidates;
const competition_nominees = comptition_data?.nominees;


// const hub = 'https://hub.snapshot.org'; // or https://testnet.snapshot.org for testnet
// const client = new snapshot.Client712(hub);


// let infuraId;
// try{
//     infuraId = process.env.REACT_APP_INFURA_ID
// }catch(e){

// }


// const providerOptions = {
//     walletconnect: {
//       package: WalletConnect, // required
//       options: {
//         infuraId // required
//       }
//     },
//     // torus: {
//     //     package: Torus, // required
       
//     // },
//     walletlink: {
//         package: WalletLink, // Required
//         options: {
//           appName: "Esteroids", // Required
//           infuraId, // Required unless you provide a JSON RPC url; see `rpc` below
//           rpc: "", // Optional if `infuraId` is provided; otherwise it's required
//           chainId: 1, // Optional. It defaults to 1 if not provided
//           appLogoUrl: null, // Optional. Application logo image URL. favicon is used if unspecified
//           darkMode: false // Optional. Use dark theme, defaults to false
//         }
//     }
   
// };

const votingEnded = comptition_data.timeline.end < Math.floor(Date.now()/1000)
const competitionEnded = (comptition_data?.final?.timeline && comptition_data.final.timeline.end < Math.floor(Date.now()/1000))

const competitionWinner = (competitionEnded && comptition_data?.final?.winner)

const competitionStage = (!votingEnded && !competitionEnded && 'candidates') ||  (votingEnded && !competitionEnded && 'nominees') || (votingEnded && competitionEnded && 'ended')

// const web3Modal = votingEnded && new Web3Modal({
//     network: "mainnet", // optional
//     cacheProvider: true, // optional
//     providerOptions // required
//   });

const MAX_CANDIDATES_FOR_SELECTION = 6


const COMPETITION_SITES_WITH_ETH = COMPETITION_SITES.map(x => x + '.eth').sort();


const nominees_index = competition_nominees?siteNameToIndexes(competition_nominees).sort(() => Math.random() - 0.5):false;
const winner_index = competitionWinner?siteNameToIndexes([competitionWinner]):false;



// const handleCreateProposal = async () => {
    
//     const instance = await web3Modal.connect();
      
//     //const provider = new ethers.providers.Web3Provider(instance);
//     const web3 = new ethers.providers.Web3Provider( instance )
//     const [account] = await web3.listAccounts();

//     await client.proposal(web3, account, {
//         space: 'esteroids.eth',
//         type: ProposalData.proposalType,
//         title: '.eth Website Competition March 2022',
//         body: '',
//         choices: COMPETITION_SITES_WITH_ETH,
//         start: comptition_data.timeline.start,
//         end: comptition_data.timeline.end,
//         snapshot: 14512755,
//         network: ProposalData.proposalNetwork,
//         strategies: JSON.stringify({}),
//         plugins: JSON.stringify({}),
//         metadata: JSON.stringify({})
//     });
// }




const Competition = () => {

    const [selectedCandidates, setSelectedCandidates] = useState({})
    const [alreadyVoted, setAlreadyVoted] = useState(false)
    const [reachedMaxCandidates, setReachedMaxCandidates] = useState(false)
    const [votingError, setVotingError] = useState('')


    const selectedCandidatesToVotes = (selectedCandidatesToConvert) => Object.keys(selectedCandidatesToConvert).map( x=> (COMPETITION_SITES_WITH_ETH.indexOf(x) + 1));

    const handleVote = async () => {}
    // const handleVote = async () => {
          
    //     setVotingError('');
    //     let instance
    //     try{
    //         instance = await web3Modal.connect();
    //     }catch{
    //         return;
    //     }
        
          
    //     const web3 = new ethers.providers.Web3Provider( instance )
    //     const [account] = await web3.listAccounts();

    //     const votedChoices = selectedCandidatesToVotes(selectedCandidates)
    
    //     client.vote(web3, account, {
    //         space: ProposalData.spaceName,
    //         proposal: ProposalData.proposalId,
    //         type: ProposalData.proposalType,
    //         choice: votedChoices,
    //         metadata: JSON.stringify({})
    //     }).then((msg) => {
    //         setSelectedCandidates({});
    //         setAlreadyVoted(true);
    //     }).catch((err)=>{
    //         if (err && err?.error === "unauthorized" && err?.error_description === "no voting power"){
    //             setVotingError('You must vote from an address that own a .eth name.')
    //         }if (err && err?.error === "unauthorized" && err?.error_description === "not in voting window"){
    //             setVotingError('Voting perdiod ended')
    //         }else{
    //             setVotingError('An problem has occurred in the voting process, please come to Esteroids Discord to solve the issue.')
    //         }
           
    //     })
        
    // }

    const addSelectedCandidate = async (candidate) => {
        setVotingError('');
        const currentCandidatesNum = Object.keys(selectedCandidates).length
        if (currentCandidatesNum<MAX_CANDIDATES_FOR_SELECTION){
            
            if (!selectedCandidates[candidate]){
                let newSelectedCandidates = {};
                newSelectedCandidates[candidate] = true;
                setSelectedCandidates({...selectedCandidates, ...newSelectedCandidates} )
                if (currentCandidatesNum === MAX_CANDIDATES_FOR_SELECTION - 1){
                    setReachedMaxCandidates(true);
                }
            }
        }
            
        
    }

    const closeError = () => {setVotingError('');}

    const removeSelectedCandidate = (candidate) => {
        setVotingError('');
        if (selectedCandidates[candidate]){
            let newSelectedCandidates = {...selectedCandidates};
            delete newSelectedCandidates[candidate];
            setSelectedCandidates(newSelectedCandidates)
            setReachedMaxCandidates(false);
        }
        
    }
    
    const competition = {selectedCandidates, addSelectedCandidate, removeSelectedCandidate, reachedMaxCandidates, maxCandidates: MAX_CANDIDATES_FOR_SELECTION, votingEnded};


    return (
    <div className="container info-body py-3">
        <CompetitionHeading proposalId={ProposalData.proposalId} />
        <div>
            {votingError && (<div className="border py-2 px-3 mx-3 my-3 alert alert-danger alert-dismissible fade show display-6" role="alert">
                {votingError}
                <button type="button" className="close" data-dismiss="alert" aria-label="Close" onClick={closeError}>
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>)}
            {!votingEnded && !alreadyVoted && (<ShowSelectedCandidates selectedCandidates={selectedCandidates} handleVote={handleVote} maxCandidates={MAX_CANDIDATES_FOR_SELECTION} />)}
            {alreadyVoted && (<div className="border py-2 px-3 mx-3 my-3 alert alert-success display-6">
                Voting is successful!
            </div>)}
            {(competitionStage==='ended') && winner_index && (<Winner winner={winner_index} />)}
            {(competitionStage==='nominees') && nominees_index && (<Nominees nominees={nominees_index} />)}
            {(competitionStage==='nominees') && (<div className="border py-2 px-3 mx-3 my-3 alert alert-success display-6">
                Part 1 has ended - <a href="https://twitter.com/e_steroids/status/1513536955367239686">vote on twitter for final 4</a>
            </div>)}
            <Browse hideBrowseMenu={true} category="competition" competition={competition} />
        </div>
    </div>
    )

}

export default Competition;