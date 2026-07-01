# Web Development Project 4 - Veni Vici!

Submitted by: **Mehrab Azan**

This web app: **lets users discover random dogs from The Dog API, click attributes to ban them from future results, and browse a session history of previously discovered dogs.**

Time spent: **10** hours spent in total

## Required Features

The following **required** functionality is completed: 

- [x] **Application features a button that creates a new API fetch request on click and displays at least three attributes and an image obtained from the returned JSON data**
  - The type of attribute displayed for each image should be consistent across API calls (i.e. if you are using a dog API, and display the weight, breed, and origin in response to an initial API call, subsequent button clicks should also result in the weight, breed, and origin being displayed)
- [x] **Only one item/data from API call response is viewable at a time and at least one image is displayed per API call**
  - A single result of an API call is displayed at a time 
  - Displayed attributes should match the displayed image (i.e., if showing a picture of a Golden Retriever and the attribute breed, the displayed breed should be 'Golden Retriever' not 'Poodle' or another breed that doesn't match)
  - There is at least one image per API call
- [x] **API call response results should appear random to the user**
  - Clicking on the API call button should generate a seemingly random new result each time
  - Note: Repeat results are permitted but the API used should have a reasonably large amount of data and repeats should not be frequent
- [x] **Clicking on a displayed value for one attribute adds it to a displayed ban **list**
  - At least one attribute for each API result should be clickable
  - Clicking on a clickable attribute not on the ban list, should imnmediately add it to the ban list 
  - Clicking on an attribute in the ban list should immediately remove it from the ban list 
- [x] **Attributes on the ban list prevent further images/API results with that attribute from being displayed**
  - Clicking on the API call button should not result in any image/attributes with attribute values in the ban list being displayed (ex. Using The Dog API, if the ban list includes the value 'Golden Retriever' for the breed attribute, clicking on the Discover button should never result in a Golden Retriever being displayed)
  - Note: More attribute values on the ban list may result in a higher frequency of repeat results
  - [x] _To ensure an accurate grade, your recording **must** show that when clicked, an attribute in the ban list is immediately removed from the list of banned attributes_


The following **optional** features are implemented:

- [x] Multiple types of attributes are clickable and can be added to the ban list
- [x] Users can see a stored history of their previously displayed  results from this session
  - A dedicated section of the application displays all the previous images/attributes seen before
  - Each time the API call button is clicked, the history updates with the newest API result

The following **additional** features are implemented:

* [x] Responsive three-column layout that stacks on smaller screens
* [x] Loading and error states for API requests
* [x] Dog-themed tiled background and emoji header row

## Video Walkthrough

Here's a walkthrough of implemented user stories:

<img src='https://i.imgur.com/G0QgReI.gif' title='Video Walkthrough' width='' alt='Video Walkthrough' />

[ScreenToGif](https://www.screentogif.com/) for Windows
GIF created with ...  
<!-- Recommended tools:
[Kap](https://getkap.co/) for macOS
[ScreenToGif](https://www.screentogif.com/) for Windows
[peek](https://github.com/phw/peek) for Linux. -->

## Notes

Describe any challenges encountered while building the app.

  - The Dog API returns breed data alongside each image when using `has_breeds=true`, which keeps displayed attributes aligned with the shown photo.
  - When many attributes are banned, the app retries random fetches until it finds a dog that does not match any banned values.

## License

    Copyright 2026 Mehrab Azan

    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at

        http://www.apache.org/licenses/LICENSE-2.0

    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
