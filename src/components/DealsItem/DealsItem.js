
const DealsItem = ({deal, renderProps}) => {
    return (
        <div key = {deal.id} className="deals_item">
              <div className="deals_item-title">{deal.title}</div>
              <div className="deals_item-perfomer">{deal.name}</div>
                {renderProps()}
        </div>  
    ) 
}

export default DealsItem;