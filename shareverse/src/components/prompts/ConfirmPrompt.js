import "./Prompts.css"

export const ConfirmPrompt = ({setShowConfirmPrompt, setConfirmPromptResult}) => {

    function yesBtn(){
        setShowConfirmPrompt(false);
        setConfirmPromptResult(true);
    }
    function noBtn(){
        setShowConfirmPrompt(false);
        setConfirmPromptResult(false);
    }

    return (
        <div className="confirm-prompt-container">
            <div className="confirm-prompt">
                <div className="confirm-prompt-info">
                    <h2>Are you sure?</h2>
                    <p>Once deleted, it will not be restored.</p>
                </div>
                <div className="confirm-prompt-btn">
                    <button onClick={noBtn} className="no-btn">No</button>
                    <button onClick={yesBtn} className="yes-btn">Yes</button>
                </div>
            </div>
        </div>
    )
}