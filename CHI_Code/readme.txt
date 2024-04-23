Part 1 - API (Endpoint URLs):

Endpoint 1 - Developer - https://w20043974.nuwebspace.co.uk/kf6012/api/ OR https://w20043974.nuwebspace.co.uk/kf6012/api/developer - shows developer

Endpoint 2 - Country - https://w20043974.nuwebspace.co.uk/kf6012/api/country - shows a list of countries associated with CHI data

Endpoint 3 - Preview - https://w20043974.nuwebspace.co.uk/kf6012/api/preview :
- Limit parameter (This parameter allows users to limit the amount of preview videos that are returned through a GET Request, with the number of videos returned depending on the number used in the parameter header) - example: https://w20043974.nuwebspace.co.uk/kf6012/api/preview?limit=1

Endpoint 4 - Author and Affiliation - https://w20043974.nuwebspace.co.uk/kf6012/api/author-and-affiliation :
- Content parameter (This parameter allows the user to choose to return detais of the authors of specific content, by using a GET Request with the content ID in the header) - example: https://w20043974.nuwebspace.co.uk/kf6012/api/author-and-affiliation?content=99140
- Country parameter (This parameter allows the user to choose content only affiliated specific countries, by using a GET Request with the specific country name in the header)- example: https://w20043974.nuwebspace.co.uk/kf6012/api/author-and-affiliation?country=japan
- Both params simultaneously (Using both parameters together is not allowed so putting both in the header returns an error message) - example: https://w20043974.nuwebspace.co.uk/kf6012/api/author-and-affiliation?content=99410&country=japan

Endpoint 5 - Content - https://w20043974.nuwebspace.co.uk/kf6012/api/content :
- Page parameter (On a page, 20 results are returned. This parameter allows the user to choose which page of 20 is returned (i.e if a user chooses page 2 then items 20-40 from the database will be returned) by using a GET Request with the desired page number in the headers) - example: https://w20043974.nuwebspace.co.uk/kf6012/api/content?page=2
- Type parameter (This parameter allows the user to choose with type of content is returned (i.e. a paper or a doctoral consortium) by using a GET Request with the content type in the header)- example: https://w20043974.nuwebspace.co.uk/kf6012/api/content?type=paper
- Both params simultaneously (Both parameters used simultaneously will return the specific page number that type of content using a Get Request with the desired page number and the content type in the header) - example: https://w20043974.nuwebspace.co.uk/kf6012/api/content?page=2&type=paper

Endpoint 6 - Token - https://w20043974.nuwebspace.co.uk/kf6012/api/token :
- When username and password are passed as authorisation headers (Basic Auth), a GET request can be used to return a JWT token for that user
- Example authorisation headers to be used in postman are: username - jake@example.com & password - password
- When nothing is passed in the authorisation headers, an error is returned

Endpoint 7 - Notes - https://w20043974.nuwebspace.co.uk/kf6012/api/notes :
- Individual users have notes that are returned with this endpoint - each request type uses different parameters to perform different actions:
- Get notes (GET Request) uses the token produced by Endpoint 6 as an authorisation header (Bearer Token) to get that user's notes  - https://w20043974.nuwebspace.co.uk/kf6012/api/notes
- Create note (POST Request) uses the token produced by Endpoint 6 as an authorisation header (Bearer Token), as well as the content id (so that the api knows which piece of content to map that note to - example: contentId = 95694) so that the logged in user can add a new note to that item of content - https://w20043974.nuwebspace.co.uk/kf6012/api/notes?contentId=95694
- Edit notes (PUT Request) uses the token produced by Endpoint 6 as an authorisation header (Bearer Token), as well as the notes id (so that the api knows which note to edit - example: notesId=7) so that the logged in user can edit their notes - https://w20043974.nuwebspace.co.uk/kf6012/api/notes?notesId=7
- Delete notes (DELETE Request) uses the token produced by Endpoint 6 as an authorisation header (Bearer Token), as well as the notes id (so that the api knows which note to delete - example: notesId=7) so that the logged in user can delete their notes - https://w20043974.nuwebspace.co.uk/kf6012/api/notes?notesId=7


Part 2 - Application - https://w20043974.nuwebspace.co.uk/kf6012/application/