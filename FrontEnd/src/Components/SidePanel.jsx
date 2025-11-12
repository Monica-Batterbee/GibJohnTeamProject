import { Tooltip as ReactTooltip } from 'react-tooltip'

function Panel() {


    const iconClasses = ["fa-book","fa-comment","fa-trophy","fa-pen","fa-gamepad","fa-bars-progress","fa-comments"]
    const toolTipText = ["Assignments","Feedback Report","Rewards","Brainstorm and notes", "Games", "Progress", "chat"]

    let icons = iconClasses.map((iconClass,index) => {
        return(
            <i 
            key={index}
            className={`fa-solid ${iconClass} text-xl text-gray-500 p-1 mb-3 cursor-pointer`}
            data-tooltip-id="my-tooltip"
            data-tooltip-content={toolTipText[index]}>
            </i>

        );
    })

    return (
    <>
      <div className="h-full shadow-md flex flex-col p-2">
        {icons}
        <ReactTooltip id="my-tooltip" place="top" effect="solid" />
      </div>    
    </>
    );
}

export default Panel;