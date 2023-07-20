

const DealsItem = ({deal, renderProps, index}) => {


    return (
        <div key = {deal.id} className="deals_item">
            <div className="deals_item-text">
                <span className="deals_item-num">{index+1}.</span>
                <div className="deals_item-title">{deal.title}</div>
            </div>
                {renderProps()}
        </div>  
    ) 
}

export default DealsItem;