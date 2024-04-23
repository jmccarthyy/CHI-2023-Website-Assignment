/**
 * Content page
 * 
 * This is the page for getting content and authors
 * 
 * @author Jake McCarthy
 */
import { useState, useEffect } from 'react';
import ContentCard from '../components/ContentCard';

// Displays content on content page
function Content() {
  const [content, setContent] = useState([]);
  const [affiliates, setAffiliates] = useState([]);
  const [errors, setErrors] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [notes, setNotes] = useState([]);
  const [filter, setFilter] = useState('');

  // Get number of pages needed for content pagination
  const getContentCount = () => {
    let filterToAdd = '';
    if(filter !== '') {
        filterToAdd = '?type=' + filter;
    }

    fetch('https://w20043974.nuwebspace.co.uk/kf6012/api/content' + filterToAdd)
    .then( response => response.json() )
    .then(json => { setTotalPages(Math.ceil(json.length/20)) })
  };

  // Gets content from API with filter and current page
  const getContent = () => {
    let filterToAdd = '';
    if(filter !== '') {
        filterToAdd = '&type=' + filter;
    }

    fetch(`https://w20043974.nuwebspace.co.uk/kf6012/api/content?page=${currentPage + filterToAdd}`)
    .then( response => response.json() )
    .then(json => { setContent(json) })
    .catch( err => { setContent([]) })
  };

  // Gets author affiliations from API
  const getAffiliates = () => {
    fetch('https://w20043974.nuwebspace.co.uk/kf6012/api/author-and-affiliation')
    .then( response => response.json() )
    .then(json => { setAffiliates(json); })
    .catch( err => { setErrors(err.message) })
  };

  // Gets notes from API based on logged in user
  const getNotes = () => {
    fetch('https://w20043974.nuwebspace.co.uk/kf6012/api/notes',
    {
      method: 'GET',
      headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token') })
    })
    .then(response => response.json())
    .then(data => { setNotes(data) })
    .catch(error => console.log(error))
  };

  // Deletes note from API based on logged in user
  const deleteNotes = (notesId) => {
    fetch('https://w20043974.nuwebspace.co.uk/kf6012/api/notes?notesId=' + notesId,
    {
      method: 'DELETE',
      headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token') })
    })
    .catch(error => console.log(error))
    .finally(() => getNotes())
  };

  // Updates note in API based on logged in user and content
  const updateNotes = (notesId) => {
    const note = document.querySelector("#note" + notesId);
    fetch('https://w20043974.nuwebspace.co.uk/kf6012/api/notes?notesId=' + notesId,
    {
      method: 'PUT',
      headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token') }),
      body: JSON.stringify({ content: note.innerText })
    })
    .catch(error => console.log(error))
    .finally(() => getNotes())
  };

  // Adds note to API based on logged in user and content
  const addNotes = (contentId) => {
    const note = document.querySelector("#addnote" + contentId);
    fetch('https://w20043974.nuwebspace.co.uk/kf6012/api/notes?contentId=' + contentId,
    {
      method: 'POST',
      headers: new Headers({ "Authorization": "Bearer " + localStorage.getItem('token') }),
      body: JSON.stringify({ content: note.value })
    })
    .catch(error => console.log(error))
    .finally(() => getNotes())
  };

  // Sets filter to whatever content type is selected from dropdown box
  const handleFilter = (selectedFilter) => {
    setFilter(selectedFilter);
  }

  useEffect(() => {
    getContent();
    getContentCount();
    getAffiliates();
    if(localStorage.getItem('token')) {
        getNotes();
    } else {
        setNotes([]);
    }
  }, [currentPage, filter]);

  // Loops through content returned from API and adds contentCard component to page
  const contentList =
    content.length > 0 && errors.length === 0 ? (
        
        <section className="max-w-3xl mx-auto mt-4 mb-4">
        {content.map((contentData, index) => (
          <ContentCard 
            key={index} 
            id={contentData.id}
            title={contentData.title} 
            abstract={contentData.abstract} 
            name={contentData.name} 
            award={contentData.award}
            content={contentData.content}
            notes={notes.filter(note => note.content_id === contentData.id)}
            affiliates={affiliates.filter(affiliate => affiliate.content === contentData.id)}
            deleteNotes={deleteNotes}
            updateNotes={updateNotes}
            addNotes={addNotes}
          />
        ))}
      </section>
    ) : (
      <section className="max-w-3xl mx-auto bg-white p-4 rounded-md shadow-md mt-4 mb-4">
        <p className="text-red-500">No content was found</p>
      </section>
    );

    // Shows pagination controls at the bottom of the page
    const pagination = (
        <div className="flex justify-center mt-auto">
          <button
            className={`mx-1 px-3 py-2 ${
              currentPage === 1 ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'
            } rounded-md`}
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            &lt;&lt; First
          </button>
          <button
            className={`mx-1 px-3 py-2 ${
              currentPage === 1 ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'
            } rounded-md`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &lt; Previous
          </button>
          <span className="mx-2 px-3 py-2 bg-blue-500 text-white rounded-md">{"Page " + currentPage + " of " + totalPages}</span>
          <button
            className={`mx-1 px-3 py-2 ${
              currentPage === totalPages ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'
            } rounded-md`}
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next &gt;
          </button>
          <button
            className={`mx-1 px-3 py-2 ${
              currentPage === totalPages ? 'bg-gray-300 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white'
            } rounded-md`}
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last &gt;&gt;
          </button>
        </div>
      );

  return (
    <div className="my-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Content</h1>
      <img className="max-w-36 mx-auto mt-2 mb-2" src="./CHIContent.png" alt="Placeholder Content Text" />
      <div className="max-w-3xl mx-auto">
        <select
            className="p-2 border border-gray-300 rounded-md"
            onChange={(event) => handleFilter(event.target.value)}
        >
          <option defaultValue value="">All</option>
          <option value="Course">Course</option>
          <option value="Demo">Demo</option>
          <option value="Doctoral Consortium">Doctoral Consortium</option>
          <option value="Late-Breaking Work">Late-Breaking Work</option>
          <option value="Paper">Paper</option>
          <option value="Poster">Poster</option>
          <option value="Work-in-Progress">Work-in-Progress</option>
          <option value="Workshop">Workshop</option>
          <option value="Case Study">Case Study</option>
          <option value="Panel">Panel</option>
          <option value="AltCHI">AltCHI</option>
          <option value="SIG">SIG</option>
          <option value="Keynote">Keynote</option>
          <option value="Interactivity">Interactivity</option>
          <option value="Journal">Journal</option>
          <option value="Symposia">Symposia</option>
          <option value="Competitions">Competitions</option>
        </select>
      </div>
      {contentList}
      {pagination}
    </div>
  );
}
 
export default Content