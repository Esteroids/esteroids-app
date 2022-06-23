import Cards from "../Cards/Cards";

const Winner = props => {

    const winner = props.winner;
    return (
<div className="mx-2 my-2 border border-primary rounded">
    <div className="py-2 px-4 display-3">Competition Winner</div>
    <Cards websites={winner} cards_number={winner.length} />
</div>)
}

export default Winner;