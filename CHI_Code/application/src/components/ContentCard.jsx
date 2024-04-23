/**
 * Country component
 * 
 * This is the component for a single country that will be shown on the countries page in a list
 * 
 * @author Jake McCarthy
 */

import Notes from './Notes';

function ContentCard(props) {

  // Only shows note component if user is logged in
  const showNotes = (
    localStorage.getItem('token') 
    ? 
      <Notes 
        content={props.notes} 
        deleteNotes={props.deleteNotes} 
        updateNotes={props.updateNotes}
        addNotes={props.addNotes}
        contentId={props.id}
      />
    : 
      <></>
  )

  return (
    <div className="bg-white p-12 rounded-md shadow-lg mb-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-2">{props.title}</h1>
      <hr />
      <p className="text-gray-700">{props.name}</p>
      <hr />
      <p className="text-gray-700 font-bold">Abstract:</p>
      <p className="text-gray-600">{props.abstract}</p>
      <p className="text-black-500 font-bold">{props.award !== null ? "Awards: " + props.award : ""}</p>

      <div className="mt-auto">
        <p className="text-gray-700 font-bold">Authors and Affiliations:</p>
        <ul className="list-none list-inside">
          {/* Loops through author affiliations and adds them to list */}
          {props.affiliates.map(affiliate => (
            <li key={affiliate.id}>{affiliate.name + " - " + affiliate.institutions + ", " + affiliate.city + ", " + affiliate.country}</li>
          ))}
        </ul>
      </div>
      {showNotes}
    </div>
  );
}
    
export default ContentCard;