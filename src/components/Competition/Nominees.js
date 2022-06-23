import Cards from "../Cards/Cards";

const Nominees = props => {

    const nominees = props.nominees;
    return (
<div className="mx-2 my-2 border border-primary rounded">
    <div className="py-2 px-4 display-3">Final Nominees - <a href="https://twitter.com/e_steroids/status/1513536955367239686">vote on twitter</a></div>
    <Cards websites={nominees} cards_number={nominees.length} />
</div>)
}

export default Nominees;