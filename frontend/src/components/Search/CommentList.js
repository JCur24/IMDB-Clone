import CommentItem from "./CommentItem";


const CommentList = (data) => {
    const interactions = data.data.interactions;
    const setInteractions = data.data.setInteractions;
    return(<ul className="list-group">
            {
                interactions.filter(ix => ix.review !== '').map(item => {
                    return(<CommentItem data={{interaction: item, setInteractions: setInteractions}}/>);
                })
            }
        </ul>
    );
}

export default CommentList;