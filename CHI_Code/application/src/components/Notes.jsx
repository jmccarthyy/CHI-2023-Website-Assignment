/**
 * Country component
 * 
 * This is the component for the notes section, to allower user to edit, delete, add or view notes depending on how many there is
 * 
 * @author Jake McCarthy
 */

// Shows add notes section if no notes exist for the content, otherwise, show edit and delete buttons
function Notes(props) {
    return (
        props.content.length > 0 ?
        <div className="mt-4">
          {props.content.map((note, index) => (
            <div key={index} className="flex items-center mb-2">
              <p id={"note" + note.notes_id} className="mr-2 p-2 border-solid border border-slate-300 rounded-lg" contentEditable>{note.content}</p>
              <button className="mr-2 px-3 py-2 bg-green-500 text-white rounded-md p-2" onClick={() => props.updateNotes(note.notes_id)}>
              Save
              </button>
              <button className="px-3 py-2 bg-red-500 text-white rounded-md p-2" onClick={() => props.deleteNotes(note.notes_id)}>
              Delete
              </button>
            </div>
          ))}
        </div>
        :
        <div className="mt-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Add Note:</label>
            <textarea
              id={"addnote" + props.contentId}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Type your note here..."
            ></textarea>
            <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md" onClick={() => props.addNotes(props.contentId)}>
              Add Note
            </button>
        </div>
    );
  }
    
export default Notes;