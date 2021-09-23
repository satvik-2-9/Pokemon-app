import React from 'react'

function Pagenation({gotoNextPage,gotoPrevPage}) {
    return (
        <div>
            {gotoPrevPage && <button onClick={gotoPrevPage}>previous</button>}
            {gotoNextPage && <button onClick={gotoNextPage}>next</button>}
        </div>
    )
}

export default Pagenation
