import BackNavBtn from "./BackNavBtn"

/**
 * Action bar component for mobile view
 * @param {string} title - Title of the action bar
 * @param {boolean} disableBack - (Optional) Disable back button. Default is false
 * @returns {JSX.Element}
 * @example <ActionBar title='Dashboard' disableBack={true}/>
 */
function ActionBar(props){
    var title = props.title;
    var disableBack = props.disableBack;

    return (      
      <div className="actionBar">
        { disableBack ? null : <BackNavBtn /> }

        <h1 className="actionBarTitle">{title}</h1>
      </div>
    )
}

export default ActionBar;