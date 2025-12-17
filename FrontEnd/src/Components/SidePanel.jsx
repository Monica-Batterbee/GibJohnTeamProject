import { Tooltip as ReactTooltip } from 'react-tooltip'

function Panel({setPage, role}) {
  let iconObject = {}
    //Object sets the text and class for each icon in side panel
    if (role === 'Student'){
      iconObject = {
      'Home' : {class : 'fa-house',
                  text: 'Home'},

      'Assignments' : {class : "fa-book",
                      text : "Assignments"},

      'Rewards' : {class : "fa-trophy",
                    text : "Rewards"},

      'Notes' : {class : "fa-pen",
                    text: "Brainstorm and notes"},

      'Games' : {class : "fa-gamepad",
                    text : "Games"},

      'Progress' : {class : "fa-bars-progress",
                    text: "Progress"},

    }
  }
  else {
      iconObject = {
      'Home' : {class : 'fa-house',
                  text: 'Home'},

      'Assignments' : {class : "fa-book",
                      text : "Assignments"}

    }
  }

    const icons = Object.keys(iconObject).map((iconKey, index) => {
      const iconInfo = iconObject[iconKey];  // <-- get the actual object
    
      return (
        //Sets each icon and gives it a tool tip
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
      <div className="h-full shadow-md flex flex-col bg-white p-2">
        {icons}
        <ReactTooltip id="my-tooltip" place="top" effect="solid" />
      </div>    
    </>
    );
}

export default Panel;