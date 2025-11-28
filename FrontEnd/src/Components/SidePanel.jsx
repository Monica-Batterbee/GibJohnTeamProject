import { Tooltip as ReactTooltip } from 'react-tooltip'

function Panel({setPage}) {


    const iconClasses = ["fa-book","fa-comment","fa-trophy","fa-pen","fa-gamepad","fa-bars-progress","fa-comments"]
    const toolTipText = ["Assingnments","Feedback Report","Rewards","Brainstorm and notes", "Games", "Progress", "chat"]

    const iconObject = {
      Assignments : {class : "fa-book",
                      text : "Assignments"},

      'Feedback' : {class : "fa-comment",
                    text: "Feedback Report"},

      'Rewards' : {class : "fa-trophy",
                    text : "Rewards"},

      'Notes' : {class : "fa-pen",
                    text: "Brainstorm and notes"},

      'Games' : {class : "fa-gamepad",
                    text : "Games"},

      'Progress' : {class : "fa-bars-progress",
                    text: "Progress"},

      'Chat' : {class : "fa-comments",
                  text: "chat"}
    }

    const icons = Object.keys(iconObject).map((iconKey, index) => {
      const iconInfo = iconObject[iconKey];  // <-- get the actual object
    
      return (
      <i
        key={index}
        className={`fa-solid ${iconInfo.class} text-xl text-gray-500 p-1 mb-3 cursor-pointer`}
        data-tooltip-id="my-tooltip"
        data-tooltip-content={iconInfo.text}
        onClick={() => setPage(iconKey)}   // <--- FIX
      >
</i>
      );
    });

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